@extends('layout.app')
@php
  $page_title ='Categories page';
  $page_desc = 'here you can add , edit and delete categories'
@endphp
@section('content')
@component('layout.header')
     @slot('title')
        {{$page_title}}
     @endslot
@endcomponent

<div class="row">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header-primary row">
        <div class="col-8">
          <h4 class="card-title ">Simple Table</h4>
        <p class="card-category">{{$page_desc}}</p>
        </div>
        <div class="col-4">
          <a href="{{ route('categories.create') }}" class="btn btn-info btn-round text-right">Add Categoryr<div class="ripple-container"></div></a>
        </div>
       
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class=" text-primary">
              <th>
                ID
              </th>
              <th>
                Name
              </th>
              <th>
                Actions
              </th>
            </thead>
            <tbody>
            @if (count($rows) > 0)
                @foreach ($rows as $index=>$row)
                    <tr>
                    <th>{{$index + 1}}</th>
                    <th>{{$row->name}}</th>
                    <th class="td-actions">
                      <a href ={{ route('categories.edit', ['category'=>$row->id]) }} rel="tooltip" title="" class="btn btn-white btn-link btn-sm" data-original-title="Edit user">
                        <i class="material-icons">edit</i>
                      </a>
                      <form style='display:inline-block' action="{{ route('categories.destroy', [$row->id]) }}" method="post">
                        {{ csrf_field() }}
                        {{method_field('delete')}}
                      <button type="submit" rel="tooltip" title="" class="btn btn-white btn-link btn-sm" data-original-title="Remove">
                        <i class="material-icons">close</i>
                      </button>
                    </form>
                    </th>
                    </tr>
                @endforeach
            @else
                <h3 class="text-center">there is no item found</h3>
            @endif
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


@endsection