<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $role = auth()->user()->getRoleNames();

        if ($role[0] == 'admin') {
            $transactions = Transaction::query()->with('user')->when(request()->q, function ($rows) {
                return $rows->where('invoice', 'ilike', '%' . request()->q . '%');
            })->latest()->paginate(10);
        } else {
            $transactions = Transaction::query()->with('user')->when(request()->q, function ($rows) {
                return $rows->where('invoice', 'ilike', '%' . request()->q . '%');
            })->where('user_id', auth()->user()->id)->latest()->paginate(10);
        }

        $transactions->appends(['q' => request()->q]);
        return inertia('account/transaction/index', [
            'transactions' => fn () => $transactions
        ]);
    }

    public function show($invoice)
    {
    }
}
