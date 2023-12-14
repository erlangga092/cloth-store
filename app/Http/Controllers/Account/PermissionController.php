<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $permissions = Permission::when(request()->q, function ($rows) {
            return $rows->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(10);

        // dd($permissions);

        $permissions->appends(['q' => request()->q]);

        return Inertia::render('account/permission/index', compact('permissions'));
    }
}
