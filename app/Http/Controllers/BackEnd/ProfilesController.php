<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Profile;
use App\Http\Resources\ProfileResource;
use App\Http\Controllers\BackEnd\Upload;

class ProfilesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index()
    {
        return ProfileResource::collection(Profile::latest()->paginate(25));
    }
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request_all = $request->all();
        $request_all['user_id'] = auth()->user()->id;

        $validator = Validator::make($request_all, [
            'full_name' => 'required',
            'age' => 'nullable',
            'contact_number' => 'nullable',
            'study' => 'nullable',
            'graduation_year' => 'nullable',
            'years_of_experience' => 'nullable',
            'current_job' => 'required',
            'previous_job' => 'required',
            'avatar' => 'nullable',
            'facebook' => 'nullable',
            'twitter' => 'nullable',
            'linkedin' => 'nullable',
            'experience_language' => 'nullable',
            'experience_technology' => 'nullable',
            'portfolio' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }

        // $request_all['avatar'] = Upload::upload([
        //     'file' => 'avatar',
        //     'path' => 'usersProfiles',
        //     'upload_type' => 'single',
        //     'delete_file' => ''
        // ]);

        $profile = Profile::create($request_all);
        return new ProfileResource($profile);
    }

    public function uploadProfileImage($id, Request $request)
    {
        $profile = $request->file('avatar');

        return $profile;
    }
    public function show($id)
    {
        $profile = Profile::find($id);
        return response()->json(['data' => $profile], 200);
    }

    public function getProfileOfUserById($id)
    {
        $profile = Profile::where('user_id', $id)->first();
        return response()->json(['data' => $profile], 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $request_all = $request->all();
        $request_all['user_id'] = auth()->user()->id;

        $validator = Validator::make($request_all, [
            'full_name' => 'required',
            'age' => 'nullable',
            'contact_number' => 'nullable',
            'study' => 'nullable',
            'graduation_year' => 'nullable',
            'years_of_experience' => 'nullable',
            'current_job' => 'required',
            'previous_job' => 'required',
            'avatar' => 'nullable',
            'facebook' => 'nullable',
            'twitter' => 'nullable',
            'linkedin' => 'nullable',
            'experience_language' => 'nullable',
            'experience_technology' => 'nullable',
            'portfolio' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }

        // $request_all['avatar'] = Upload::upload([
        //     'file' => 'avatar',
        //     'path' => 'usersProfiles',
        //     'upload_type' => 'single',
        //     'delete_file' => ''
        // ]);

        $profile = Profile::where('id', $id)->update($request_all);
        return new ProfileResource($profile);
    }

    public function destroy($id)
    {
        //
    }
}
