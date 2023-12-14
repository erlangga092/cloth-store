<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $unpaid = Transaction::query()->where('status', 'UNPAID')->count();
        $paid = Transaction::query()->where('status', 'PAID')->count();
        $expired = Transaction::query()->where('status', 'EXPIRED')->count();
        $cancelled = Transaction::query()->where('status', 'CANCELLED')->count();

        $year = date('Y');

        $transaction = DB::table('transactions')
            ->addSelect(DB::raw('SUM(grand_total) as grand_total'))
            ->addSelect(DB::raw('EXTRACT(MONTH FROM created_at) as month'))
            ->addSelect(DB::raw('TO_CHAR(created_at, \'Month\') as month_name'))
            ->whereYear('created_at', '=', $year)
            ->where('status', 'PAID')
            ->groupBy(
                'month',
                'month_name',
            )
            ->orderByRaw('month ASC')
            ->get();

        $month_name = [];
        $grand_total = [];

        if (count($transaction)) {
            foreach ($transaction as $result) {
                array_push($month_name, $result->month_name);
                array_push($grand_total, (int) $result->grand_total);
            }
        }

        return Inertia::render('account/dashboard/index', [
            'count' => [
                'unpaid' => $unpaid,
                'paid' => $paid,
                'expired' => $expired,
                'cancelled' => $cancelled
            ],
            'chart' => [
                'month_name' => $month_name,
                'grand_total' => $grand_total
            ]
        ]);
    }
}
