<?php
include '../dbh.php';
session_start();



if (isset($_POST['changetask'])) {
  $task = $_POST['task'];
  $rolename = $_POST['rolename'];


$sql = ("UPDATE tasks
        Set rolename = '$rolename' WHERE task = '$task'");
        $result = $conn->query($sql);
        echo "something $sql";
      //  header("Location: home.php");
      }



if (isset($_POST['addtask'])) {
  $task1 = $_POST['task1'];
  $task = $_POST['task_description'];
  //$task_description = $_POST['$task_description'];
  $rolename3 = $_POST['rolename3'];

  $sql = "INSERT INTO tasks (task, task_description, rolename)
          VALUES ('$task1', 'task', '$rolename3')";
          $result = $conn->query($sql);
          echo "$sql";
          //header('location: home.php');

}
