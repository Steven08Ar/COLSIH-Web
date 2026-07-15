<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInscripcionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Estudiante
            'estudiante_nombres'           => ['required', 'string', 'max:100'],
            'estudiante_apellidos'         => ['required', 'string', 'max:100'],
            'estudiante_fecha_nacimiento'  => ['required', 'date', 'before:today'],
            'estudiante_genero'            => ['required', 'in:masculino,femenino,otro'],
            'estudiante_tipo_documento'    => ['required', 'in:ti,rc,pasaporte'],
            'estudiante_numero_documento'  => ['required', 'string', 'max:20'],
            'grado_solicitado'             => ['required', 'string', 'max:50'],
            'jornada'                      => ['required', 'in:manana,tarde,unica'],

            // Acudiente
            'acudiente_nombres'            => ['required', 'string', 'max:100'],
            'acudiente_apellidos'          => ['required', 'string', 'max:100'],
            'acudiente_tipo_documento'     => ['required', 'in:cc,ce,pasaporte'],
            'acudiente_numero_documento'   => ['required', 'string', 'max:20'],
            'acudiente_parentesco'         => ['required', 'string', 'max:50'],
            'acudiente_telefono'           => ['required', 'string', 'max:20'],
            'acudiente_email'              => ['required', 'email', 'max:150'],
            'acudiente_direccion'          => ['required', 'string', 'max:200'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.required' => 'Este campo es obligatorio.',
            '*.email'    => 'Ingresa un correo electrónico válido.',
            '*.before'   => 'La fecha debe ser anterior a hoy.',
            '*.in'       => 'Selecciona una opción válida.',
            '*.max'      => 'El texto es demasiado largo.',
        ];
    }
}
