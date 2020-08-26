@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">Edit Category</h4>
      <p class="card-category">You can edit a category</p>
    </div>
      <div class="col-4">
        <a href="{{ route('categories.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('categories.update',$row->id)}}" method="POST">
        {{ csrf_field() }}
        {{method_field('put')}}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Categoryname</label>
            <input type="text" name="name" class="form-control" value="{{$row->name}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Keyword</label>
              <input type="text" name="meta_keywords" class="form-control" value="{{$row->meta_keywords}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Description</label>
              <input type="text" class="form-control" name="meta_desc" value="{{$row->meta_desc}}">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Edit Category</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection