<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default news if the database is empty
        if (\App\Models\Noticia::count() === 0) {
            \App\Models\Noticia::create([
                'titulo' => 'Inauguración de los nuevos laboratorios de robótica y tecnología',
                'slug' => 'inauguracion-laboratorios-robotica',
                'resumen' => 'COLSIH estrena modernas instalaciones diseñadas para fomentar las competencias STEM en programación y diseño 3D desde grados de primaria.',
                'contenido' => 'Nos complace anunciar la inauguración oficial de nuestros nuevos laboratorios de robótica y tecnología. Este moderno espacio ha sido diseñado para equipar a nuestros estudiantes con herramientas de última generación, facilitando el aprendizaje práctico en áreas clave como programación, robótica y diseño 3D. Agradecemos a toda la comunidad educativa por hacer posible este gran paso hacia la excelencia educativa digital.',
                'categoria' => 'noticia',
                'activo' => true,
                'publicado_en' => now(),
            ]);

            \App\Models\Noticia::create([
                'titulo' => 'Excelente desempeño de la promoción 2025 en las Pruebas Saber 11',
                'slug' => 'excelente-desempeno-pruebas-saber',
                'resumen' => 'Nuestros estudiantes se posicionan nuevamente en el nivel Muy Superior, destacando el liderazgo académico integral que nos caracteriza.',
                'contenido' => 'Felicitamos a nuestra Promoción 2025 por su excelente desempeño en las pruebas Saber 11. Su esfuerzo, dedicación y compromiso constante han dado frutos excepcionales, consolidando una vez más el posicionamiento de nuestra institución en los rangos académicos más altos de la región. Seguiremos guando y acompañando a nuestros jóvenes líderes en su camino profesional.',
                'categoria' => 'noticia',
                'activo' => true,
                'publicado_en' => now(),
            ]);

            \App\Models\Noticia::create([
                'titulo' => 'Olimpiadas Deportivas Salesianas y convivencia COLSIH 2026',
                'slug' => 'olimpiadas-deportivas-salesianas',
                'resumen' => 'Una semana dedicada al deporte, la sana recreación y el fortalecimiento de los valores de solidaridad y paz de toda la comunidad educativa.',
                'contenido' => 'El espíritu deportivo y la sana convivencia se tomaron el colegio durante nuestras Olimpiadas Deportivas Salesianas. A través de disciplinas como fútbol, baloncesto y atletismo, nuestros estudiantes demostraron sus talentos físicos y vivieron jornadas llenas de alegría, compañerismo y respeto mutuo. Agradecemos a los docentes de educación física y a los padres por su gran apoyo.',
                'categoria' => 'evento',
                'activo' => true,
                'publicado_en' => now(),
            ]);
        }
    }
}
