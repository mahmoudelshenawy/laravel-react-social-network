<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'text' => $this->text,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'user' => $this->user,
            'comments' => CommentResource::collection($this->comments),
            'tags' => $this->tags,
            'comments' => $this->comments,
            'likes' => $this->likes,
            'dislikes' => $this->dislikes
        ];
    }
}
