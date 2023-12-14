<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'product_image',
        'color',
        'color_image',
        'size',
        'price',
        'qty',
        'weight',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected function productImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/products/' . $value)
        );
    }

    protected function colorImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/colors/' . $value)
        );
    }
}
