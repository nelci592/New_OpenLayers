<?php session_start(); ?>
<?php include('../template.php'); ?>
<title>Change Task / Add Task</title>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="addtask.css">

<form action="addOrReassignTaskDB.php" form class="form-style-9" method="POST">

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
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Add</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Change task's level</h3>
                                <div class="row register-form">

                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <div class="input-group">

                                            <select name='task' id="task" class="form-control">
                                              <option class="hidden"  selected disabled>Select Task</option>

                                              <?php
                                              require "../dbh.php";// connection to database
                                              $sql="SELECT task FROM tasks "; // Query to collect data

                                              foreach ($conn->query($sql) as $row) {
                                              echo "<option value=$row[task]>$row[task]</option>";
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
                                              <option class="hidden"  selected disabled>Select new level</option>
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




                                        <input type="submit" class="btnRegister" name="changetask"  value="Change level"/>
                                    </div>
                                </div>
                            </div>

                          </form>


                            <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <form action="addOrReassignTaskDB.php" form class="form-style-9" method="POST">


                                <h3  class="register-heading">Add Task</h3>

                                <div class="row register-form">

                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <div class="input-group">

                                          <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Task"  name = "task1" value="" />

                                          </div>

                                        </div>

                                        <div class="input-group">

                                          <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Task description" name= "task_description1" value="" />

                                          </div>

                                        </div>


                                      </div>

                                    </div>


                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <div class="input-group">

                                            <select name="rolename1" id="rolename1" class="form-control">
                                              <option class="hidden"  selected disabled>Select task level</option>


                                            <?php
                                            require "../dbh.php";// connection to database
                                            $sql="SELECT rolename FROM roles "; // Query to collect data

                                            foreach ($conn->query($sql) as $row) {
                                            echo "<option value=$row[rolename1]>$row[rolename1]</option>";
                                            }
                                            ?>


                                              </select>

                                        </div>

                                      </div>




                                        <input type="submit" class="btnRegister" name="addtask"  value="Add Task"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


</form>
