<?php
//database connection
$conn = mysqli_connect("studmysql01.fhict.local","dbi349735","neli123","dbi349735");
if (!$conn) {
  die("Connection failed: ".mysqli_connect_error());
}
