<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::query()->when(request()->q, function ($rows) {
            return $rows->where('name', 'ilike', '%' . request()->q . '%');
        })->latest()->paginate(10);

        $colors->appends(['q' => request()->q]);
        return inertia('account/color/index', compact('colors'));
    }

    public function create()
    {
        return inertia('account/color/create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required|mimes:png,jpg'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/colors', $image->hashName());
        Color::create([
            'name' => $request->name,
            'image' => $image->hashName()
        ]);

        return redirect()->route('account.colors.index');
    }

    public function destroy($id)
    {
        $color = Color::query()->findOrFail($id);
        Storage::disk('local')->delete('public/colors/' . basename($color->image));
        $color->delete();
        return redirect()->route('account.colors.index');
    }
}
