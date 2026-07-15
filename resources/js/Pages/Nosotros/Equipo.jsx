import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const directivos = [
    { nombre: '[Nombre]', cargo: 'Rector/a', descripcion: '[Breve descripción o formación.]' },
    { nombre: '[Nombre]', cargo: 'Coordinador/a Académico/a', descripcion: '[Breve descripción.]' },
    { nombre: '[Nombre]', cargo: 'Coordinador/a de Convivencia', descripcion: '[Breve descripción.]' },
];

const areas = [
    'Ciencias Naturales y Educación Ambiental',
    'Ciencias Sociales',
    'Humanidades — Lengua Castellana',
    'Humanidades — Inglés',
    'Matemáticas',
    'Tecnología e Informática',
    'Educación Física',
    'Educación Artística',
    'Ética y Valores',
];

export default function Equipo() {
    return (
        <AppLayout>
            <Head title="Equipo — Nosotros" />

            <section>
                <nav>
                    <Link href="/nosotros">Nosotros</Link> / Equipo
                </nav>
                <h1>Nuestro Equipo</h1>
                <p>
                    Contamos con un equipo de docentes y directivos comprometidos con la excelencia
                    educativa y el bienestar de cada estudiante.
                </p>
            </section>

            <section>
                <h2>Directivos</h2>
                <div>
                    {directivos.map((persona) => (
                        <div key={persona.cargo}>
                            <h3>{persona.nombre}</h3>
                            <p>{persona.cargo}</p>
                            <p>{persona.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Cuerpo docente</h2>
                <p>Nuestros docentes son profesionales titulados en sus áreas de formación:</p>
                <ul>
                    {areas.map((area) => (
                        <li key={area}>{area}</li>
                    ))}
                </ul>
            </section>

            <nav>
                <Link href="/nosotros/valores">← Valores</Link>
            </nav>
        </AppLayout>
    );
}
