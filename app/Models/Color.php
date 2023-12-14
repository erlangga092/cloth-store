<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'image'];

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/colors/' . $value)
        );
    }
}
