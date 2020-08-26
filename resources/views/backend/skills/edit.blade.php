@extends('layout.app')

@section('content')
<div class="col-md-8">
  <div class="card">
    <div class="card-header card-header-primary row">
      <div class="col-8">
      <h4 class="card-title">Edit Skill</h4>
      <p class="card-category">You can edit a skill</p>
    </div>
      <div class="col-4">
        <a href="{{ route('skills.index') }}" class="btn btn-info btn-round text-right">Back<div class="ripple-container"></div></a>
      </div>
    </div>
    <div class="card-body">
      <form action="{{ route('skills.update',$row->id)}}" method="POST">
        {{ csrf_field() }}
        {{method_field('put')}}
        @include('partials._errors')
        <div class="row">
          <div class="col-md-10">
            <div class="form-group bmd-form-group">
              <label class="bmd-label-floating">Skillname</label>
            <input type="text" name="name" class="form-control" value="{{$row->name}}">
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary pull-right">Edit Skill</button>
        <div class="clearfix"></div>
      </div>
        
       
      </form>
    </div>
  </div>

@endsection