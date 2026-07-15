import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function NosotrosIndex() {
    return (
        <AppLayout>
            <Head title="Nosotros" />

            <section>
                <h1>Sobre el Colegio Santa Isabel de Hungría</h1>
                <p>
                    El Colegio Santa Isabel de Hungría — COLSIH — es una institución educativa comprometida
                    con la formación integral de sus estudiantes, fomentando valores, conocimiento y sentido
                    de comunidad.
                </p>
            </section>

            <nav>
                <Link href="/nosotros/historia">Historia</Link>
                <Link href="/nosotros/mision-vision">Misión y Visión</Link>
                <Link href="/nosotros/valores">Valores</Link>
                <Link href="/nosotros/equipo">Equipo</Link>
            </nav>

            <section>
                <h2>¿Quiénes somos?</h2>
                <p>[Texto de presentación general del colegio]</p>
            </section>

            <section>
                <h2>Nuestra propuesta educativa</h2>
                <ul>
                    <li>Educación preescolar, primaria y secundaria</li>
                    <li>Énfasis en formación en valores</li>
                    <li>Comunidad educativa activa y participativa</li>
                    <li>[Otros aspectos diferenciadores]</li>
                </ul>
            </section>

            <section>
                <h2>Explora más</h2>
                <div>
                    <Link href="/nosotros/historia">
                        <h3>Historia</h3>
                        <p>Conoce nuestros orígenes y evolución a lo largo de los años.</p>
                    </Link>
                    <Link href="/nosotros/mision-vision">
                        <h3>Misión y Visión</h3>
                        <p>Nuestros propósitos y hacia dónde nos dirigimos como institución.</p>
                    </Link>
                    <Link href="/nosotros/valores">
                        <h3>Valores</h3>
                        <p>Los principios que guían nuestra comunidad educativa.</p>
                    </Link>
                    <Link href="/nosotros/equipo">
                        <h3>Equipo</h3>
                        <p>Directivos y docentes que hacen posible nuestra misión.</p>
                    </Link>
                </div>
            </section>
        </AppLayout>
    );
}
