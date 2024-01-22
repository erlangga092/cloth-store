<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->when(request()->q, function ($rows) {
            return $rows->where('name', 'ilike', '%' . request()->q . '%');
        })->with('category')->latest()->paginate(10);

        $products->appends(['q' => request()->q]);
        return inertia('account/product/index', compact('products'));
    }

    public function create()
    {
        $categories = Category::all();
        return inertia('account/product/create', compact('categories'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required',
            'weight' => 'required',
            'product_sizes' => 'required|array|min:2'
        ]);

        $product = Product::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title, '-'),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'weight' => $request->weight
        ]);

        if ($request->product_sizes > 0) {
            foreach ($request->product_sizes as $size) {
                $product->productSizes()->create([
                    'size' => $size['size'],
                    'price' => (int) $size['price']
                ]);
            }
        }

        return redirect()->route('account.products.index');
    }

    public function edit($id)
    {
        try {
            $categories = Category::all();
            $product = Product::query()->with('productSizes')->findOrFail($id);

            return inertia('account/product/edit', compact('categories', 'product'));
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }

    public function update(Request $request, Product $product)
    {
        $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required',
            'description' => 'required',
            'weight' => 'required',
            'product_sizes' => 'require|array|min:2'
        ]);

        $product->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title, '-'),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'weight' => $request->weight
        ]);

        if ($request->product_sizes > 0) {
            $id = Arr::pluck($request->product_sizes, 'id');
            $product->productSizes()->whereNotIn('id', $id)->delete();

            foreach ($request->product_sizes as $data) {
                $size = $product->productSizes()
                    ->where('product_id', $product->id)
                    ->where('size', $data['size'])->first();

                if ($size) {
                    $size->update([
                        'size' => $data['size'],
                        'price' => (int) $data['price']
                    ]);
                } else {
                    $product->productSizes()->create([
                        'size' => $data['size'],
                        'price' => (int) $data['price']
                    ]);
                }
            }
        }

        return redirect()->route('account.products.index');
    }

    public function show($id)
    {
        $product = Product::query()->findOrFail($id);
        $product->setRelation(
            'product_images',
            $product->productImages()
                ->with('color')
                ->paginate(5)
        );
        $colors = Color::all();

        return inertia('account/product/show', compact('product', 'colors'));
    }

    public function destroy($id)
    {
        try {
            $product = Product::query()->findOrFail($id);
            $product->delete();
            return redirect()->route('account.products.index');
        } catch (\Throwable $th) {
            return back()->withErrors($th->getMessage());
        }
    }

    public function storeImageProduct(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|mimes:png,jpg',
            'color_id' => 'required|exists:colors,id',
            'product_id' => 'required|exists:products,id'
        ]);

        try {
            $product = Product::query()->findOrFail($request->product_id);
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());
            $product->productImages()->create([
                'image' => $image->hashName(),
                'color_id' => $request->color_id
            ]);

            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th->getMessage());
        }
    }

    public function destroyImage($id)
    {
        $product_image = ProductImage::query()->findOrFail($id);
        Storage::disk('local')->delete('public/products/' . basename($product_image->image));
        $product_image->delete();
        return redirect()->back();
    }
}
