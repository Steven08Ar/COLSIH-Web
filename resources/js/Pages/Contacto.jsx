import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Contacto() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/contacto', { onSuccess: () => reset() });
    }

    return (
        <AppLayout>
            <Head title="Contacto | COLSIH" />

            <section>
                <h1>Contáctanos</h1>
                <p>
                    Estamos aquí para resolver tus dudas. Escríbenos y te responderemos
                    en el menor tiempo posible.
                </p>
            </section>

            <div>
                {/* Información de contacto */}
                <section>
                    <h2>Información de contacto</h2>
                    <address>
                        <p><strong>Dirección:</strong> [Dirección del colegio]</p>
                        <p><strong>Teléfono:</strong> [Número de teléfono]</p>
                        <p><strong>WhatsApp:</strong> [Número de WhatsApp]</p>
                        <p><strong>Email:</strong> [Email institucional]</p>
                        <p><strong>Horario de atención:</strong> Lunes a viernes, [horario]</p>
                    </address>

                    <section>
                        <h3>Redes sociales</h3>
                        <p>Facebook: [Enlace o nombre]</p>
                        <p>Instagram: [Enlace o nombre]</p>
                    </section>

                    <section>
                        <h3>Ubicación</h3>
                        <p>[Mapa o referencia de cómo llegar al colegio]</p>
                        {/* Placeholder para mapa — se integrará Google Maps */}
                        <div style={{ border: '1px solid #ccc', padding: '2rem', textAlign: 'center' }}>
                            [Mapa — Google Maps iframe aquí]
                        </div>
                    </section>
                </section>

                {/* Formulario */}
                <section>
                    <h2>Envíanos un mensaje</h2>

                    {wasSuccessful && (
                        <p role="alert">
                            Tu mensaje fue enviado correctamente. Te responderemos pronto.
                        </p>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="nombre">Nombre completo *</label>
                            <input
                                id="nombre"
                                type="text"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                required
                            />
                            {errors.nombre && <span role="alert">{errors.nombre}</span>}
                        </div>

                        <div>
                            <label htmlFor="email">Correo electrónico *</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <span role="alert">{errors.email}</span>}
                        </div>

                        <div>
                            <label htmlFor="telefono">Teléfono (opcional)</label>
                            <input
                                id="telefono"
                                type="tel"
                                value={data.telefono}
                                onChange={(e) => setData('telefono', e.target.value)}
                            />
                            {errors.telefono && <span role="alert">{errors.telefono}</span>}
                        </div>

                        <div>
                            <label htmlFor="asunto">Asunto *</label>
                            <input
                                id="asunto"
                                type="text"
                                value={data.asunto}
                                onChange={(e) => setData('asunto', e.target.value)}
                                required
                            />
                            {errors.asunto && <span role="alert">{errors.asunto}</span>}
                        </div>

                        <div>
                            <label htmlFor="mensaje">Mensaje *</label>
                            <textarea
                                id="mensaje"
                                rows={5}
                                value={data.mensaje}
                                onChange={(e) => setData('mensaje', e.target.value)}
                                required
                            />
                            {errors.mensaje && <span role="alert">{errors.mensaje}</span>}
                        </div>

                        <button type="submit" disabled={processing}>
                            {processing ? 'Enviando…' : 'Enviar mensaje'}
                        </button>
                    </form>
                </section>
            </div>
        </AppLayout>
    );
}
