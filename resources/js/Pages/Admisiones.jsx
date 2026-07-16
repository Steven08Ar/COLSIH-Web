import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const pasos = [
    {
        numero: 1,
        titulo: 'Conoce la oferta académica',
        descripcion: 'Revisa los niveles, grados y jornadas disponibles para elegir el que mejor se adapta a tu familia.',
    },
    {
        numero: 2,
        titulo: 'Verifica los requisitos',
        descripcion: 'Consulta los documentos requeridos y los cupos disponibles para el grado de interés.',
    },
    {
        numero: 3,
        titulo: 'Diligencia el formulario',
        descripcion: 'Completa el formulario de inscripción en línea con los datos del estudiante y del acudiente.',
    },
    {
        numero: 4,
        titulo: 'Pago de inscripción',
        descripcion: 'Realiza el pago de los derechos de inscripción a través de nuestra plataforma segura.',
    },
    {
        numero: 5,
        titulo: 'Revisión y respuesta',
        descripcion: 'El equipo directivo revisará la solicitud y te notificará al correo registrado en un plazo de [X] días hábiles.',
    },
    {
        numero: 6,
        titulo: 'Matrícula',
        descripcion: 'Una vez aprobada la inscripción, recibirás las instrucciones para formalizar la matrícula.',
    },
];

const requisitos = [
    'Registro civil de nacimiento (menores de 7 años) o Tarjeta de identidad',
    'Certificado de notas del año anterior',
    'Constancia de estudio del año anterior',
    'Carné de vacunación (preescolar y primaria)',
    'Documento de identidad del acudiente',
    '[Otros documentos específicos del colegio]',
];

export default function Admisiones() {
    return (
        <AppLayout>
            <Head title="Admisiones | COLSIH" />

            <section>
                <h1>Proceso de Admisiones</h1>
                <p>
                    Te explicamos paso a paso cómo inscribir a tu hijo/a en el Colegio Santa Isabel
                    de Hungría. El proceso es sencillo y puedes completarlo en línea.
                </p>
            </section>

            <section>
                <h2>Calendario de admisiones</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Etapa</th>
                            <th>Fechas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Apertura de inscripciones</td>
                            <td>[Fecha de inicio]</td>
                        </tr>
                        <tr>
                            <td>Cierre de inscripciones</td>
                            <td>[Fecha de cierre]</td>
                        </tr>
                        <tr>
                            <td>Publicación de resultados</td>
                            <td>[Fecha]</td>
                        </tr>
                        <tr>
                            <td>Período de matrícula</td>
                            <td>[Fechas]</td>
                        </tr>
                        <tr>
                            <td>Inicio de clases</td>
                            <td>[Fecha]</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Pasos para la inscripción</h2>
                <ol>
                    {pasos.map((paso) => (
                        <li key={paso.numero}>
                            <h3>Paso {paso.numero}: {paso.titulo}</h3>
                            <p>{paso.descripcion}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section>
                <h2>Documentos requeridos</h2>
                <ul>
                    {requisitos.map((req, i) => (
                        <li key={i}>{req}</li>
                    ))}
                </ul>
                <p>
                    <strong>Nota:</strong> Los documentos deben adjuntarse digitalmente durante el
                    proceso de inscripción en línea (PDF o imagen, máx. 2 MB por archivo).
                </p>
            </section>

            <section>
                <h2>Costos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Derechos de inscripción</td>
                            <td>[Valor] COP</td>
                        </tr>
                        <tr>
                            <td>Matrícula</td>
                            <td>[Valor] COP</td>
                        </tr>
                        <tr>
                            <td>Pensión mensual</td>
                            <td>[Valor] COP</td>
                        </tr>
                    </tbody>
                </table>
                <p>Los valores pueden variar según el grado y la jornada. Consulta con la institución.</p>
            </section>

            <section>
                <h2>¿Tienes dudas?</h2>
                <p>Nuestro equipo está disponible para orientarte en el proceso.</p>
                <Link href="/contacto">Contáctanos</Link>
                <Link href="/inscripcion">Ir al formulario de inscripción →</Link>
            </section>
        </AppLayout>
    );
}
