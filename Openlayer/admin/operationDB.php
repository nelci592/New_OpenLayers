<?php
include '../dbh.php';
session_start();


if (isset($_POST['add_operation'])) {
  $current_level = $_POST['rolename'];
  $assigned_person = $_POST['username'];
  $operation_description = $_POST['operation_description'];


$sql = "INSERT INTO operations ( operation_description, current_level, assigned_person)
        VALUES ('$operation_description', '$current_level', '$assigned_person')";



$result = $conn->query($sql);
header('location: home.php');
}

if (isset($_POST['reassign'])) {
  $current_level = $_POST['rolename'];
  $assigned_person = $_POST['username'];
  $operation_id = $_POST['operation_id'];

  $sql = ("UPDATE operations
          Set current_level = '$current_level', assigned_person = '$assigned_person'  WHERE operation_id = '$operation_id'");
          $result = $conn->query($sql);
echo "$sql";
     //header("Location: home.php");
}
