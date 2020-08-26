<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'text'];

    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function dislikes()
    {
        return $this->hasMany(DisLike::class);
    }

    public function tags(){
        return $this->hasMany(Tag::class);
    }

    public function delete() {
        $this->comments()->delete();
        $this->likes()->delete();
        $this->dislikes()->delete();
        $this->tags()->delete();
        parent::delete();
    }
}
