@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">edit Video</h4>
      <p class="card-category">You can edit a video</p>
    </div>
      <div class="col-4">
        <a href="{{ route('videos.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('videos.update',$row->id)}}" method="POST">
        {{ csrf_field() }}
        {{method_field('put')}}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">video name</label>
            <input type="text" name="name" class="form-control" value="{{$row->name}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Description</label>
              <input type="text" name="desc" class="form-control" value="{{$row->desc}}">
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
              <label class="bmd-label-floating">meta Description</label>
              <textarea type="text" class="form-control" name="meta_desc" value="{{$row->meta_desc}}"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">youtube(url)</label>
              <input type="url" class="form-control" name="youtube" value="{{$row->youtube}}">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">published</label>
             <select name="published" class="form-control input-field">
               <option value="1" {{$row->published == 1 ? 'selected' : ''}}>Published</option>
               <option value="0" {{$row->published == 0 ? 'selected' : ''}}>hidden</option>
             </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Category</label>
             <select name="cat_id" class="form-control input-field">
               @foreach ($categories as $cat)
             <option value="{{$cat->id}}" {{$row->cat_id == $cat->id ? 'selected' : ''}}>{{$cat->name}}</option>
               @endforeach
              
               
             </select>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Edit Video</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection