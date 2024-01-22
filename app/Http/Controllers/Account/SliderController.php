<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::query()->latest()->paginate(5);
        return inertia('account/slider/index', compact('sliders'));
    }

    public function create()
    {
        return inertia('account/slider/create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'link' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg'
        ]);

        $image = $request->file('image');
        $image->storeAs('public/sliders', $image->hashName());

        Slider::query()->create([
            'link' => $request->link,
            'image' => $image->hashName()
        ]);

        return redirect()->route(('account.sliders.index'));
    }

    public function destroy($id)
    {
        $slider = Slider::query()->findOrFail($id);
        Storage::disk('local')->delete('public/sliders/' . basename($slider->image));
        $slider->delete();
        return redirect()->route('account.sliders.index');
    }
}
