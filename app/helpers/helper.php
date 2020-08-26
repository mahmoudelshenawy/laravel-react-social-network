<?php
function is_active($routeName)
{
  return null !== request()->segment(2) && request()->segment(2) == $routeName ? 'active' : '';
}

// function dashboard_active($routeName)
// {
//   return null !== request()->segment(2) && request()->segment(1) == $routeName ? 'active' : '';
// }
