import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function NoticiasShow({ noticia, relacionadas }) {
    return (
        <AppLayout>
            <Head title={noticia.titulo} />

            <article>
                {/* Breadcrumb */}
                <nav aria-label="Ruta de navegación">
                    <Link href="/">Inicio</Link> /
                    <Link href="/noticias">Noticias</Link> /
                    <span aria-current="page">{noticia.titulo}</span>
                </nav>

                <header>
                    <span>{noticia.categoria}</span>
                    <h1>{noticia.titulo}</h1>
                    <time dateTime={noticia.publicado_en}>
                        {new Date(noticia.publicado_en).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </header>

                {noticia.imagen && (
                    <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo} />
                )}

                {noticia.resumen && (
                    <p><strong>{noticia.resumen}</strong></p>
                )}

                {/* Contenido — viene como HTML desde el backend */}
                <div dangerouslySetInnerHTML={{ __html: noticia.contenido }} />
            </article>

            {/* Noticias relacionadas */}
            {relacionadas.length > 0 && (
                <aside>
                    <h2>También te puede interesar</h2>
                    <div>
                        {relacionadas.map((item) => (
                            <article key={item.id}>
                                {item.imagen && (
                                    <img src={`/storage/${item.imagen}`} alt={item.titulo} />
                                )}
                                <h3>
                                    <Link href={`/noticias/${item.slug}`}>{item.titulo}</Link>
                                </h3>
                                <p>{item.resumen}</p>
                                <time dateTime={item.publicado_en}>
                                    {new Date(item.publicado_en).toLocaleDateString('es-CO')}
                                </time>
                            </article>
                        ))}
                    </div>
                </aside>
            )}

            <Link href="/noticias">← Volver a Noticias</Link>
        </AppLayout>
    );
}
