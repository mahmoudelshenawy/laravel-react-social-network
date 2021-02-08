<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\User;
use App\Models\Like;
use App\Models\DisLike;
use App\Models\Tag;
use App\Http\Resources\PostResource;
use App\Http\Resources\CommentResource;

class PostsController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api')->except(['index', 'show', 'getAllComments']);
    // }
    public function index()
    {

        return PostResource::collection(Post::with('comments', 'likes', 'dislikes', 'tags')->latest()->paginate(25));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'text' => 'required',
        ]);

        $tags = $request->tags;
        $tags_array = explode(',', $tags);
        $post = new Post;
        $post->user_id = auth()->user()->id;
        $post->text = $request->text;
        $post->save();
        foreach ($tags_array as $index => $tag) {
            $post->tags()->saveMany([
                new Tag(['name' => $tag], ['post_id' => $post->id]),
            ]);
        }

        return new PostResource($post);
    }
    public function show($id)
    {
        $post = Post::findOrFail($id);
        // $re = $post->with('comments');
        return new PostResource(Post::findOrFail($id));
        // return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        //
    }
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        if (!$post) {
            return response()->json(['msg' => 'post not found']);
        }
        $post->delete();
        return response()->json(['msg' => 'the post has been deleted successfully']);
    }
    public function addComment(Request $request, $id)
    {
        $comment = new Comment;
        $comment->user_id = auth()->user()->id;
        $comment->text = $request->text;
        $comment->post_id = $id;
        $comment->save();
        // $post->comment = $comment;

        return new CommentResource($comment);
    }
    public function getAllComments($id)
    {
        $comment = Comment::where('post_id', $id)->with('user')->with('post')->latest()->get();

        return $comment;
        // return new CommentResource($comment);
        // return CommentResource::collection(
        //     Comment::where('post_id', $id)->with('user')->with('post')->first()
        // );
    }
    public function getCommentById($postId, $commentId)
    {
        $post = Post::findOrFail($postId)->with('comments')->first();

        $comment = $post->comments()->where('id', $commentId)->first();
        if (!$comment) {
            return response()->json(['msg' => 'comment is not found']);
        }
        $user = User::findOrFail($comment->user_id);
        // $comment->user = $user;

        return new CommentResource($comment);
    }
    public function deleteComment($postId, $commentId)
    {
        $post = Post::findOrFail($postId)->first();

        $comment = $post->comments()->where('id', $commentId)->first();
        if (!$comment) {
            return response()->json(['msg' => 'comment is not found']);
        }
        $comment->delete();
        return response()->json(['msg' => 'deleted successfully']);
    }

    public function addLikeToPost($id)
    {
        $like = new Like;

        $likes = Post::findOrFail($id)->likes()->get();
        $dislikes = Post::findOrFail($id)->dislikes()->get();

        $like->user_id = auth()->user()->id;
        $like->post_id = $id;
        $liked_before = $likes->where('user_id', '=', $like->user_id)->first();
        $disliked_before = $dislikes->where('user_id', '=', $like->user_id)->first();
        // count($disliked_before) > 0
        if (isset($disliked_before)) {
            $disliked_before->delete();
        }
        // count($liked_before) == 0
        if (!isset($liked_before)) {
            $like->save();
            return $like;
        } else {
            $like = $liked_before;
            $like->delete();
            return "like was remove";
        }
        // return $liked_before;
    }
    public function addDislikeToPost($id)
    {
        $dislike = new DisLike;

        $dislikes = Post::findOrFail($id)->dislikes()->get();
        $likes = Post::findOrFail($id)->likes()->get();

        $dislike->user_id = auth()->user()->id;
        $dislike->post_id = $id;
        $disliked_before = $dislikes->where('user_id', '=', $dislike->user_id)->first();
        $liked_before = $likes->where('user_id', '=', $dislike->user_id)->first();
        // return $liked_before;
        if (isset($liked_before)) {
            $liked_before->delete();
        }
        if (!isset($disliked_before)) {
            $dislike->save();
            return $dislike;
        } else {
            // $dislike = $disliked_before;
            $disliked_before->delete();
            return "dislike was remove";
        }
        // return $liked_before;
    }

    public function addLikeToComment($postId, $commentId)
    {
        $like = new Like;
        $comments = Post::findOrFail($postId)->comments()->get();

        $likes = $comments->where('id', $commentId);
        $likes_array = $likes[0]->likes()->get();
        $dislikes_array = $likes[0]->dislikes()->get();

        $like->user_id = auth()->user()->id;
        $like->comment_id = $commentId;
        $like->post_id = $postId;
        $liked_comment_before = $likes_array->where('user_id', '=', $like->user_id);
        $disliked_before =  $dislikes_array->where('user_id', $like->user_id);
        if (count($disliked_before) > 0) {
            $disliked_before[0]->delete();
        }
        if (count($liked_comment_before) > 0) {
            $liked_comment_before[0]->delete();
        }
        if (count($likes_array) == 0) {
            $like->save();
            return $like;
        } else {
            $like->delete();
            return "deleted like";
        }
    }
    public function addDislikeToComment($postId, $commentId)
    {
        $dislike = new DisLike;
        $comments = Post::findOrFail($postId)->comments()->get();

        $dislikes = $comments->where('id', $commentId);
        $dislikes_array = $dislikes[0]->dislikes()->get();
        $likes_array = $dislikes[0]->likes()->get();
        $dislike->user_id = auth()->user()->id;
        $dislike->comment_id = $commentId;
        $dislike->post_id = $postId;
        $disliked_comment_before = $dislikes_array->where('user_id', '=', $dislike->user_id);
        $liked_before = $likes_array->where('user_id', $dislike->user_id);
        if (count($liked_before) > 0) {
            $liked_before[0]->delete();
        }
        if (count($disliked_comment_before) > 0) {
            $disliked_comment_before[0]->delete();
        }
        if (count($dislikes_array) == 0) {
            $dislike->save();
            return $dislike;
        } else {
            $dislike->delete();
            return "removed dislike";
        }
    }

    public function addReplyToComment($postId, $commentId, Request $request)
    {
        $comment = new Comment;
        $comments = Post::findOrFail($postId)->comments()->get();

        $the_comment = $comments->where('id', $commentId)->first();

        $comment->user_id = auth()->user()->id;
        $comment->text = $request->text;
        $comment->post_id = $postId;
        $comment->response_to = $the_comment->user_id;
        $comment->save();

        return new CommentResource($comment);
    }

    public function filterPostsByTags($tag)
    {
        $tags = Tag::where('name', '=', $tag)->get();
        $posts_ids = [];
        // return $tags;
        for ($i = 0; $i < count($tags); $i++) {
            array_push($posts_ids, $tags[$i]['post_id']);
        }
        // return $posts_ids;
        $posts = Post::findOrfail($posts_ids);

        $finalResponse = [];
        for ($i = 0; $i < count($posts); $i++) {
            array_push($finalResponse, new PostResource($posts[$i]));
        }
        return $finalResponse;
    }
}
