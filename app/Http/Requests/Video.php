<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Video extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'keywords' => 'required|regex:/^([a-zA-Z]+,?)+[a-zA-Z]+$/u',
            'desc' => 'required',
            'link' => 'url',

        ];
    }

    public function messages()
    {
        return [
            'keywords.regex' => 'only strings allowed separated by comma',
            'link.link' => 'only youtube liks allowed'
        ];
    }
}
