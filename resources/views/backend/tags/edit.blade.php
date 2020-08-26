@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">Edit tag</h4>
      <p class="card-category">You can edit a tag</p>
    </div>
      <div class="col-4">
        <a href="{{ route('tags.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('tags.update',$row->id)}}" method="POST">
        {{ csrf_field() }}
        {{method_field('put')}}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">tagname</label>
            <input type="text" name="name" class="form-control" value="{{$row->name}}">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Edit tag</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection