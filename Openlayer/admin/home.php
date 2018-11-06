<?session_start();


?>

<?php include('../template.php'); ?>
<?php include('../dbh.php'); ?>

<!DOCTYPE html>
<html>

<head>
<title>Profile</title>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="../signed.css">




<div class="container">
    <div class="row profile">
		<div class="col-md-3">
			<div class="profile-sidebar">
				<!-- SIDEBAR USERPIC -->

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
					<button type="button" class="btn btn-success btn-sm">Follow</button>
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
							<a href="register.php">
							<i class="glyphicon glyphicon-user"></i>
							Register new user </a>
						</li>

            <li>
							<a href="changeOrDelUser.php">
							<i class="glyphicon glyphicon-user"></i>
							Change / Delete user </a>
						</li>


            <li>
              <a href="operation.php" target="_self">
              <i class="glyphicon glyphicon-ok"></i>
              Add / Reassign operation </a>
            </li>


						<li>
							<a href="addOrReassignTask.php" target="_self">
							<i class="glyphicon glyphicon-ok"></i>
							Add / Change task </a>
						</li>


              <li>
  							<a href="addlevel.php" target="_self">
  							<i class="glyphicon glyphicon-ok"></i>
  							Add new level / role </a>
  						</li>


                    <li>
              							<a href="../logout.php">
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
			   Here the user will get a list with the tasks he/she has to do:
        For example:
            <p>-Draw a polygon</p>
            <p>-Make cluster</p>
            <p>-And so on</p>
            </div>
		</div>
	</div>
</div>

<br>
<br>
