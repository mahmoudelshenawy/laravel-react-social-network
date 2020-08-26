<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login']]);
    // }

    public $loginAfterSignUp = true;

    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {

        $credentials = $request->only(['email', 'password']);
        $token = auth()->attempt($credentials);
        if (!$token) {
            return response()->json([
                'error', 'unauthorized',
            ], 401);
        }
        return $this->respondWithToken($token);
    }

    public function getAuthUser(Request $request)
    {
        return response()->json(auth()->user());
    }
    public function logout()
    {

        auth()->logout();
        return response()->json(['message' => 'successfully logout']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expired_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
