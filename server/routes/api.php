<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'App\Http\Controllers\Api\UserController@register');
Route::post('login', 'App\Http\Controllers\Api\UserController@login');

Route::post('news/create', 'App\Http\Controllers\Api\NewsController@create');
Route::post('news/update/{id}', 'App\Http\Controllers\Api\NewsController@update');
Route::post('news/delete/{id}', 'App\Http\Controllers\Api\NewsController@delete');
Route::get('news/get', 'App\Http\Controllers\Api\NewsController@getAll');
Route::get('news/get-from-user', 'App\Http\Controllers\Api\NewsController@getAllFromUser');
Route::get('news/get/{id}', 'App\Http\Controllers\Api\NewsController@getOne');
