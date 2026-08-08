<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use App\Services\ImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminUsersController extends Controller
{
    private function requireSuperenv(Request $request): void
    {
        if ($request->session()->get('colsih_admin_tipo') !== 'superenv') {
            abort(403, 'Solo el superadministrador puede gestionar usuarios.');
        }
    }

    private function fotoUrl(?string $foto): ?string
    {
        if (!$foto) return null;
        // ImageOptimizer devuelve URL completa para R2 o ruta relativa para local
        return str_starts_with($foto, 'http') ? $foto : \Illuminate\Support\Facades\Storage::url($foto);
    }

    public function index(Request $request)
    {
        $this->requireSuperenv($request);

        $usuarios = AdminUser::orderBy('nombre')->get()->map(fn($u) => [
            'id'         => $u->id,
            'nombre'     => $u->nombre,
            'usuario'    => $u->usuario,
            'email'      => $u->email,
            'contacto'   => $u->contacto,
            'foto'       => $this->fotoUrl($u->foto),
            'rol'        => $u->rol,
            'activo'     => $u->activo,
            'created_at' => $u->created_at?->format('d/m/Y'),
        ]);

        return Inertia::render('Admin/Dashboard', [
            'seccion'       => 'usuarios',
            'adminUsuarios' => $usuarios,
        ]);
    }

    public function store(Request $request)
    {
        $this->requireSuperenv($request);

        $data = $request->validate([
            'nombre'   => 'required|string|max:100',
            'usuario'  => 'required|string|max:50|unique:admin_users,usuario',
            'password' => 'required|string|min:8',
            'email'    => 'nullable|email|max:150',
            'contacto' => 'nullable|string|max:50',
            'foto'     => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,heic,heif|max:10240',
            'rol'      => 'required|in:admin,deportes,marketing',
            'activo'   => 'boolean',
        ]);

        $foto = null;
        if ($request->hasFile('foto')) {
            $foto = ImageOptimizer::guardar(
                $request->file('foto'),
                'usuarios_panel/' . $data['rol'],
                800
            );
        }

        AdminUser::create([
            'nombre'   => $data['nombre'],
            'usuario'  => $data['usuario'],
            'clave'    => Hash::make($data['password']),
            'email'    => $data['email'] ?? null,
            'contacto' => $data['contacto'] ?? null,
            'foto'     => $foto,
            'rol'      => $data['rol'],
            'activo'   => $data['activo'] ?? true,
        ]);

        return back()->with('flash', 'Usuario creado correctamente.');
    }

    public function update(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        $data = $request->validate([
            'nombre'   => 'required|string|max:100',
            'usuario'  => 'required|string|max:50|unique:admin_users,usuario,' . $adminUser->id,
            'password' => 'nullable|string|min:8',
            'email'    => 'nullable|email|max:150',
            'contacto' => 'nullable|string|max:50',
            'foto'     => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,heic,heif|max:10240',
            'rol'      => 'required|in:admin,deportes,marketing',
            'activo'   => 'boolean',
        ]);

        $updates = [
            'nombre'   => $data['nombre'],
            'usuario'  => $data['usuario'],
            'email'    => $data['email'] ?? null,
            'contacto' => $data['contacto'] ?? null,
            'rol'      => $data['rol'],
            'activo'   => $data['activo'] ?? $adminUser->activo,
        ];

        if (!empty($data['password'])) {
            $updates['clave'] = Hash::make($data['password']);
        }

        if ($request->hasFile('foto')) {
            ImageOptimizer::eliminar($adminUser->foto);
            $updates['foto'] = ImageOptimizer::guardar(
                $request->file('foto'),
                'usuarios_panel/' . $data['rol'],
                800
            );
        }

        $adminUser->update($updates);

        return back()->with('flash', 'Usuario actualizado correctamente.');
    }

    public function destroy(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        ImageOptimizer::eliminar($adminUser->foto);
        $adminUser->delete();

        return back()->with('flash', 'Usuario eliminado.');
    }

    public function toggleActivo(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        $adminUser->update(['activo' => !$adminUser->activo]);
        $msg = $adminUser->activo ? 'Usuario activado.' : 'Usuario desactivado.';

        return back()->with('flash', $msg);
    }
}
