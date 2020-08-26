<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\BackEnd\BackEndController;
use App\User;
use Illuminate\Http\Request;

class Users extends BackEndController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rows = User::paginate(10);
        return view('backend.users.index', compact('rows'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'email|required',
            'password' => 'required|confirmed'
        ]);

        $request_data = $request->except(['password,password_confirmation']);

        $request_data['password'] = bcrypt($request->password);

        User::create($request_data);

        session()->flash('success', 'user has been added successfully');
        return redirect()->route('users.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $row = User::findOrFail($id);
        return view('backend.users.edit', compact('row'));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'email|required',
        ]);
        $request_data = [
            'name' => $request->name,
            'email' => $request->email
        ];
        // $request_data = $request->except(['password,password_confirmation']);

        if (request()->has('password') && request()->get('password') != '') {
            $request_data['password'] = bcrypt($request->password);
        }
        $user = User::findOrFail($id);
        $user->update($request_data);

        session()->flash('success', 'user has been updated successfully');
        return redirect()->route('users.index');
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        session()->flash('success', 'the user is deleted successfully');
        return redirect()->route('users.index');
    }
}
