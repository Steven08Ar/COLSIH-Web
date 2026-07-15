import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const valores = [
    { nombre: 'Respeto', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
    { nombre: 'Responsabilidad', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
    { nombre: 'Honestidad', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
    { nombre: 'Solidaridad', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
    { nombre: 'Excelencia', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
    { nombre: 'Compromiso', descripcion: '[Descripción de cómo el colegio vive este valor.]' },
];

export default function Valores() {
    return (
        <AppLayout>
            <Head title="Valores — Nosotros" />

            <section>
                <nav>
                    <Link href="/nosotros">Nosotros</Link> / Valores
                </nav>
                <h1>Nuestros Valores</h1>
                <p>
                    Los valores institucionales son el fundamento de la convivencia y el aprendizaje
                    en el Colegio Santa Isabel de Hungría.
                </p>
            </section>

            <section>
                <ul>
                    {valores.map((valor) => (
                        <li key={valor.nombre}>
                            <h3>{valor.nombre}</h3>
                            <p>{valor.descripcion}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <nav>
                <Link href="/nosotros/mision-vision">← Misión y Visión</Link>
                <Link href="/nosotros/equipo">Siguiente: Equipo →</Link>
            </nav>
        </AppLayout>
    );
}
