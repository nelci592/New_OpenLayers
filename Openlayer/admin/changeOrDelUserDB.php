<?php
include('../dbh.php');
session_start();

$username = $_POST['user'];
$rolename = $_POST['rolename'];
$rolename2 = $_POST['rolename2'];
$rolename3 = $_POST['rolename3'];


if (isset($_POST['change'])) {
  $sql = ("UPDATE user
          Set rolename = '$rolename', rolename2 = '$rolename2',rolename3 = '$rolename3'  WHERE username = '$user'");
          $result = $conn->query($sql);

     header("Location: home.php");
        }




if (isset($_POST['delete'])) {

      if($conn === false){
          die("ERROR: Could not connect. " . mysqli_connect_error());
      }

      $sql = "DELETE FROM user WHERE username = '$username'";
      if(mysqli_query($conn, $sql)){

         header('location: home.php');
      } else{
          echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
      }
}

 ?>
