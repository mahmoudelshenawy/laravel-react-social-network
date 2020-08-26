@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">Add Video</h4>
      <p class="card-category">You can add a video</p>
    </div>
      <div class="col-4">
        <a href="{{ route('videos.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('videos.store')}}" method="POST">
        {{ csrf_field() }}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">video name</label>
              <input type="text" name="name" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Description</label>
              <input type="text" name="desc" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Keyword</label>
              <input type="text" name="meta_keywords" class="form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">meta Description</label>
              <textarea type="text" class="form-control" name="meta_desc"></textarea>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">youtube(url)</label>
              <input type="url" class="form-control" name="youtube">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">published</label>
             <select name="published" class="form-control input-field">
               <option value="1">Published</option>
               <option value="0">hidden</option>
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
             <option value="{{$cat->id}}">{{$cat->name}}</option>
               @endforeach
              
               
             </select>
            </div>
          </div>
        </div>
        <div class="row">
          @php $input = "skills[]"; @endphp
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Skills</label>
            <select name="{{$input}}" class="form-control input-field" multiple style="height:70px">
               @foreach ($skills as $skill)
             <option value="{{$skill->id}}">{{$skill->name}}</option>
               @endforeach
             </select>
            </div>
          </div>
        </div>
        <div class="row">
          @php $input = "tags[]"; @endphp
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Tags</label>
            <select name="{{$input}}" class="form-control input-field" multiple style="height:70px">
               @foreach ($tags as $tag)
             <option value={{$tag->id}}>{{$tag->name}}</option>
               @endforeach
             </select>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Add Video</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection