<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminUsersController extends Controller
{
    private function requireSuperenv(Request $request): void
    {
        if ($request->session()->get('colsih_admin_tipo') !== 'superenv') {
            abort(403, 'Solo el superadministrador puede gestionar usuarios.');
        }
    }

    public function index(Request $request)
    {
        $this->requireSuperenv($request);

        $usuarios = AdminUser::orderBy('nombre')->get()->map(fn($u) => [
            'id'         => $u->id,
            'nombre'     => $u->nombre,
            'usuario'    => $u->usuario,
            'email'      => $u->email,
            'contacto'   => $u->contacto,
            'foto'       => $u->foto ? Storage::url($u->foto) : null,
            'rol'        => $u->rol,
            'activo'     => $u->activo,
            'created_at' => $u->created_at?->format('d/m/Y'),
        ]);

        return Inertia::render('Admin/Dashboard', [
            'seccion'       => 'usuarios',
            'adminUsuarios' => $usuarios,
        ]);
    }

    public function store(Request $request)
    {
        $this->requireSuperenv($request);

        $data = $request->validate([
            'nombre'   => 'required|string|max:100',
            'usuario'  => 'required|string|max:50|unique:admin_users,usuario',
            'password' => 'required|string|min:8',
            'email'    => 'nullable|email|max:150',
            'contacto' => 'nullable|string|max:50',
            'foto'     => 'nullable|image|max:5120',
            'rol'      => 'required|in:admin,deportes,marketing',
            'activo'   => 'boolean',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('admin-fotos', 'public');
        }

        AdminUser::create([
            'nombre'   => $data['nombre'],
            'usuario'  => $data['usuario'],
            'clave'    => Hash::make($data['password']),
            'email'    => $data['email'] ?? null,
            'contacto' => $data['contacto'] ?? null,
            'foto'     => $fotoPath,
            'rol'      => $data['rol'],
            'activo'   => $data['activo'] ?? true,
        ]);

        return back()->with('flash', 'Usuario creado correctamente.');
    }

    public function update(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        $data = $request->validate([
            'nombre'   => 'required|string|max:100',
            'usuario'  => 'required|string|max:50|unique:admin_users,usuario,' . $adminUser->id,
            'password' => 'nullable|string|min:8',
            'email'    => 'nullable|email|max:150',
            'contacto' => 'nullable|string|max:50',
            'foto'     => 'nullable|image|max:5120',
            'rol'      => 'required|in:admin,deportes,marketing',
            'activo'   => 'boolean',
        ]);

        $updates = [
            'nombre'   => $data['nombre'],
            'usuario'  => $data['usuario'],
            'email'    => $data['email'] ?? null,
            'contacto' => $data['contacto'] ?? null,
            'rol'      => $data['rol'],
            'activo'   => $data['activo'] ?? $adminUser->activo,
        ];

        if (!empty($data['password'])) {
            $updates['clave'] = Hash::make($data['password']);
        }

        if ($request->hasFile('foto')) {
            if ($adminUser->foto) {
                Storage::disk('public')->delete($adminUser->foto);
            }
            $updates['foto'] = $request->file('foto')->store('admin-fotos', 'public');
        }

        $adminUser->update($updates);

        return back()->with('flash', 'Usuario actualizado correctamente.');
    }

    public function destroy(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        if ($adminUser->foto) {
            Storage::disk('public')->delete($adminUser->foto);
        }
        $adminUser->delete();

        return back()->with('flash', 'Usuario eliminado.');
    }

    public function toggleActivo(Request $request, AdminUser $adminUser)
    {
        $this->requireSuperenv($request);

        $adminUser->update(['activo' => !$adminUser->activo]);
        $msg = $adminUser->activo ? 'Usuario activado.' : 'Usuario desactivado.';

        return back()->with('flash', $msg);
    }
}
