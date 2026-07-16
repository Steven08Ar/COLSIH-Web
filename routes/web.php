<?php

use App\Http\Controllers\AdmisionesController;
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
