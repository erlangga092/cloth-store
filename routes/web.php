<?php

use App\Http\Controllers\Account\CategoryController;
use App\Http\Controllers\Account\ColorController;
use App\Http\Controllers\Account\DashboardController;
use App\Http\Controllers\Account\PermissionController;
use App\Http\Controllers\Account\ProductController;
use App\Http\Controllers\Account\RoleController;
use App\Http\Controllers\Account\SliderController;
use App\Http\Controllers\Account\TransactionController;
use App\Http\Controllers\Account\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Web\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/register', [RegisterController::class, 'index'])
    ->name('register')
    ->middleware('guest');

Route::post('/register', [RegisterController::class, 'store'])
    ->name('register.store')
    ->middleware('guest');

Route::get('/login', [LoginController::class, 'index'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [LoginController::class, 'store'])
    ->name('login.store')
    ->middleware('guest');

Route::post('/logout', LogoutController::class)
    ->name('logout')
    ->middleware('auth');

Route::get('/', HomeController::class)->name('web.home.index');

Route::prefix('account')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        // dashboard
        Route::get('/dashboard', DashboardController::class)->name('account.dashboard');

        // permissions
        Route::get('/permissions', PermissionController::class)->name('account.permissions.index');

        // roles
        Route::resource('/roles', RoleController::class, ['as' => 'account'])
            ->middleware('permission:roles.index|roles.create|roles.edit|roles.delete');

        // users
        Route::resource('/users', UserController::class, ['as' => 'account'])
            ->middleware('permission:users.index|users.create|users.edit|users.delete');

        // colors
        Route::resource('/colors', ColorController::class, ['as' => 'account'])
            ->middleware('permission:colors.index|colors.create|colors.edit|colors.delete');

        // categories
        Route::resource('/categories', CategoryController::class, ['as' => 'account'])
            ->middleware('permission:categories.index|categories.create|categories.edit|categories.delete');

        // products
        Route::post('/products/store_image_product', [\App\Http\Controllers\Account\ProductController::class, 'storeImageProduct'])
            ->name('account.products.store_image_product');

        Route::delete('/products/destroy_image_product', [ProductController::class, 'destroyImageProduct'])
            ->name('account.products.destroy_image_product');

        Route::resource('/products', ProductController::class, ['as' => 'account'])
            ->middleware('permission:products.index|products.create|products.edit|products.delete');

        // sliders
        Route::resource('/sliders', SliderController::class, ['as' => 'account'])
            ->middleware('permission:sliders.index|sliders.create|sliders.edit|sliders.delete');

        // transactions
        Route::get('transactions', [TransactionController::class, 'index'])->name('account.transactions.index')->middleware('permission:transactions.index');

        // transaction show
        Route::get('transactions/{invoice}', [TransactionController::class, 'show'])->name('account.transactions.show');
    });
});

Route::get('/categories', [\App\Http\Controllers\Web\CategoryController::class, 'index'])
    ->name('web.categories.index');

Route::get('/categories/{slug}', [\App\Http\Controllers\Web\CategoryController::class, 'show'])
    ->name('web.categories.show');

Route::get('/products', [\App\Http\Controllers\Web\ProductController::class, 'index'])
    ->name('web.products.index');

Route::get('/products/{slug}', [\App\Http\Controllers\Web\ProductController::class, 'show'])
    ->name('web.products.show');

Route::get('/carts', [\App\Http\Controllers\Web\CartController::class, 'index'])
    ->name('web.carts.index')
    ->middleware('auth');

Route::post('/carts', [\App\Http\Controllers\Web\CartController::class, 'store'])
    ->name('web.carts.store')
    ->middleware('auth');

Route::delete('/carts/{id}', [\App\Http\Controllers\Web\CartController::class, 'destroy'])
    ->name('web.carts.destroy')
    ->middleware('auth');
