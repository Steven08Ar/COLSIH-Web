import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Confirmacion({ inscripcion }) {
    return (
        <AppLayout>
            <Head title="Inscripción recibida" />

            <section>
                <h1>¡Inscripción recibida!</h1>
                <p>
                    Gracias, <strong>{inscripcion.nombre_estudiante}</strong>.
                    Tu solicitud de inscripción ha sido registrada exitosamente.
                </p>
            </section>

            <section>
                <h2>Resumen de tu inscripción</h2>
                <dl>
                    <dt>Número de radicado</dt>
                    <dd>#{inscripcion.id}</dd>

                    <dt>Estudiante</dt>
                    <dd>{inscripcion.nombre_estudiante}</dd>

                    <dt>Grado solicitado</dt>
                    <dd>{inscripcion.grado_solicitado}</dd>

                    <dt>Estado actual</dt>
                    <dd>{inscripcion.estado}</dd>

                    <dt>Correo de notificaciones</dt>
                    <dd>{inscripcion.acudiente_email}</dd>
                </dl>
            </section>

            <section>
                <h2>¿Qué sigue?</h2>
                <ol>
                    <li>
                        Recibirás un correo de confirmación en <strong>{inscripcion.acudiente_email}</strong> con
                        el resumen de tu solicitud.
                    </li>
                    <li>
                        El equipo del colegio revisará tu inscripción en un plazo de [X] días hábiles.
                    </li>
                    <li>
                        Te notificaremos por correo con el resultado y los pasos a seguir para el pago
                        y la matrícula.
                    </li>
                </ol>
            </section>

            {/* Placeholder pago — se activa con integración de pasarela */}
            <section>
                <h2>Pago de inscripción</h2>
                <p>
                    Una vez revisada tu solicitud, recibirás las instrucciones para realizar el pago
                    de los derechos de inscripción a través de nuestra plataforma segura.
                </p>
                {/* Botón de pago — se habilitará con la pasarela */}
                <p>
                    <em>El módulo de pago en línea estará disponible próximamente.</em>
                </p>
            </section>

            <section>
                <Link href="/">Volver al inicio</Link>
                <Link href="/contacto">¿Tienes dudas? Contáctanos</Link>
            </section>
        </AppLayout>
    );
}
