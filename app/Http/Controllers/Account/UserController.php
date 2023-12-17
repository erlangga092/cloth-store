<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()->when(request()->q, function ($rows) {
            return $rows->where('name', 'ilike' . '%' . request()->q . '%');
        })->with('roles')->latest()->paginate(10);

        $users->appends(['q' => $users]);
        return inertia('account/user/index', compact('users'));
    }

    public function create()
    {
        $roles = Role::all();
        return inertia('account/user/create', compact('roles'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $user->assignRole($request->roles);
        return redirect()->route('account.users.index');
    }

    public function destroy($id)
    {
        $user = User::query()->findOrFail($id);
        $user->delete();
        return redirect()->route('account.users.index');
    }
}
