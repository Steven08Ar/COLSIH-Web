<?php

use App\Http\Controllers\AdmisionesController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\NoticiaAdminController;
use App\Http\Controllers\Admin\PreguntaController;
use App\Http\Controllers\Admin\TestimonioController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\NoticiasController;
use App\Http\Controllers\NosotrosController;
use App\Http\Controllers\OfertaAcademicaController;
use Illuminate\Support\Facades\Route;

// Home
Route::get('/', HomeController::class)->name('home');

// MJS
Route::get('/mjs', function () {
    return inertia('Mjs');
})->name('mjs');

// Nosotros
Route::prefix('nosotros')->name('nosotros.')->group(function () {
    Route::get('/', [NosotrosController::class, 'index'])->name('index');
    Route::get('/historia', [NosotrosController::class, 'historia'])->name('historia');
    Route::get('/mision-vision', [NosotrosController::class, 'misionVision'])->name('mision-vision');
    Route::get('/valores', [NosotrosController::class, 'valores'])->name('valores');
    Route::get('/equipo', [NosotrosController::class, 'equipo'])->name('equipo');
});

// Oferta académica
Route::get('/oferta-academica', OfertaAcademicaController::class)->name('oferta-academica');

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

// Contacto
Route::prefix('contacto')->name('contacto.')->group(function () {
    Route::get('/', [ContactoController::class, 'index'])->name('index');
    Route::post('/', [ContactoController::class, 'store'])->name('store');
});

// Panel administrativo — URL oculta definida en .env (ADMIN_PATH)
$adminPath = env('ADMIN_PATH', 'panel-admin');

Route::prefix($adminPath)->name('admin.')->group(function () {
    // Acceso público: solo login
    Route::get('/login',  [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');

    // Rutas protegidas
    Route::middleware('admin.auth')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

        // Testimonios
        Route::get('/testimonios',                    [TestimonioController::class, 'index'])->name('testimonios');
        Route::post('/testimonios',                   [TestimonioController::class, 'store'])->name('testimonios.store');
        Route::put('/testimonios/{testimonio}',       [TestimonioController::class, 'update'])->name('testimonios.update');
        Route::delete('/testimonios/{testimonio}',    [TestimonioController::class, 'destroy'])->name('testimonios.destroy');

        // Noticias / Eventos
        Route::get('/noticias',                       [NoticiaAdminController::class, 'index'])->name('noticias');
        Route::post('/noticias',                      [NoticiaAdminController::class, 'store'])->name('noticias.store');
        Route::put('/noticias/{noticia}',             [NoticiaAdminController::class, 'update'])->name('noticias.update');
        Route::delete('/noticias/{noticia}',          [NoticiaAdminController::class, 'destroy'])->name('noticias.destroy');

        // Preguntas frecuentes
        Route::get('/preguntas',                      [PreguntaController::class, 'index'])->name('preguntas');
        Route::post('/preguntas',                     [PreguntaController::class, 'store'])->name('preguntas.store');
        Route::put('/preguntas/{pregunta}',           [PreguntaController::class, 'update'])->name('preguntas.update');
        Route::delete('/preguntas/{pregunta}',        [PreguntaController::class, 'destroy'])->name('preguntas.destroy');

        // Redirect raíz → testimonios
        Route::get('/', fn() => redirect()->route('admin.testimonios'))->name('dashboard');
    });
});
