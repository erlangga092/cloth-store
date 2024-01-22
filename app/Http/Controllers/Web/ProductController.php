<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->with('productImages.color', 'productSizes')->latest()->paginate(8);

        return inertia('web/product/index', compact('products'));
    }

    public function show($slug)
    {
        $product = Product::query()->where('slug', $slug)->with('productImages.color', 'productSizes')->firstOrFail();

        return inertia('web/product/index', compact('product'));
    }
}
