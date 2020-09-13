<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'age' => $this->age,
            'contact_number' => $this->contact_number,
            'study' => $this->study,
            'graduation_year' => $this->graduation_year,
            'years_of_experience' => $this->years_of_experience,
            'current_job' => $this->current_job,
            'previous_job' => $this->previous_job,
            'avatar' => $this->avatar,
            'facebook' => $this->facebook,
            'twitter' => $this->twitter,
            'linkedin' => $this->linkedin,
            'experience_language' => $this->experience_language,
            'experience_technology' => $this->experience_technology,
            'portfolio' => $this->portfolio,
            'user' => $this->user
        ];
    }
}
