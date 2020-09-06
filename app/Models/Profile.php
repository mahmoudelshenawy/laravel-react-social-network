<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name',
        'age',
        'contact_number',
        'study',
        'graduation_year',
        'years_of_experience',
        'current_job',
        'previous_job',
        'avatar',
        'facebook',
        'twitter',
        'linkedin',
        'experience_language',
        'experience_technology',
        'portfolio',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(\App\User::class, 'user_id');
    }
}
