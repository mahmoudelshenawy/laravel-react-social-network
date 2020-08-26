<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use App\Http\Resources\BookResource;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }
    public function index()
    {
        return '123';
        return BookResource::collection(Book::with('ratings')->paginate(25));
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'author' => 'required',
            'description' => 'required'
        ]);

        $book = new Book;
        $book->user_id = $request->user()->id;
        $book->title = $request->title;
        $book->description = $request->description;
        $book->author = $request->author;
        $book->save();

        return new BookResource($book);
    }

    public function show($id)
    {
        $book = Book::findOrFail($id);
        return new BookResource($book);
    }

    public function update(Request $request, $id)
    {
        $book = Book::findOrFail($id);
        if ($request->user()->id !== $book->user_id) {
            return response()->json(['error' => 'you can only edit your own book']);
        }

        $book->update($request->only(['title', 'author', 'description']));

        return new BookResource($book);
    }

    public function destroy(Request $request, Book $book)
    {
        if ($request->user()->id != $book->user_id) {
            return response()->json(['error' => 'you can only delete your own book']);
        }
        $book->delete();
        return response()->json(null, 204);
    }
    public function testingOnly()
    {
        return 'for testing purposes only';
    }
}
