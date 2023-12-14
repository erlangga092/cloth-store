<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $sliders = Slider::query()->latest()->get();
        $categories = Category::query()->latest()->take(4)->get();
        $products = Product::query()->with('productImages.color', 'productSizes')
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('web/home/index', compact('sliders', 'categories', 'products'));
    }
}
