<?php
include '../dbh.php';
session_start();

  $rolename = $_POST['rolename'];
  $role_desc = $_POST['role_desc'];

$sql = "INSERT INTO roles (rolename, role_desc)
        VALUES ('$rolename', '$role_desc')";



$result = $conn->query($sql);
header('location: home.php');
