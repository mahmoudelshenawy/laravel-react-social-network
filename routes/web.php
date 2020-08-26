<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('layout.app');
// });

// Route::namespace('BackEnd')->prefix('admin')->group(function () {
//     Route::get('/', 'Home@index')->name('home.index');
//     Route::resource('home', 'Home');
//     Route::resource('users', 'Users');
//     Route::resource('categories', 'Categories');
//     Route::resource('skills', 'Skills');
//     Route::resource('tags', 'Tags');
//     Route::resource('pages', 'Pages');
//     Route::resource('videos', 'Videos');
// });

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
Route::view('/{path?}', 'app')->where('path', '.*');
