<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\BackEnd\BackEndController;
use Illuminate\Http\Request;
use App\Models\Tag;
use App\Http\Requests\Tags\Store;

class Tags extends BackEndController
{
    public function index()
    {
        $rows = Tag::paginate(10);
        return view('backend.tags.index', compact('rows'));
    }

    public function create()
    {
        return view('backend.tags.create');
    }

    public function store(Store $request)
    {
        $request_data = $request->all();
        Tag::create($request_data);
        session()->flash('success', 'the Tag is added successfully');
        return redirect()->route('tags.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = Tag::findOrFail($id);
        return view('backend.tags.edit', compact('row'));
    }
    public function update(Store $request, $id)
    {
        $row = Tag::findOrFail($id);
        $row->update($request->all());
        session()->flash('success', 'the Tag is updated successfully');
        return redirect()->route('tags.index');
    }

    public function destroy($id)
    {
        $row = Tag::findOrFail($id);
        $row->delete();
        session()->flash('success', 'the Tag is deleted successfully');
        return redirect()->route('tags.index');
    }
}
