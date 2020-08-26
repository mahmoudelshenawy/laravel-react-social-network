<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\BackEnd\BackEndController;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\Category\Store;

class Categories extends BackEndController
{
    public function index()
    {
        $rows = Category::paginate(10);
        return view('backend.categories.index', compact('rows'));
    }

    public function create()
    {
        return view('backend.categories.create');
    }

    public function store(Store $request)
    {
        $request_data = $request->all();
        Category::create($request_data);
        session()->flash('success', 'the category is added successfully');
        return redirect()->route('categories.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = Category::findOrFail($id);
        return view('backend.categories.edit', compact('row'));
    }
    public function update(Store $request, $id)
    {
        $row = Category::findOrFail($id);
        $row->update($request->all());
        session()->flash('success', 'the category is updated successfully');
        return redirect()->route('categories.index');
    }

    public function destroy($id)
    {
        $row = Category::findOrFail($id);
        $row->delete();
        session()->flash('success', 'the category is deleted successfully');
        return redirect()->route('categories.index');
    }
}
