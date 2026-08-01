<?php

namespace Database\Seeders;

use App\Models\EquipoMember;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar tabla antes de poblar
        EquipoMember::truncate();

        $directivos = [
            ['nombre' => 'Sor Beatriz Cortés Jerez', 'cargo' => 'Rectora', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => '/docentes/Sor%20Betty.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 1],
            ['nombre' => 'Jaime Manuel Ardila Parra', 'cargo' => 'Coordinador Académico', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => '/docentes/Jaime%20Manuel.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 2],
            ['nombre' => 'Margarita María Valle Manrique', 'cargo' => 'Coordinadora de Convivencia', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => '/docentes/Margara.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 3],
            ['nombre' => 'Erika Tatiana Delgadillo Avella', 'cargo' => 'Coordinadora de Pastoral', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => '/docentes/Erika.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 4]
        ];

        $docentes = [
            ['nombre' => 'Adriana María Jaimes Ruiz', 'cargo' => 'Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => '/docentes/Adriana.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 1],
            ['nombre' => 'Bruna Mercedes Peña Solano', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => '/docentes/Bruna.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 2],
            ['nombre' => 'Clara Inés Joya Herrera', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => '/docentes/Clara.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 3],
            ['nombre' => 'Daniela Villamizar Villamizar', 'cargo' => 'Todas las Dimensiones', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => '/docentes/Daniela.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 4],
            ['nombre' => 'Diana Soidé Villamizar Bautista', 'cargo' => 'Lengua Castellana (Primaria)', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 5],
            ['nombre' => 'Edgar Javier García Estupiñán', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => '/docentes/Edgar.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 6],
            ['nombre' => 'Erika Tatiana Delgadillo Avella', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => '/docentes/Erika.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 7],
            ['nombre' => 'Fredy Neira Roa', 'cargo' => 'Matemáticas y Física', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => '/docentes/Fredy.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 8],
            ['nombre' => 'Gloria Mercedes Serrano Salazar', 'cargo' => 'Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => '/docentes/Gloria.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 9],
            ['nombre' => 'Héctor Manuel Garzón Gómez', 'cargo' => 'Ética y Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => '/docentes/Hector.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 10],
            ['nombre' => 'Irma Sánchez Espinosa', 'cargo' => 'Ciencias Naturales', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 11],
            ['nombre' => 'Iván Martínez Peña', 'cargo' => 'Tecnología e Informática', 'area' => 'Tecnología e Informática', 'tipo' => 'docente', 'foto' => '/docentes/Ivan.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 12],
            ['nombre' => 'Jenny Marcela Pérez Medina', 'cargo' => 'Química', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 13],
            ['nombre' => 'Jesús David Arias Estupiñán', 'cargo' => 'Tecnología y Estadística', 'area' => 'Tecnología e Informática', 'tipo' => 'docente', 'foto' => '/docentes/Jes%C3%BAs.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 14],
            ['nombre' => 'Jeyson Eduardo Suárez Ardila', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => '/docentes/Jeison.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 15],
            ['nombre' => 'Jeyson Mauricio Ávila Triana', 'cargo' => 'Ed. Física y Deportes', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => '/docentes/Jeyson.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 16],
            ['nombre' => 'Karen Navarro Pisciotti', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => '/docentes/Karen%20Piziote.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 17],
            ['nombre' => 'Karen Tatiana Linares Gelvez', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => '/docentes/Karen%20Linares.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 18],
            ['nombre' => 'Katerin Johanna Delgado Ruda', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => '/docentes/Katerin.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 19],
            ['nombre' => 'Lady Diana Osorio Fonseca', 'cargo' => 'Todas las Asignaturas', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => '/docentes/Ladi.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 20],
            ['nombre' => 'Leidy Andrea Portilla Gelvez', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => '/docentes/Leidy%20Portilla.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 21],
            ['nombre' => 'Leidy Paola Basto Ramírez', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => '/docentes/Leidy%20Bastos.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 22],
            ['nombre' => 'Ludwin Fernando Caballero Espinosa', 'cargo' => 'Ed. Física y Deportes', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => '/docentes/Ludwin.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 23],
            ['nombre' => 'Luz Adriana García Villamizar', 'cargo' => 'Artes y Ética', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 24],
            ['nombre' => 'Mayra Jisseth Sierra Lombana', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => '/docentes/Mayra.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 25],
            ['nombre' => 'Miguel Oswaldo Lizarazo Latorre', 'cargo' => 'Contabilidad SENA', 'area' => 'Contabilidad SENA', 'tipo' => 'docente', 'foto' => '/docentes/Miguel.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 26],
            ['nombre' => 'Paula Lorena Cuadros Ballesteros', 'cargo' => 'Todas las Dimensiones', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 27],
            ['nombre' => 'Robin Javier Aparicio Aparicio', 'cargo' => 'Filosofía y Ed. Religiosa', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => '/docentes/Robin.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 28],
            ['nombre' => 'Sandra Patricia Parada Leal', 'cargo' => 'Música', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => '/docentes/Sandra.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 29],
            ['nombre' => 'Sergio Andrés Mendoza Gómez', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => '/docentes/Sergio.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 30],
            ['nombre' => 'Yesica Zoraya Badillo Corredor', 'cargo' => 'Ciencias Naturales', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => '/docentes/Yesica%20Zoraya.JPG', 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 31],
            ['nombre' => 'Yoleida Patricia Camacho Corzo', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 32],
            ['nombre' => 'Yoni Amparo Méndez Álvarez', 'cargo' => 'Matemáticas e Informática', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => null, 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 33]
        ];

        foreach (array_merge($directivos, $docentes) as $m) {
            EquipoMember::create($m);
        }
    }
}
