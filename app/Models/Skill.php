<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = [];


    public function videos()
    {
        return $this->belongsToMany(Video::class, 'skills_videos');
    }
}
// , 'skill_id', 'video_id'
