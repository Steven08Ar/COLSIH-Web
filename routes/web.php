<?php

use App\Http\Controllers\AdmisionesController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\NoticiaAdminController;
use App\Http\Controllers\Admin\PreguntaController;
use App\Http\Controllers\Admin\TestimonioController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SuscripcionController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\NoticiasController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\OfertaAcademicaController;
use App\Http\Controllers\DeportesController;
use Illuminate\Support\Facades\Route;

// Home
Route::get('/', HomeController::class)->name('home');

// Nosotros
Route::prefix('nosotros')->name('nosotros.')->group(function () {
    Route::get('/', [NosotrosController::class, 'index'])->name('index');
    Route::get('/historia', [NosotrosController::class, 'historia'])->name('historia');
    Route::get('/mision-vision', [NosotrosController::class, 'misionVision'])->name('mision-vision');
    Route::get('/valores', [NosotrosController::class, 'valores'])->name('valores');
    Route::get('/equipo', [NosotrosController::class, 'equipo'])->name('equipo');
});

// Oferta académica
Route::prefix('oferta-academica')->name('oferta-academica.')->group(function () {
    Route::get('/', [OfertaAcademicaController::class, 'index'])->name('index');
    Route::get('/preescolar', [OfertaAcademicaController::class, 'preescolar'])->name('preescolar');
    Route::get('/primaria', [OfertaAcademicaController::class, 'primaria'])->name('primaria');
    Route::get('/bachillerato', [OfertaAcademicaController::class, 'bachillerato'])->name('bachillerato');
    Route::get('/sena', [OfertaAcademicaController::class, 'sena'])->name('sena');
});
Route::get('/oferta-academica', [OfertaAcademicaController::class, 'index'])->name('oferta-academica');

// Actividades (Deportes, Catequesis, MJS, MJC)
Route::prefix('actividades')->name('actividades.')->group(function () {
    Route::get('/deportes', [DeportesController::class, 'index'])->name('deportes');
    Route::get('/catequesis', function () {
        return inertia('Actividades/Catequesis');
    })->name('catequesis');
    Route::get('/mjs', function () {
        return inertia('Actividades/Mjs');
    })->name('mjs');
    Route::get('/mjc', function () {
        return inertia('Actividades/Mjc');
    })->name('mjc');
});

// Rutas directas
Route::get('/deportes', [DeportesController::class, 'index'])->name('deportes');
Route::get('/catequesis', function () {
    return inertia('Actividades/Catequesis');
})->name('catequesis');
Route::get('/mjs', function () {
    return inertia('Actividades/Mjs');
})->name('mjs');
Route::get('/mjc', function () {
    return inertia('Actividades/Mjc');
})->name('mjc');

// Admisiones
Route::get('/admisiones', AdmisionesController::class)->name('admisiones');

// Inscripción
Route::prefix('inscripcion')->name('inscripcion.')->group(function () {
    Route::get('/', [InscripcionController::class, 'index'])->name('index');
    Route::post('/', [InscripcionController::class, 'store'])->name('store');
    Route::get('/{inscripcion}/confirmacion', [InscripcionController::class, 'confirmacion'])
        ->name('confirmacion');
});

// Noticias
Route::prefix('noticias')->name('noticias.')->group(function () {
    Route::get('/', [NoticiasController::class, 'index'])->name('index');
    Route::get('/{noticia:slug}', [NoticiasController::class, 'show'])->name('show');
});

// Recorrido virtual 360
Route::get('/recorrido-virtual/{slug?}', [TourController::class, 'show'])->name('tour.show');

// Contacto
Route::prefix('contacto')->name('contacto.')->group(function () {
    Route::get('/', [ContactoController::class, 'index'])->name('index');
    Route::post('/', [ContactoController::class, 'store'])->name('store');
});

// Suscripción al boletín
Route::post('/suscripcion', [SuscripcionController::class, 'store'])->name('suscripcion.store');

// Panel administrativo — URL oculta definida en .env (ADMIN_PATH)
$adminPath = config('admin.path');

