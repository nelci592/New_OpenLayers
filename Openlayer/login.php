<?php
session_start();

include 'dbh.php';
$errors = array();
$username = $_POST['username'];
$password = $_POST['password'];
$_SESSION['success'] = "";
$_SESSION['username'] = "";
$_SESSION['user'] = "";

$sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);


if (mysqli_num_rows($result) == 1) { // user found
  $logged_in_user = mysqli_fetch_assoc($result);
    session_start();
    $_SESSION['username'] = $username;
    $_SESSION['user'] = $logged_in_user;
    $_SESSION['success']  = "You are now logged in";
    header('location: map/index.html');
  }

  else {
    array_push($errors, "Wrong username/password combination");
  }

function isLoggedIn()
{
  if (isset($_SESSION['user'])) {
    return true;
  }else{
    return false;
  }
}

function  isAdmin()
{
  if (isset($_SESSION['user']) && $_SESSION['user']['rolename'] == 'Admin' ) {
    	header('location: admin/home.php');
      return true;
  }else{
    return false;
  }
}

function isLevel8()
{
  if (isset($_SESSION['user']) && $_SESSION['user']['rolename'] == 'Level 8' ) {
    header('location: levels/eight/home.php');
  }else{
    return false;
  }
}


// escape string
function e($val){
  global $db;
  return mysqli_real_escape_string($db, trim($val));
}

function display_error() {
  global $errors;

  if (count($errors) > 0){
    echo '<div class="error">';
      foreach ($errors as $error){
        echo $error .'<br>';
      }
    echo '</div>';
  }
}

?>
