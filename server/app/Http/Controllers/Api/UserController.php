<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name'      => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:5',
            'c_password'  => 'required|same:password',
        ]);
        if($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $validator->errors()
            ], 400);
        }
        $token = Str::random(60);
        $data['password'] = bcrypt($data['password']);
        $user = new User($data);
        $user->remember_token = $token;
        $user->save();
        return response()->json([
            'message' => 'Created',
            'id'      => $user->id,
            'name'    => $user->name,
            'token'   => $token,
        ], 201);
    }

    public function login(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email'     => 'required|email',
            'password'  => 'required|min:5',
        ]);
        if($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors'  => $validator->errors()
            ], 400);
        }
        $user = User::where('email', $data['email'])->first();
        if(!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        if(!Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect'
            ], 401);
        }
        $token = Str::random(60);
        $user->remember_token = $token;
        $user->save();
        return response()->json([
            'message' => 'Authorized',
            'id'      => $user->id,
            'name'    => $user->name,
            'token'   => $token,
        ], 200);
    }

    public function checkToken($token) {
        $user = User::where('remember_token', $token)->first();
        if(!$user) {
            return false;
        }
        return $user;
    }
}
