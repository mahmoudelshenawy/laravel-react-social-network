<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::get('logout', 'AuthController@logout');
Route::get('user', 'AuthController@getAuthUser');

Route::post('posts/{post}/comment', 'BackEnd\PostsController@addComment');

Route::get('posts/{post}/comments', 'BackEnd\PostsController@getAllComments');

// 'BackEnd\PostsController@filterPostsByTags'
Route::get('posts/{post}/comments/{comment}', 'BackEnd\PostsController@getCommentById');
Route::delete('posts/{post}/comments/{comment}', 'BackEnd\PostsController@deleteComment');

Route::get('posts/{post}/like', 'BackEnd\PostsController@addLikeToPost');
Route::get('posts/{post}/dislike', 'BackEnd\PostsController@addDislikeToPost');
Route::get('posts/{post}/comments/{comment}/like', 'BackEnd\PostsController@addLikeToComment');

Route::get('posts/{post}/comments/{comment}/dislike', 'BackEnd\PostsController@addDislikeToComment');

Route::post('posts/{post}/comments/{comment}', 'BackEnd\PostsController@addReplyToComment');

Route::get('/posts/filter/{tag}', 'BackEnd\PostsController@filterPostsByTags');

Route::apiResource('books', 'BookController');

Route::apiResource('posts', 'BackEnd\PostsController');
Route::apiResource('videos', 'BackEnd\VideosController');
Route::apiResource('profiles', 'BackEnd\ProfilesController');

Route::get('profiles/{userId}/view', 'BackEnd\ProfilesController@getProfileOfUserById');

// Route::put('profiles/{userId}/view', 'BackEnd\ProfilesController@getProfileOfUserById');

Route::post('profiles/{userId}/upload_image', 'BackEnd\ProfilesController@uploadProfileImage');
