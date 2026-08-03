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

        $r2DocentesBase = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/equipo/docentes/";
        $r2AdminsBase   = "https://pub-c4ddb3fb75904158bbda5fbc35d6963e.r2.dev/nuestro_colegio/equipo/administrativos/";

        $directivos = [
            ['nombre' => 'Sor Beatriz Cortés Jerez', 'cargo' => 'Rectora', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => $r2AdminsBase . rawurlencode('Sor Beatriz Cortés Jerez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 1],
            ['nombre' => 'Jaime Manuel Ardila Parra', 'cargo' => 'Coordinador Académico', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => $r2DocentesBase . rawurlencode('Jaime Manuel Ardila Parra.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 2],
            ['nombre' => 'Margarita María Valle Manrique', 'cargo' => 'Coordinadora de Convivencia', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => $r2DocentesBase . rawurlencode('Margarita María Valle Manrique.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 3],
            ['nombre' => 'Erika Tatiana Delgadillo Avella', 'cargo' => 'Coordinadora de Pastoral', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => $r2DocentesBase . rawurlencode('Erika Tatiana Delgadillo Avella.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 4],
            ['nombre' => 'Mayra Alexandra Parada Ruiz', 'cargo' => 'Psicoorientación / Apoyo Administrativo', 'area' => 'Equipo Directivo', 'tipo' => 'directivo', 'foto' => $r2AdminsBase . rawurlencode('Mayra Alexandra Parada Ruiz.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 5],
        ];

        $docentes = [
            ['nombre' => 'Adriana María Jaimes Ruiz', 'cargo' => 'Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Adriana María Jaimes Ruiz.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 1],
            ['nombre' => 'Bruna Mercedes Peña Solano', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Bruna Mercedes Peña Solano.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 2],
            ['nombre' => 'Clara Inés Joya Herrera', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Clara Inés Joya Herrera.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 3],
            ['nombre' => 'Daniela Villamizar Villamizar', 'cargo' => 'Todas las Dimensiones', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Daniela Villamizar Villamizar.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 4],
            ['nombre' => 'Diana Soidé Villamizar Bautista', 'cargo' => 'Lengua Castellana (Primaria)', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Diana Soidé Villamizar Bautista.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 5],
            ['nombre' => 'Edgar Javier García Estupiñán', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Edgar Javier García Estupiñán.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 6],
            ['nombre' => 'Erika Tatiana Delgadillo Avella', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Erika Tatiana Delgadillo Avella.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 7],
            ['nombre' => 'Fredy Neira Roa', 'cargo' => 'Matemáticas y Física', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Fredy Neira Roa.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 8],
            ['nombre' => 'Gloria Mercedes Serrano Salazar', 'cargo' => 'Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Gloria Mercedes Serrano Salazar.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 9],
            ['nombre' => 'Héctor Manuel Garzón Gómez', 'cargo' => 'Ética y Ed. Religiosa', 'area' => 'Ed. Religiosa y Ética', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Héctor Manuel Garzón Gómez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 10],
            ['nombre' => 'Irma Sánchez Espinosa', 'cargo' => 'Ciencias Naturales', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Irma Sanchez Espinosa.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 11],
            ['nombre' => 'Iván Martínez Peña', 'cargo' => 'Tecnología e Informática', 'area' => 'Tecnología e Informática', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Iván Martínez Peña.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 12],
            ['nombre' => 'Jenny Marcela Pérez Medina', 'cargo' => 'Química', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Jenny Marcela Pérez Medina.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 13],
            ['nombre' => 'Jesús David Arias Estupiñán', 'cargo' => 'Tecnología y Estadística', 'area' => 'Tecnología e Informática', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Jesús David Arias Estupiñán.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 14],
            ['nombre' => 'Jeyson Eduardo Suárez Ardila', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Jeyson Eduardo Suárez Ardila.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 15],
            ['nombre' => 'Jeyson Mauricio Ávila Triana', 'cargo' => 'Ed. Física y Deportes', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Jeyson Mauricio Ávila Triana.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 16],
            ['nombre' => 'Karen Navarro Pisciotti', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Karen Navarro Pisciotti.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 17],
            ['nombre' => 'Karen Tatiana Linares Gelvez', 'cargo' => 'Lengua Castellana', 'area' => 'Lengua Castellana', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Karen Tatiana Linares Gelvez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 18],
            ['nombre' => 'Katerin Johanna Delgado Ruda', 'cargo' => 'Ciencias Sociales', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Katerin Johanna Delgado Ruda.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 19],
            ['nombre' => 'Lady Diana Osorio Fonseca', 'cargo' => 'Todas las Asignaturas', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Lady Diana Osorio Fonseca.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 20],
            ['nombre' => 'Leidy Andrea Portilla Gelvez', 'cargo' => 'Matemáticas', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Leidy Andrea Portilla Gelvez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 21],
            ['nombre' => 'Leidy Paola Basto Ramírez', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Leidy Paola Basto Ramírez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 22],
            ['nombre' => 'Ludwin Fernando Caballero Espinosa', 'cargo' => 'Ed. Física y Deportes', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Ludwin Fernando Caballero Espinosa.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 23],
            ['nombre' => 'Luz Adriana García Villamizar', 'cargo' => 'Artes y Ética', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Luz Adriana García Villamizar.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 24],
            ['nombre' => 'Mayra Jisseth Sierra Lombana', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Mayra Jisseth Sierra Lombana.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 25],
            ['nombre' => 'Miguel Oswaldo Lizarazo Latorre', 'cargo' => 'Contabilidad SENA', 'area' => 'Contabilidad SENA', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Miguel Oswaldo Lizarazo Latorre.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 26],
            ['nombre' => 'Paula Lorena Cuadros Ballesteros', 'cargo' => 'Todas las Dimensiones', 'area' => 'Preescolar y Primaria', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Paula Lorena Cuadros Ballesteros.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 27],
            ['nombre' => 'Robin Javier Aparicio Aparicio', 'cargo' => 'Filosofía y Ed. Religiosa', 'area' => 'Ciencias Sociales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Robin Javier Aparicio Aparicio.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 28],
            ['nombre' => 'Sandra Patricia Parada Leal', 'cargo' => 'Música', 'area' => 'Ed. Física y Expresión', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Sandra Patricia Parada Leal.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 29],
            ['nombre' => 'Sergio Andrés Mendoza Gómez', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Sergio Andrés Mendoza Gómez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 30],
            ['nombre' => 'Yesica Zoraya Badillo Corredor', 'cargo' => 'Ciencias Naturales', 'area' => 'Ciencias Naturales', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Yesica Zoraya Badillo Corredor.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 31],
            ['nombre' => 'Yoleida Patricia Camacho Corzo', 'cargo' => 'Inglés', 'area' => 'Inglés', 'tipo' => 'docente', 'foto' => $r2AdminsBase . rawurlencode('Yoleida Patricia Camacho Corzo.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 32],
            ['nombre' => 'Yoni Amparo Méndez Álvarez', 'cargo' => 'Matemáticas e Informática', 'area' => 'Matemáticas', 'tipo' => 'docente', 'foto' => $r2DocentesBase . rawurlencode('Yoni Amparo Méndez Álvarez.JPG'), 'foto_posicion' => 20, 'foto_posicion_x' => 50, 'foto_posicion_y' => 20, 'foto_zoom' => 100, 'orden' => 33]
        ];

        foreach (array_merge($directivos, $docentes) as $m) {
            EquipoMember::create($m);
        }
    }
}
