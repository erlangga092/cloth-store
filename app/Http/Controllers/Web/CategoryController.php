<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()->latest()->paginate(2);
        return inertia('web/category/index', compact('categories'));
    }

    public function show(string $slug)
    {
        $category = Category::query()->where('slug', $slug)
            ->with('products.productImages.color', 'products.productSizes')
            ->firstOrFail();

        return inertia('web/category/show', compact('category'));
    }
}