use App\Http\Controllers\Admin\HotspotController;
use App\Http\Controllers\Admin\TourAdminController;

Route::prefix($adminPath)->name('admin.')->group(function () {
    // Acceso público: solo login
    Route::get('/login',  [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');

    // Rutas protegidas
    Route::middleware('admin.auth')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

        // Recorrido Virtual 360° — admin
        Route::middleware('admin.rol:admin')->group(function () {
            Route::get('/recorrido',                      [TourAdminController::class, 'index'])->name('recorrido');
            Route::post('/recorrido/toggle-construccion', [TourAdminController::class, 'toggleConstruccion'])->name('recorrido.toggle-construccion');
            Route::post('/recorrido/scenes',             [TourAdminController::class, 'storeScene'])->name('recorrido.scenes.store');
            Route::post('/recorrido/scenes/batch',       [TourAdminController::class, 'storeBatchScenes'])->name('recorrido.scenes.batch');
            Route::put('/recorrido/scenes/{scene}',       [TourAdminController::class, 'updateScene'])->name('recorrido.scenes.update');
            Route::post('/recorrido/scenes/{scene}/principal', [TourAdminController::class, 'setInitialScene'])->name('recorrido.scenes.principal');
            Route::delete('/recorrido/scenes/{scene}',    [TourAdminController::class, 'destroyScene'])->name('recorrido.scenes.destroy');
            Route::get('/recorrido/scenes/{scene}/editor', [TourAdminController::class, 'editor'])->name('recorrido.editor');

            // Hotspots (puntos de ruta e información)
            Route::post('/hotspots',                      [HotspotController::class, 'store'])->name('hotspots.store');
            Route::put('/hotspots/{hotspot}',             [HotspotController::class, 'update'])->name('hotspots.update');
            Route::delete('/hotspots/{hotspot}',          [HotspotController::class, 'destroy'])->name('hotspots.destroy');

            // Equipo Institucional
            Route::get('/equipo',                         [App\Http\Controllers\Admin\EquipoAdminController::class, 'index'])->name('equipo');
            Route::post('/equipo',                        [App\Http\Controllers\Admin\EquipoAdminController::class, 'store'])->name('equipo.store');
            Route::match(['post', 'put'], '/equipo/{member}', [App\Http\Controllers\Admin\EquipoAdminController::class, 'update'])->name('equipo.update');
            Route::delete('/equipo/{member}',             [App\Http\Controllers\Admin\EquipoAdminController::class, 'destroy'])->name('equipo.destroy');
            Route::get('/equipo/{member}',                fn() => redirect()->route('admin.equipo'));
        });

        // Contenido Web — admin y marketing
        Route::middleware('admin.rol:admin,marketing')->group(function () {
            Route::get('/testimonios',                    [TestimonioController::class, 'index'])->name('testimonios');
            Route::post('/testimonios',                   [TestimonioController::class, 'store'])->name('testimonios.store');
            Route::match(['post', 'put'], '/testimonios/{testimonio}', [TestimonioController::class, 'update'])->name('testimonios.update');
            Route::delete('/testimonios/{testimonio}',    [TestimonioController::class, 'destroy'])->name('testimonios.destroy');

            Route::get('/noticias',                       [NoticiaAdminController::class, 'index'])->name('noticias');
            Route::post('/noticias',                      [NoticiaAdminController::class, 'store'])->name('noticias.store');
            Route::match(['post', 'put'], '/noticias/{noticia}', [NoticiaAdminController::class, 'update'])->name('noticias.update');
            Route::delete('/noticias/{noticia}',          [NoticiaAdminController::class, 'destroy'])->name('noticias.destroy');

            Route::get('/preguntas',                      [PreguntaController::class, 'index'])->name('preguntas');
            Route::post('/preguntas',                     [PreguntaController::class, 'store'])->name('preguntas.store');
            Route::match(['post', 'put'], '/preguntas/{pregunta}', [PreguntaController::class, 'update'])->name('preguntas.update');
            Route::delete('/preguntas/{pregunta}',        [PreguntaController::class, 'destroy'])->name('preguntas.destroy');
        });

        // Deportes & Cuadrangulares — admin y deportes
        Route::middleware('admin.rol:admin,deportes')->group(function () {
            Route::get('/deportes-admin',                         [App\Http\Controllers\Admin\DeportesAdminController::class, 'index'])->name('deportes-admin');
            Route::post('/deportes-admin/toggle-bloqueo',         [App\Http\Controllers\Admin\DeportesAdminController::class, 'toggleBloqueo'])->name('deportes-admin.toggle-bloqueo');
            Route::match(['post', 'put'], '/deportes-admin/partidos/{partido}', [App\Http\Controllers\Admin\DeportesAdminController::class, 'actualizarPartido'])->name('deportes-admin.partidos.update');
            Route::post('/deportes-admin/banners',                [App\Http\Controllers\Admin\DeportesAdminController::class, 'storeBanner'])->name('deportes-admin.banners.store');
            Route::match(['post', 'put'], '/deportes-admin/banners/{banner}', [App\Http\Controllers\Admin\DeportesAdminController::class, 'updateBanner'])->name('deportes-admin.banners.update');
            Route::delete('/deportes-admin/banners/{banner}',     [App\Http\Controllers\Admin\DeportesAdminController::class, 'destroyBanner'])->name('deportes-admin.banners.destroy');
        });

        // Mantenimiento y Comandos del Sistema — solo superenv (sin admin.rol = ningún usuario de BD)
        Route::middleware('admin.rol')->group(function () {
            Route::get('/mantenimiento',                  [App\Http\Controllers\Admin\SystemAdminController::class, 'index'])->name('mantenimiento');
            Route::post('/sistema/ejecutar-comando',      [App\Http\Controllers\Admin\SystemAdminController::class, 'runCommand'])->name('sistema.comando');
        });

        // Carnets / NFC — solo superenv
        Route::middleware('admin.rol')->group(function () {
            Route::get('/carnets-admin',                   [App\Http\Controllers\Admin\CarnetsAdminController::class, 'index'])->name('carnets-admin');
            Route::post('/carnets-admin',                  [App\Http\Controllers\Admin\CarnetsAdminController::class, 'store'])->name('carnets-admin.store');
            Route::match(['post', 'put'], '/carnets-admin/{carnet}', [App\Http\Controllers\Admin\CarnetsAdminController::class, 'update'])->name('carnets-admin.update');
            Route::delete('/carnets-admin/{carnet}',       [App\Http\Controllers\Admin\CarnetsAdminController::class, 'destroy'])->name('carnets-admin.destroy');
            Route::post('/carnets-admin/probar',           [App\Http\Controllers\Admin\CarnetsAdminController::class, 'probar'])->name('carnets-admin.probar');
        });

        // Gestión de Usuarios del Panel (solo superadmin .env)
        Route::prefix('usuarios')->name('usuarios.')->group(function () {
            Route::get('/',                          [App\Http\Controllers\Admin\AdminUsersController::class, 'index'])->name('index');
            Route::post('/',                         [App\Http\Controllers\Admin\AdminUsersController::class, 'store'])->name('store');
            Route::match(['post', 'put'], '/{adminUser}', [App\Http\Controllers\Admin\AdminUsersController::class, 'update'])->name('update');
            Route::delete('/{adminUser}',            [App\Http\Controllers\Admin\AdminUsersController::class, 'destroy'])->name('destroy');
            Route::post('/{adminUser}/toggle',       [App\Http\Controllers\Admin\AdminUsersController::class, 'toggleActivo'])->name('toggle');
        });

        // Redirect raíz → testimonios
        Route::get('/', fn() => redirect()->route('admin.testimonios'))->name('dashboard');
    });

    // Carnets — Sistema de Control de Ingreso Kiosco (Autenticado por PIN o Admin)
    Route::get('/carnets', [App\Http\Controllers\CarnetsController::class, 'kiosco'])->name('carnets.kiosco');
    Route::post('/carnets/salir', [App\Http\Controllers\CarnetsController::class, 'salir'])->name('carnets.salir');
});
