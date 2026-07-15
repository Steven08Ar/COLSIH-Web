import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const hitos = [
    { año: '[Año fundación]', texto: 'Fundación del colegio por [fundador/a].' },
    { año: '[Año]', texto: '[Hito importante — ej. primera promoción de bachilleres].' },
    { año: '[Año]', texto: '[Hito importante — ej. ampliación de planta física].' },
    { año: '[Año]', texto: '[Hito importante — ej. acreditación o reconocimiento].' },
    { año: 'Hoy', texto: 'Una institución consolidada al servicio de la comunidad.' },
];

export default function Historia() {
    return (
        <AppLayout>
            <Head title="Historia — Nosotros" />

            <section>
                <nav>
                    <Link href="/nosotros">Nosotros</Link> / Historia
                </nav>
                <h1>Nuestra Historia</h1>
                <p>
                    Desde sus inicios, el Colegio Santa Isabel de Hungría ha construido un legado de
                    compromiso con la educación de calidad y la formación humana en [Ciudad/Región].
                </p>
            </section>

            <section>
                <h2>Línea de tiempo</h2>
                <ol>
                    {hitos.map((hito, i) => (
                        <li key={i}>
                            <strong>{hito.año}</strong>
                            <p>{hito.texto}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <h2>Nuestra identidad</h2>
                <p>[Texto sobre la identidad institucional, su nombre, patrona, etc.]</p>
                <p>
                    El nombre <em>Santa Isabel de Hungría</em> hace referencia a [significado e historia
                    de la patrona], cuyos valores de servicio y entrega guían el espíritu de nuestra
                    institución.
                </p>
            </section>

            <nav>
                <Link href="/nosotros/mision-vision">Siguiente: Misión y Visión →</Link>
            </nav>
        </AppLayout>
    );
}
