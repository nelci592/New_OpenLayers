<?php session_start(); ?>
<?php include('../template.php'); ?>

<title>Register new user</title>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="addtask.css">

<form action="registerDB.php" form class="form-style-9" method="POST">
<div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">

                    </div>
                    <div class="col-md-9 register-right">

                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register new user</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="username" placeholder="Username " value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="email" placeholder="Email" value="" />

                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" placeholder="Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  placeholder="Confirm Password *" value="" />
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                          <input type="text" class="form-control" name="lastname" placeholder="Last Name " value="" />
                                        </div>

                                        <div class="form-group">
                                          <div class="input-group">
		                                          <select name="rolename" id="rolename" class="form-control">
                                                <option class="hidden"  selected disabled>Select user level</option>
                                                <?php
                                                require "../dbh.php";// connection to database
                                                $sql="SELECT rolename FROM roles "; // Query to collect data

                                                foreach ($conn->query($sql) as $row) {
                                                echo "<option value=$row[rolename]>$row[rolename]</option>";
                                                }
                                                ?>
	                                              </select>
                                      		</div>
                                        </div>

                                        <div class="form-group">
                                          <div class="input-group">

                                            <select name="rolename2" id="rolename2" class="form-control">
                                                <option class="hidden"  selected disabled>Select user level 2</option>
                                                  <option value="NULL">NULL</option>
                                                <?php
                                                require "../dbh.php";// connection to database
                                                $sql="SELECT rolename FROM roles "; // Query to collect data

                                                foreach ($conn->query($sql) as $row) {
                                                echo "<option value=$row[rolename]>$row[rolename]</option>";
                                                }
                                                ?>


                                            </select>
                                          </div>
                                        </div>

                                        <div class="form-group">
                                          <div class="input-group">

                                            <select name="rolename3" id="rolename3" class="form-control">
                                                <option class="hidden"  selected disabled>Select user level 3</option>
                                                <option value="NULL">NULL</option>
                                                <?php
                                                require "../dbh.php";// connection to database
                                                $sql="SELECT rolename FROM roles "; // Query to collect data

                                                foreach ($conn->query($sql) as $row) {
                                                echo "<option value=$row[rolename]>$row[rolename]</option>";
                                                }
                                                ?>
                                            </select>
                                          </div>
                                        </div>



                                        <input type="submit" class="btnRegister"   value="Register"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
