<?php session_start(); ?>
<?php include('../template.php'); ?>
<title>Change level / Delete user</title>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="addtask.css">

<form action="changeOrDelUserDB.php" form class="form-style-9" method="POST">

<div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">

                    </div>
                    <div class="col-md-9 register-right">
                        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Change</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Delete</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Change user's level(s)</h3>
                                <div class="row register-form">

                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <div class="input-group">

                                            <select name="username" id="users" class="form-control">
                                              <option class="hidden"  selected disabled>Select user</option>
                                              <?php
                                              require "../dbh.php";// connection to database
                                              $sql="SELECT username FROM user "; // Query to collect data

                                              foreach ($conn->query($sql) as $row) {
                                              echo "<option value=$row[username]>$row[username]</option>";
                                              }
                                              ?>

                                              </select>


                                        </div>
                                      </div>

                                    </div>


                                    <div class="col-md-6">
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


                                        <input type="submit" class="btnRegister" name="change"  value="Change level(s)"/>
                                    </div>
                                </div>
                            </div>

                          </form>


                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <form action="changeOrDelUserDB.php" form class="form-style-9" method="POST">


                                <h3  class="register-heading">Delete user</h3>

                                <div class="row register-form">

                                    <div class="col-md-6">

                                      <div class="buttonHolder">
                                      <div class="form-group">
                                        <div class="input-group">
                                            <select name="user" id="user" class="form-control">
                                              <option class="hidden"  selected disabled>Select user to delete</option>
                                              <?php
                                              require "../dbh.php";// connection to database
                                              $sql="SELECT username FROM user "; // Query to collect data

                                              foreach ($conn->query($sql) as $row) {
                                              echo "<option value=$row[username]>$row[username]</option>";
                                              }
                                              ?>

                                              </select>
                                        </div>

                                      </div>
                                        <input type="submit" class="btnRegister" name= "delete"  value="Delete user"/>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
</form>
