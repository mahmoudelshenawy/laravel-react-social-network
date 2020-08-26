<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Rating;

class RatingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function index()
    {
        //
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required',
            'book_id' => 'required',
            'rating' => 'required'
        ]);

        $rating = new Rating;
        $rating->user_id = $request->user_id;
        $rating->book_id = $request->book_id;
        $rating->rating = $request->rating;
        $rating->save();

        return response()->json(['data' => $rating]);
    }

    public function show($id)
    {
        //
    }
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
