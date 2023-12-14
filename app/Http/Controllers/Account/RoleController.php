<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::query()->when(request()->q, function ($rows) {
            return $rows->where('name', 'like', '%' . request()->q . '%');
        })->with('permissions')->latest()->paginate(10);

        $roles->appends(['q' => request()->q]);

        return Inertia::render('account/role/index', compact('roles'));
    }

    public function create()
    {
        $permissions = Permission::all();
        return Inertia::render('account/role/create', compact('permissions'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'permissions' => 'required'
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->givePermissionTo($request->permissions);
        return redirect()->route('account.roles.index');
    }

    public function edit($id)
    {
        $role = Role::query()->with('permissions')->findOrFail($id);
        $permissions = Permission::all();

        return Inertia::render('account/role/edit', compact('role', 'permissions'));
    }

    public function update(Request $request, Role $role)
    {
        $this->validate($request, [
            'name' => 'required',
            'permissions' => 'required'
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);
        return redirect()->route('account.roles.index');
    }

    public function destroy($id)
    {
        $role = Role::query()->findOrFail($id);
        $role->delete();
        return redirect()->route('account.roles.index');
    }
}
