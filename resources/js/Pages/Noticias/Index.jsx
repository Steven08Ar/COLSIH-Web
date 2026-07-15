import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const CATEGORIAS = [
    { value: '', label: 'Todas' },
    { value: 'noticia', label: 'Noticias' },
    { value: 'evento', label: 'Eventos' },
    { value: 'comunicado', label: 'Comunicados' },
];

export default function NoticiasIndex({ noticias, categoriaActual }) {
    function filtrarPorCategoria(categoria) {
        router.get('/noticias', categoria ? { categoria } : {}, { preserveState: true });
    }

    return (
        <AppLayout>
            <Head title="Noticias y Eventos" />

            <section>
                <h1>Noticias y Eventos</h1>
                <p>Mantente informado sobre todo lo que ocurre en el COLSIH.</p>
            </section>

            {/* Filtros por categoría */}
            <nav aria-label="Filtrar por categoría">
                {CATEGORIAS.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => filtrarPorCategoria(cat.value)}
                        aria-pressed={categoriaActual === cat.value || (!categoriaActual && cat.value === '')}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            {/* Listado */}
            {noticias.data.length === 0 ? (
                <p>No hay publicaciones en esta categoría por el momento.</p>
            ) : (
                <div>
                    {noticias.data.map((noticia) => (
                        <article key={noticia.id}>
                            {noticia.imagen && (
                                <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo} />
                            )}
                            <span>{noticia.categoria}</span>
                            <h2>
                                <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
                            </h2>
                            <p>{noticia.resumen}</p>
                            <time dateTime={noticia.publicado_en}>
                                {new Date(noticia.publicado_en).toLocaleDateString('es-CO', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <Link href={`/noticias/${noticia.slug}`}>Leer más →</Link>
                        </article>
                    ))}
                </div>
            )}

            {/* Paginación */}
            {noticias.last_page > 1 && (
                <nav aria-label="Paginación">
                    {noticias.links.map((link, i) => (
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                aria-current={link.active ? 'page' : undefined}
                            />
                        ) : (
                            <span key={i} dangerouslySetInnerHTML={{ __html: link.label }} />
                        )
                    ))}
                </nav>
            )}
        </AppLayout>
    );
}
