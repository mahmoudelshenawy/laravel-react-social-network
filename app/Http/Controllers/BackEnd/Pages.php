<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\BackEnd\BackEndController;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Http\Requests\Pages\Store;

class Pages extends BackEndController
{
    public function index()
    {
        $rows = Page::paginate(10);
        return view('backend.pages.index', compact('rows'));
    }

    public function create()
    {
        return view('backend.pages.create');
    }

    public function store(Store $request)
    {
        $request_data = $request->all();
        Page::create($request_data);
        session()->flash('success', 'the Page is added successfully');
        return redirect()->route('pages.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = Page::findOrFail($id);
        return view('backend.pages.edit', compact('row'));
    }
    public function update(Store $request, $id)
    {
        $row = Page::findOrFail($id);
        $row->update($request->all());
        session()->flash('success', 'the Page is updated successfully');
        return redirect()->route('pages.index');
    }

    public function destroy($id)
    {
        $row = Page::findOrFail($id);
        $row->delete();
        session()->flash('success', 'the Page is deleted successfully');
        return redirect()->route('pages.index');
    }
}
