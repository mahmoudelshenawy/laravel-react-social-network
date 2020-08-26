<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\BackEnd\BackEndController;
use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\Category;
use App\Http\Requests\Videos\Store;
use App\Models\Skill;
use App\Models\Tag;

class Videos extends BackEndController
{
    public function index()
    {

        $rows = Video::with('user', 'cat')->paginate(10);
        return view('backend.videos.index', compact('rows'));
    }

    public function create()
    {
        $categories = Category::all(['name', 'id']);
        $skills = Skill::all(['id', 'name']);
        $tags = Tag::all(['id', 'name']);
        return view('backend.videos.create', compact('categories', 'skills', 'tags'));
    }

    public function store(Request $request)
    {

        $row = new Video();
        $request_data = $request->all();
        if (!auth()->user()) {
            return redirect('/login');
        }

        $request_data['user_id'] = auth()->user()->id;
        $row->create($request_data);

        if (isset($request_data['skills']) && !empty($request_data['skills'])) {
            dd($request_data);
            $row->tags()->sync($request_data['skills']);
        }
        if (isset($request_data['tags'])) {
            $row->tags()->sync($request_data['tags']);
        }
        session()->flash('success', 'the Video is added successfully');
        return redirect()->route('videos.create');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = Video::findOrFail($id);
        $categories = Category::all(['name', 'id']);
        dump($row);
        return view('backend.videos.edit', compact('row', 'categories'));
    }
    public function update(Store $request, $id)
    {
        $row = Video::findOrFail($id);

        $row->update($request->all());
        session()->flash('success', 'the Video is updated successfully');
        return redirect()->route('videos.index');
    }

    public function destroy($id)
    {
        $row = Video::findOrFail($id);
        $row->delete();
        session()->flash('success', 'the Video is deleted successfully');
        return redirect()->route('videos.index');
    }
}
