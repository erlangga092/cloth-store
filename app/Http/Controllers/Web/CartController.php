<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::query()->with('product')
            ->where('user_id', auth()->user()->id)
            ->latest()
            ->get();

        return inertia('web/carts/index', compact('carts'));
    }

    public function store(Request $request)
    {
        $cart = Cart::query()->where('product_id', $request->product_id)
            ->where('size', $request->size)
            ->where('color', $request->color);

        if ($cart->count()) {
            $cart->increment('qty');
            $cart = $cart->first();
            $price = $request->price * $cart->qty;
            $weight = $request->weight * $cart->qty;
            $cart->update([
                'price' => $price,
                'weight' => $weight
            ]);
        } else {
            Cart::query()->insert([
                'user_id' => auth()->user()->id,
                'product_id' => $request->product_id,
                'product_image' => $request->product_image,
                'color' => $request->color,
                'color_image' => $request->color_image,
                'size' => $request->size,
                'price' => (int) $request->price,
                'qty' => $request->qty,
                'weight' => $request->weight
            ]);
        }

        return redirect()->back();
    }

    public function destroy($id)
    {
        $cart = Cart::query()->with('product')
            ->where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->first();

        if ($cart) {
            $cart->delete();
        }

        return redirect()->back();
    }
}
