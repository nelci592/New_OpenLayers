<?php
include('dbh.php');
session_start();

$username = $_SESSION['username'];
$rolename = "SELECT username FROM user WHERE username='$username'";



switch($_SESSION['user']['rolename']) {
    case "Admin":
        header("Location: ../admin/home.php");
        break;
    case "Level 8":
        header("Location: levels/eight/home.php");
        break;
}


?>
