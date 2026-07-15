import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function MisionVision() {
    return (
        <AppLayout>
            <Head title="Misión y Visión — Nosotros" />

            <section>
                <nav>
                    <Link href="/nosotros">Nosotros</Link> / Misión y Visión
                </nav>
                <h1>Misión y Visión</h1>
            </section>

            <section>
                <h2>Misión</h2>
                <blockquote>
                    [Texto de la misión institucional del colegio. Ej: "El Colegio Santa Isabel de
                    Hungría forma personas íntegras, críticas y comprometidas con su entorno, a través
                    de una educación de calidad fundamentada en valores cristianos y humanistas."]
                </blockquote>
            </section>

            <section>
                <h2>Visión</h2>
                <blockquote>
                    [Texto de la visión institucional. Ej: "Para [año], el COLSIH será reconocido como
                    una institución educativa líder en [región], destacada por su excelencia académica,
                    innovación pedagógica y compromiso con la comunidad."]
                </blockquote>
            </section>

            <section>
                <h2>Objetivos institucionales</h2>
                <ul>
                    <li>[Objetivo 1]</li>
                    <li>[Objetivo 2]</li>
                    <li>[Objetivo 3]</li>
                    <li>[Objetivo 4]</li>
                </ul>
            </section>

            <section>
                <h2>Filosofía institucional</h2>
                <p>[Texto sobre el enfoque pedagógico y filosófico del colegio.]</p>
            </section>

            <nav>
                <Link href="/nosotros/historia">← Historia</Link>
                <Link href="/nosotros/valores">Siguiente: Valores →</Link>
            </nav>
        </AppLayout>
    );
}
