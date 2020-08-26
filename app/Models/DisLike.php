<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisLike extends Model
{
    protected $fillable = ['user_id', 'post_id', 'comment_id'];
}
