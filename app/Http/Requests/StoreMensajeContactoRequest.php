<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMensajeContactoRequest extends FormRequest
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
            'nombre'   => ['required', 'string', 'max:150'],
            'email'    => ['required', 'email', 'max:150'],
            'telefono' => ['nullable', 'string', 'max:20'],
            'asunto'   => ['required', 'string', 'max:200'],
            'mensaje'  => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            '*.required' => 'Este campo es obligatorio.',
            '*.email'    => 'Ingresa un correo electrónico válido.',
            '*.min'      => 'El mensaje debe tener al menos 10 caracteres.',
            '*.max'      => 'El texto es demasiado largo.',
        ];
    }
}
