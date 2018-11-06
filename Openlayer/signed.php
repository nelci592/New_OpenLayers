<?php
  	session_start();

  	if (!isset($_SESSION['username'])) {
  		$_SESSION['msg'] = "You must log in first";
  		header('location: login.php');
  	}

  	if (isset($_GET['logout'])) {
  		session_destroy();
  		unset($_SESSION['username']);
  		header("location: login.php");
  	}

  ?>

  <?php include('template.php'); ?>
  <?php include('dbh.php'); ?>
  <!DOCTYPE html>
  <html>
  <head>
  	<title>Profile</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.1/js/mdb.min.js"></script>
    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="signed.css">  </head>
  <body>
  	<!-- <div class="header">
  		<h2>Home Page</h2>
  	</div>
  	<div class="content"> -->

  		<!-- notification message -->
  		<?php if (isset($_SESSION['success'])) : ?>
  			<div class="error success" >
  				<h3>
  					<?php
  						echo $_SESSION['success'];
  						unset($_SESSION['success']);
  					?>
  				</h3>
  			</div>
  		<?php endif ?>

  		<!-- logged in user information -->
  		<?php  if (isset($_SESSION['username'])) :
        // role = $mysqli->query("SELECT r.role_name FROM role r JOIN user u ON r.role_id = u.role_id WHERE username='$username'")->fetch_object()->role;  ?>
  			<p>Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>




        <div class="container">
            <div class="row profile">
            <div class="col-md-3">
              <div class="profile-sidebar">
                <!-- SIDEBAR USERPIC -->
                <div class="profile-userpic">
                  <small>
                    <i  style="color: #888;">(<?php echo ucfirst($_SESSION['user']['role_id']); ?>)</i>
                    <br>

                  </small>                </div>
                <!-- END SIDEBAR USERPIC -->
                <!-- SIDEBAR USER TITLE -->
                <div class="profile-usertitle">
                  <div class="profile-usertitle-name">
                    <?php echo $_SESSION['username']; ?>
                   </div>
                  <div class="profile-usertitle-job">
                    <?php echo $_SESSION['user']['rolename']; ?>
                  </div>
                </div>
                <!-- END SIDEBAR USER TITLE -->
                <!-- SIDEBAR BUTTONS -->
                <div class="profile-userbuttons">
                  <button type="button" a href="create_user.php" class="btn btn-success btn-sm">Add user</button>

                  <button type="button" class="btn btn-danger btn-sm">Message</button>
                </div>
                <!-- END SIDEBAR BUTTONS -->
                <!-- SIDEBAR MENU -->
                <div class="profile-usermenu">
                  <ul class="nav">
                    <li class="active">
                      <a href="#">
                      <i class="glyphicon glyphicon-home"></i>
                      Overview </a>
                    </li>
                    <li>
                      <a href="#">
                      <i class="glyphicon glyphicon-user"></i>
                      Account Settings </a>
                    </li>
                    <li>
                      <a href="tasks.php" target="_blank">
                      <i class="glyphicon glyphicon-ok"></i>
                      Tasks </a>
                    </li>
                    <li>
                      <a href="logoutpage.php">
                      <i class="glyphicon glyphicon-flag"></i>
                      Log out </a>
                    </li>
                  </ul>
                </div>
                <!-- END MENU -->
              </div>
            </div>
            <div class="col-md-9">
                    <div class="profile-content">
                 Some user related content goes here...
                    </div>
            </div>
          </div>
        </div>

        <br>
        <br>
        <p> <a href="index.html?logout='1'" style="color: red;">logout</a> </p>
  		<?php endif ?>
  	</div>

  </body>
  </html>
