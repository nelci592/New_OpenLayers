<?php
session_start();
session_destroy();
unset($_SESSION['username']);
header("Location: ../map/index.php");
