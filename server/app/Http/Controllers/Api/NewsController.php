<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\UserController;
use Validator;
use App\Models\News;
use App\Models\User;

class NewsController extends Controller
{
    public function create(Request $request) {
        $data = $request->all();
        $userController = new UserController();
        $user = $userController->checkToken($request->bearerToken());
        if(!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $validator = Validator::make($data, [
            'title'     => 'required|',
            'text'  => 'required',
        ]);
        if($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $validator->errors()
            ], 400);
        }
        $data['author'] = $user->id;
        $news = new News($data);
        $news->save();
        return response()->json([
            'message' => 'Created',
            'id'      => $news->id
        ], 201);
    }

    public function getAll(Request $request) {
        $news = News::orderBy('updated_at', 'DESC')->get();
        if(!$news) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
        foreach($news as $new) {
            $user = User::where('id', $new->author)->first();
            $new->author = $user->name;
        }
        return response()->json([
            'message' => 'OK',
            'data'    => $news,
        ], 200); 
    }

    public function getOne(Request $request) {
        $id = $request->route('id');
        $news = News::where('id', $id)->first();
        if(!$news) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
        $user = User::where('id', $news->author)->first();
        $news->author = $user->name;
        return response()->json([
            'message' => 'OK',
            'data'    => $news,
        ], 200);
    }

    public function getAllFromUser(Request $request) {
        $userController = new UserController();
        $user = $userController->checkToken($request->bearerToken());
        if(!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $news = News::where('author', $user->id)->orderBy('updated_at', 'DESC')->get();
        if(!$news) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
        foreach($news as $new) {
            $user = User::where('id', $new->author)->first();
            $new->author = $user->name;
        }
        return response()->json([
            'message' => 'OK',
            'data'    => $news,
        ], 200);
    }

    public function update(Request $request) {
        $userController = new UserController();
        $user = $userController->checkToken($request->bearerToken());
        if(!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $id = $request->route('id');
        $data = $request->all();
        $news = News::where('id', $id)->first();
        if(!$news) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
        if($news->author != $user->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }
        if($data['title']) {
            $news->title = $data['title'];
        }
        if($data['text']) {
            $news->text  = $data['text'];
        }
        $news->save();
        return response()->json([
            'message' => 'OK',
        ], 200);
    }

    public function delete(Request $request) {
        $userController = new UserController();
        $user = $userController->checkToken($request->bearerToken());
        if(!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $id = $request->route('id');
        $news = News::where('id', $id)->first();
        if(!$news) {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
        if($news->author != $user->id) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }
        $news->delete();
        return response()->json([
            'message' => 'OK',
        ], 200);
    }
}
