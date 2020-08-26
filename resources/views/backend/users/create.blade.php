@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">Add User</h4>
      <p class="card-category">You can add a user</p>
    </div>
      <div class="col-4">
        <a href="{{ route('users.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('users.store')}}" method="POST">
        {{ csrf_field() }}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Username</label>
              <input type="text" name="name" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Email</label>
              <input type="email" name="email" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <div class="file-field input-field">
                <div class="btn btn-info">
                  <span>Choose image</span>
                  <input type="file" multiple>
                </div>
                {{-- <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload one or more files">
                </div> --}}
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Password</label>
              <input type="password" class="form-control" name="password">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Confirm Password</label>
              <input type="password" class="form-control" name="password_confirmation">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Add User</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection