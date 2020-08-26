<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Requests\Skills\Store;

class Skills extends Controller
{

    public function index()
    {
        $rows = Skill::paginate(10);
        return view('backend.skills.index', compact('rows'));
    }

    public function create()
    {
        return view('backend.skills.create');
    }

    public function store(Store $request)
    {
        $request_data = $request->all();
        Skill::create($request_data);
        session()->flash('success', 'the Skill is added successfully');
        return redirect()->route('skills.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = Skill::findOrFail($id);
        return view('backend.skills.edit', compact('row'));
    }
    public function update(Store $request, $id)
    {
        $row = Skill::findOrFail($id);
        $row->update($request->all());
        session()->flash('success', 'the Skill is updated successfully');
        return redirect()->route('skills.index');
    }

    public function destroy($id)
    {
        $row = Skill::findOrFail($id);
        $row->delete();
        session()->flash('success', 'the Skill is deleted successfully');
        return redirect()->route('skills.index');
    }
}
