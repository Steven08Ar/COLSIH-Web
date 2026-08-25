<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class SystemAdminController extends Controller
{
    public function index()
    {
        return \Inertia\Inertia::render('Admin/Dashboard', [
            'seccion' => 'mantenimiento',
        ]);
    }

    /**
     * Comandos Artisan permitidos para ejecución desde el panel de administración
     */
    protected array $allowedCommands = [
        'migrate' => [
            'label'       => 'php artisan migrate --force',
            'command'     => 'migrate',
            'params'      => ['--force' => true],
            'description' => 'Ejecuta todas las migraciones de base de datos pendientes en producción sin confirmación.',
            'category'    => 'base_datos',
            'color'       => 'blue',
        ],
        'cache_clear' => [
            'label'       => 'php artisan cache:clear',
            'command'     => 'cache:clear',
            'params'      => [],
            'description' => 'Elimina la caché general de datos de la aplicación.',
            'category'    => 'cache',
            'color'       => 'emerald',
        ],
        'view_clear' => [
            'label'       => 'php artisan view:clear',
            'command'     => 'view:clear',
            'params'      => [],
            'description' => 'Limpia las plantillas de vista Blade / Inertia compiladas en caché.',
            'category'    => 'cache',
            'color'       => 'amber',
        ],
        'route_clear' => [
            'label'       => 'php artisan route:clear',
            'command'     => 'route:clear',
            'params'      => [],
            'description' => 'Elimina el archivo de caché de rutas registradas.',
            'category'    => 'cache',
            'color'       => 'indigo',
        ],
        'config_clear' => [
            'label'       => 'php artisan config:clear',
            'command'     => 'config:clear',
            'params'      => [],
            'description' => 'Elimina la caché del archivo de configuración (.env / config).',
            'category'    => 'cache',
            'color'       => 'purple',
        ],
        'optimize_clear' => [
            'label'       => 'php artisan optimize:clear',
            'command'     => 'optimize:clear',
            'params'      => [],
            'description' => 'Elimina de un solo golpe todas las cachés: rutas, vistas, eventos y configuración.',
            'category'    => 'cache',
            'color'       => 'rose',
        ],
        'storage_link' => [
            'label'       => 'php artisan storage:link',
            'command'     => 'storage:link',
            'params'      => [],
            'description' => 'Crea el enlace simbólico necesario entre public/storage y storage/app/public en cPanel.',
            'category'    => 'sistema',
            'color'       => 'cyan',
        ],
        'seed_equipo' => [
            'label'       => 'php artisan db:seed --class=EquipoSeeder',
            'command'     => 'db:seed',
            'params'      => ['--class' => 'EquipoSeeder', '--force' => true],
            'description' => 'Re-pobla y restaura la información inicial del equipo institucional.',
            'category'    => 'base_datos',
            'color'       => 'orange',
        ],
        'git_pull' => [
            'label'       => 'git pull + migrate + optimize',
            'command'     => '__shell__',
            'params'      => [],
            'description' => 'Descarga los últimos cambios de GitHub, actualiza dependencias, ejecuta migraciones y limpia cachés.',
            'category'    => 'deploy',
            'color'       => 'violet',
        ],
    ];

    public function runCommand(Request $request)
    {
        $request->validate([
            'action' => 'required|string',
        ]);

        $actionKey = $request->input('action');

        if (!isset($this->allowedCommands[$actionKey])) {
            return redirect()->route('admin.mantenimiento')->with('flash_error', 'Comando no permitido o no encontrado.');
        }

        $cmdInfo = $this->allowedCommands[$actionKey];

        try {
            if ($cmdInfo['command'] === '__shell__') {
                return $this->runDeploy($actionKey, $cmdInfo);
            }

            $exitCode = Artisan::call($cmdInfo['command'], $cmdInfo['params']);
            $output = Artisan::output();

            if (empty(trim($output))) {
                $output = "Comando '{$cmdInfo['command']}' completado con éxito. Código de salida: {$exitCode}";
            }

            Log::info("Admin ejecutó comando desde panel cPanel/Web: {$cmdInfo['command']}", [
                'exitCode' => $exitCode,
                'output'   => $output,
            ]);

            return redirect()->route('admin.mantenimiento')->with([
                'flash' => "Comando '{$cmdInfo['label']}' ejecutado correctamente.",
                'command_output' => [
                    'action'      => $actionKey,
                    'label'       => $cmdInfo['label'],
                    'command'     => $cmdInfo['command'],
                    'exitCode'    => $exitCode,
                    'output'      => $output,
                    'executed_at' => now()->format('Y-m-d H:i:s'),
                ]
            ]);
        } catch (\Throwable $e) {
            Log::error("Error al ejecutar comando Artisan desde panel: " . $e->getMessage());

            return redirect()->route('admin.mantenimiento')->with([
                'flash_error' => "Error al ejecutar '{$cmdInfo['label']}': " . $e->getMessage(),
                'command_output' => [
                    'action'      => $actionKey,
                    'label'       => $cmdInfo['label'],
                    'command'     => $cmdInfo['command'],
                    'exitCode'    => 1,
                    'output'      => "EXCEPCIÓN EN SERVIDOR:\n" . $e->getMessage() . "\n\nTraza:\n" . $e->getTraceAsString(),
                    'executed_at' => now()->format('Y-m-d H:i:s'),
                ]
            ]);
        }
    }

    protected function runDeploy(string $actionKey, array $cmdInfo)
    {
        $basePath = base_path();
        $php      = PHP_BINARY;
        $output   = [];
        $exitCode = 0;

        $steps = [
            "git -C {$basePath} pull origin main 2>&1",
            "{$php} {$basePath}/artisan migrate --force 2>&1",
            "{$php} {$basePath}/artisan optimize:clear 2>&1",
            "{$php} {$basePath}/artisan config:cache 2>&1",
            "{$php} {$basePath}/artisan route:cache 2>&1",
            "{$php} {$basePath}/artisan view:cache 2>&1",
        ];

        foreach ($steps as $cmd) {
            $stepOut  = [];
            $stepCode = 0;
            exec($cmd, $stepOut, $stepCode);
            $output[] = "$ {$cmd}";
            $output[] = implode("\n", $stepOut);
            $output[] = '';
            if ($stepCode !== 0) {
                $exitCode = $stepCode;
            }
        }

        $outputStr = implode("\n", $output);

        Log::info("Admin ejecutó deploy desde panel.", ['output' => $outputStr]);

        return redirect()->route('admin.mantenimiento')->with([
            'flash'          => $exitCode === 0 ? 'Deploy ejecutado correctamente.' : 'Deploy finalizado con advertencias — revisa el log.',
            'command_output' => [
                'action'      => $actionKey,
                'label'       => $cmdInfo['label'],
                'command'     => 'git pull + artisan',
                'exitCode'    => $exitCode,
                'output'      => $outputStr,
                'executed_at' => now()->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
