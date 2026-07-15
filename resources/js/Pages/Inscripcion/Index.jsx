import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const GRADOS = [
    'Prejardín', 'Jardín', 'Transición',
    'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto',
    'Sexto', 'Séptimo', 'Octavo', 'Noveno',
    'Décimo', 'Undécimo',
];

const PASOS = ['Datos del estudiante', 'Datos del acudiente', 'Revisión y envío'];

function PasoIndicador({ pasoActual }) {
    return (
        <nav aria-label="Pasos del formulario">
            <ol>
                {PASOS.map((label, i) => (
                    <li key={i} aria-current={i === pasoActual ? 'step' : undefined}>
                        <span>{i + 1}</span> {label}
                        {i < PASOS.length - 1 && <span aria-hidden> → </span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function PasoEstudiante({ data, setData, errors }) {
    return (
        <fieldset>
            <legend>Datos del estudiante</legend>

            <div>
                <label htmlFor="estudiante_nombres">Nombres *</label>
                <input
                    id="estudiante_nombres"
                    type="text"
                    value={data.estudiante_nombres}
                    onChange={(e) => setData('estudiante_nombres', e.target.value)}
                    required
                />
                {errors.estudiante_nombres && <span role="alert">{errors.estudiante_nombres}</span>}
            </div>

            <div>
                <label htmlFor="estudiante_apellidos">Apellidos *</label>
                <input
                    id="estudiante_apellidos"
                    type="text"
                    value={data.estudiante_apellidos}
                    onChange={(e) => setData('estudiante_apellidos', e.target.value)}
                    required
                />
                {errors.estudiante_apellidos && <span role="alert">{errors.estudiante_apellidos}</span>}
            </div>

            <div>
                <label htmlFor="estudiante_fecha_nacimiento">Fecha de nacimiento *</label>
                <input
                    id="estudiante_fecha_nacimiento"
                    type="date"
                    value={data.estudiante_fecha_nacimiento}
                    onChange={(e) => setData('estudiante_fecha_nacimiento', e.target.value)}
                    required
                />
                {errors.estudiante_fecha_nacimiento && <span role="alert">{errors.estudiante_fecha_nacimiento}</span>}
            </div>

            <div>
                <label htmlFor="estudiante_genero">Género *</label>
                <select
                    id="estudiante_genero"
                    value={data.estudiante_genero}
                    onChange={(e) => setData('estudiante_genero', e.target.value)}
                    required
                >
                    <option value="">Selecciona…</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </select>
                {errors.estudiante_genero && <span role="alert">{errors.estudiante_genero}</span>}
            </div>

            <div>
                <label htmlFor="estudiante_tipo_documento">Tipo de documento *</label>
                <select
                    id="estudiante_tipo_documento"
                    value={data.estudiante_tipo_documento}
                    onChange={(e) => setData('estudiante_tipo_documento', e.target.value)}
                    required
                >
                    <option value="">Selecciona…</option>
                    <option value="rc">Registro civil</option>
                    <option value="ti">Tarjeta de identidad</option>
                    <option value="pasaporte">Pasaporte</option>
                </select>
                {errors.estudiante_tipo_documento && <span role="alert">{errors.estudiante_tipo_documento}</span>}
            </div>

            <div>
                <label htmlFor="estudiante_numero_documento">Número de documento *</label>
                <input
                    id="estudiante_numero_documento"
                    type="text"
                    value={data.estudiante_numero_documento}
                    onChange={(e) => setData('estudiante_numero_documento', e.target.value)}
                    required
                />
                {errors.estudiante_numero_documento && <span role="alert">{errors.estudiante_numero_documento}</span>}
            </div>

            <div>
                <label htmlFor="grado_solicitado">Grado al que aspira *</label>
                <select
                    id="grado_solicitado"
                    value={data.grado_solicitado}
                    onChange={(e) => setData('grado_solicitado', e.target.value)}
                    required
                >
                    <option value="">Selecciona…</option>
                    {GRADOS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                {errors.grado_solicitado && <span role="alert">{errors.grado_solicitado}</span>}
            </div>

            <div>
                <label htmlFor="jornada">Jornada *</label>
                <select
                    id="jornada"
                    value={data.jornada}
                    onChange={(e) => setData('jornada', e.target.value)}
                    required
                >
                    <option value="manana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="unica">Única</option>
                </select>
                {errors.jornada && <span role="alert">{errors.jornada}</span>}
            </div>
        </fieldset>
    );
}

function PasoAcudiente({ data, setData, errors }) {
    return (
        <fieldset>
            <legend>Datos del acudiente / responsable</legend>

            <div>
                <label htmlFor="acudiente_nombres">Nombres *</label>
                <input
                    id="acudiente_nombres"
                    type="text"
                    value={data.acudiente_nombres}
                    onChange={(e) => setData('acudiente_nombres', e.target.value)}
                    required
                />
                {errors.acudiente_nombres && <span role="alert">{errors.acudiente_nombres}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_apellidos">Apellidos *</label>
                <input
                    id="acudiente_apellidos"
                    type="text"
                    value={data.acudiente_apellidos}
                    onChange={(e) => setData('acudiente_apellidos', e.target.value)}
                    required
                />
                {errors.acudiente_apellidos && <span role="alert">{errors.acudiente_apellidos}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_tipo_documento">Tipo de documento *</label>
                <select
                    id="acudiente_tipo_documento"
                    value={data.acudiente_tipo_documento}
                    onChange={(e) => setData('acudiente_tipo_documento', e.target.value)}
                    required
                >
                    <option value="">Selecciona…</option>
                    <option value="cc">Cédula de ciudadanía</option>
                    <option value="ce">Cédula de extranjería</option>
                    <option value="pasaporte">Pasaporte</option>
                </select>
                {errors.acudiente_tipo_documento && <span role="alert">{errors.acudiente_tipo_documento}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_numero_documento">Número de documento *</label>
                <input
                    id="acudiente_numero_documento"
                    type="text"
                    value={data.acudiente_numero_documento}
                    onChange={(e) => setData('acudiente_numero_documento', e.target.value)}
                    required
                />
                {errors.acudiente_numero_documento && <span role="alert">{errors.acudiente_numero_documento}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_parentesco">Parentesco con el estudiante *</label>
                <select
                    id="acudiente_parentesco"
                    value={data.acudiente_parentesco}
                    onChange={(e) => setData('acudiente_parentesco', e.target.value)}
                    required
                >
                    <option value="">Selecciona…</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Abuelo/a">Abuelo/a</option>
                    <option value="Tío/a">Tío/a</option>
                    <option value="Hermano/a">Hermano/a</option>
                    <option value="Otro">Otro</option>
                </select>
                {errors.acudiente_parentesco && <span role="alert">{errors.acudiente_parentesco}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_telefono">Teléfono / celular *</label>
                <input
                    id="acudiente_telefono"
                    type="tel"
                    value={data.acudiente_telefono}
                    onChange={(e) => setData('acudiente_telefono', e.target.value)}
                    required
                />
                {errors.acudiente_telefono && <span role="alert">{errors.acudiente_telefono}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_email">Correo electrónico *</label>
                <input
                    id="acudiente_email"
                    type="email"
                    value={data.acudiente_email}
                    onChange={(e) => setData('acudiente_email', e.target.value)}
                    required
                />
                {errors.acudiente_email && <span role="alert">{errors.acudiente_email}</span>}
            </div>

            <div>
                <label htmlFor="acudiente_direccion">Dirección de residencia *</label>
                <input
                    id="acudiente_direccion"
                    type="text"
                    value={data.acudiente_direccion}
                    onChange={(e) => setData('acudiente_direccion', e.target.value)}
                    required
                />
                {errors.acudiente_direccion && <span role="alert">{errors.acudiente_direccion}</span>}
            </div>
        </fieldset>
    );
}

function PasoRevision({ data }) {
    return (
        <section>
            <h3>Revisa los datos antes de enviar</h3>

            <section>
                <h4>Estudiante</h4>
                <dl>
                    <dt>Nombre completo</dt>
                    <dd>{data.estudiante_nombres} {data.estudiante_apellidos}</dd>

                    <dt>Fecha de nacimiento</dt>
                    <dd>{data.estudiante_fecha_nacimiento}</dd>

                    <dt>Género</dt>
                    <dd>{data.estudiante_genero}</dd>

                    <dt>Documento</dt>
                    <dd>{data.estudiante_tipo_documento.toUpperCase()} {data.estudiante_numero_documento}</dd>

                    <dt>Grado solicitado</dt>
                    <dd>{data.grado_solicitado}</dd>

                    <dt>Jornada</dt>
                    <dd>{data.jornada}</dd>
                </dl>
            </section>

            <section>
                <h4>Acudiente / responsable</h4>
                <dl>
                    <dt>Nombre completo</dt>
                    <dd>{data.acudiente_nombres} {data.acudiente_apellidos}</dd>

                    <dt>Documento</dt>
                    <dd>{data.acudiente_tipo_documento.toUpperCase()} {data.acudiente_numero_documento}</dd>

                    <dt>Parentesco</dt>
                    <dd>{data.acudiente_parentesco}</dd>

                    <dt>Teléfono</dt>
                    <dd>{data.acudiente_telefono}</dd>

                    <dt>Correo electrónico</dt>
                    <dd>{data.acudiente_email}</dd>

                    <dt>Dirección</dt>
                    <dd>{data.acudiente_direccion}</dd>
                </dl>
            </section>

            <p>
                Al enviar confirmas que los datos ingresados son correctos y aceptas los
                términos del proceso de admisiones del Colegio Santa Isabel de Hungría.
            </p>
        </section>
    );
}

export default function InscripcionIndex() {
    const [paso, setPaso] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        estudiante_nombres: '',
        estudiante_apellidos: '',
        estudiante_fecha_nacimiento: '',
        estudiante_genero: '',
        estudiante_tipo_documento: '',
        estudiante_numero_documento: '',
        grado_solicitado: '',
        jornada: 'manana',
        acudiente_nombres: '',
        acudiente_apellidos: '',
        acudiente_tipo_documento: '',
        acudiente_numero_documento: '',
        acudiente_parentesco: '',
        acudiente_telefono: '',
        acudiente_email: '',
        acudiente_direccion: '',
    });

    function siguiente(e) {
        e.preventDefault();
        setPaso((p) => p + 1);
    }

    function anterior(e) {
        e.preventDefault();
        setPaso((p) => p - 1);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post('/inscripcion');
    }

    return (
        <AppLayout>
            <Head title="Formulario de inscripción" />

            <section>
                <h1>Formulario de inscripción</h1>
                <p>
                    Completa los datos del estudiante y del acudiente para iniciar el proceso
                    de inscripción al Colegio Santa Isabel de Hungría.
                </p>
            </section>

            <PasoIndicador pasoActual={paso} />

            <form onSubmit={paso === 2 ? handleSubmit : siguiente} noValidate>
                {paso === 0 && <PasoEstudiante data={data} setData={setData} errors={errors} />}
                {paso === 1 && <PasoAcudiente data={data} setData={setData} errors={errors} />}
                {paso === 2 && <PasoRevision data={data} />}

                <div>
                    {paso > 0 && (
                        <button type="button" onClick={anterior}>
                            ← Anterior
                        </button>
                    )}
                    {paso < 2 && (
                        <button type="submit">
                            Siguiente →
                        </button>
                    )}
                    {paso === 2 && (
                        <button type="submit" disabled={processing}>
                            {processing ? 'Enviando…' : 'Confirmar y enviar inscripción'}
                        </button>
                    )}
                </div>
            </form>
        </AppLayout>
    );
}
