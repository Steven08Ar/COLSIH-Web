import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const niveles = [
    {
        nombre: 'Preescolar',
        grados: ['Prejardín', 'Jardín', 'Transición'],
        descripcion: '[Descripción del nivel preescolar, enfoque y metodología.]',
        edad: '3 a 6 años',
    },
    {
        nombre: 'Educación Básica Primaria',
        grados: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'],
        descripcion: '[Descripción del nivel primaria, enfoque y metodología.]',
        edad: '6 a 11 años',
    },
    {
        nombre: 'Educación Básica Secundaria',
        grados: ['Sexto', 'Séptimo', 'Octavo', 'Noveno'],
        descripcion: '[Descripción del nivel secundaria, enfoque y metodología.]',
        edad: '11 a 15 años',
    },
    {
        nombre: 'Educación Media',
        grados: ['Décimo', 'Undécimo'],
        descripcion: '[Descripción del nivel media, énfasis y preparación para educación superior.]',
        edad: '15 a 17 años',
    },
];

const jornadas = [
    { nombre: 'Mañana', horario: '[Ej: 6:30 a.m. – 12:30 p.m.]' },
    { nombre: 'Tarde', horario: '[Ej: 12:30 p.m. – 6:00 p.m.]' },
];

export default function OfertaAcademica() {
    return (
        <AppLayout>
            <Head title="Oferta Académica" />

            <section>
                <h1>Oferta Académica</h1>
                <p>
                    Ofrecemos una educación completa desde preescolar hasta grado undécimo,
                    con énfasis en formación integral y excelencia académica.
                </p>
            </section>

            <section>
                <h2>Niveles educativos</h2>
                {niveles.map((nivel) => (
                    <article key={nivel.nombre}>
                        <h3>{nivel.nombre}</h3>
                        <p><strong>Edad:</strong> {nivel.edad}</p>
                        <p><strong>Grados:</strong> {nivel.grados.join(', ')}</p>
                        <p>{nivel.descripcion}</p>
                    </article>
                ))}
            </section>

            <section>
                <h2>Jornadas</h2>
                <div>
                    {jornadas.map((jornada) => (
                        <div key={jornada.nombre}>
                            <h3>Jornada {jornada.nombre}</h3>
                            <p>{jornada.horario}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Áreas del conocimiento</h2>
                <ul>
                    <li>Ciencias Naturales y Educación Ambiental</li>
                    <li>Ciencias Sociales, Historia y Geografía</li>
                    <li>Educación Artística</li>
                    <li>Educación Ética y en Valores Humanos</li>
                    <li>Educación Física, Recreación y Deportes</li>
                    <li>Humanidades — Lengua Castellana e Inglés</li>
                    <li>Matemáticas</li>
                    <li>Tecnología e Informática</li>
                    <li>[Otras áreas o actividades extracurriculares]</li>
                </ul>
            </section>

            <section>
                <h2>Actividades extracurriculares</h2>
                <ul>
                    <li>[Deporte o actividad 1]</li>
                    <li>[Deporte o actividad 2]</li>
                    <li>[Club o semillero]</li>
                </ul>
            </section>

            <section>
                <h2>¿Quieres saber más?</h2>
                <p>Consulta nuestro proceso de admisiones o comunícate con nosotros.</p>
                <Link href="/admisiones">Ver proceso de admisión</Link>
                <Link href="/contacto">Contactar al colegio</Link>
            </section>
        </AppLayout>
    );
}
