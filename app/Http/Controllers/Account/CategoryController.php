<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::query()->when(request()->q, function ($rows) {
            return $rows->where('name', 'ilike', '%' . request()->q . '%');
        })->latest()->paginate(10);

        $categories->appends(['q' => request()->q]);
        return inertia('account/category/index', compact('categories'));
    }

    public function create()
    {
        return inertia('account/category/create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:categories',
            'image' => 'required|mimes:png,jpg,jpeg|max:2000'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/categories', $image->hashName());

        Category::create([
            'name' => $request->name,
            'image' => $image->hashName(),
            'slug' => Str::slug($request->name, '-')
        ]);

        return redirect()->route('account.categories.index');
    }

    public function destroy($id)
    {
        $category = category::query()->findOrFail($id);
        Storage::disk('local')->delete('public/categories/' . basename($category->image));
        $category->delete();
        return redirect()->route('account.categories.index');
    }
}
