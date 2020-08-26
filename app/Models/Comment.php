<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'post_id', 'text', 'response_to'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function user()
    {
        return $this->belongsTo(\App\User::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function dislikes()
    {
        return $this->hasMany(DisLike::class);
    }
    public function responseTo()
    {
        return $this->belongsTo(\App\user::class, 'response_to');
    }
}
