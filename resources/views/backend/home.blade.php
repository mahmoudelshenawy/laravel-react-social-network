@extends('layout.app')

@section('content')
@component('layout.header')
     @slot('title')
         Home page
     @endslot
@endcomponent

@endsection