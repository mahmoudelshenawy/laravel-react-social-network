<?php

namespace App\Http\Controllers\BackEnd;

use App\Models\Video;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Video as VideoRequest;
use App\Http\Resources\VideoResource;
use Validator;

class VideosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return VideoResource::collection(Video::latest()->paginate(25));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $video = new Video();
        $validator = $request->validate([
            'title' => 'required',
            'link' => 'required',
            'keywords' => 'required'
        ]);
        $video->title = $request->title;
        $video->user_id = auth()->user()->id;

        if (!preg_match('/^([a-zA-Z]+,?)+[a-zA-Z]+$/', $request->keywords)) {
            return response()->json(['msg' => 'only strings separated by comma allowed']);
        } elseif (!preg_match('/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/', $request->link)) {
            return response()->json(['msg' => 'only youtube links are allowed']);
        } else {
            $video->keywords = $request->keywords;
        }
        $video->desc = $request->desc;
        $video->link = $request->link;
        $video->save();

        return new VideoResource($video);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $video = Video::findOrFail($id);
        return new VideoResource($video);
    }

    public function update(Request $request, $id)
    {
        $video =  Video::find($id);
        $validator = $request->validate([
            'title' => 'required',
            'link' => 'required',
            'keywords' => 'required'
        ]);
        $video->title = $request->title;
        $video->user_id = auth()->user()->id;

        if (!preg_match('/^([a-zA-Z]+,?)+[a-zA-Z]+$/', $request->keywords)) {
            return response()->json(['msg' => 'only strings separated by comma allowed']);
        } elseif (!preg_match('/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/', $request->link)) {
            return response()->json(['msg' => 'only youtube links are allowed']);
        } else {
            $video->keywords = $request->keywords;
        }
        $video->desc = $request->desc;
        $video->link = $request->link;
        $video->update();

        return new VideoResource($video);
    }
    public function destroy($id)
    {
        $item = Video::find($id);
        $item->delete();
        return response()->json(['msg' => 'the post has been deleted']);
    }
}
