<?php session_start(); ?>
<?php include('../template.php'); ?>
<title>Add / Reassign opertation</title>

<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="addtask.css">

<form action="operationDB.php" form class="form-style-9" method="POST">

<div class="container register">
        <div class="row">
            <div class="col-md-3 register-left">

            </div>

            <div class="col-md-9 register-right">
                <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Add</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Change</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 class="register-heading">Add new operation</h3>
                        <div class="row register-form">


                            <div class="col-md-6">

                              <div class="form-group">
                                <div class="input-group">
                                    <select name="rolename" id="rolename" class="form-control">
                                      <option class="hidden"  selected disabled>Select level</option>
                                      <option >Level 1</option>


                                      </select>
                                </div>

                              </div>

                              <div class="form-group">
                                <div class="input-group">
                                    <select name="username" id="username" class="form-control">
                                      <option class="hidden"  selected disabled>Select person to assign</option>
                                      <?php
                                      require "../dbh.php";// connection to database
                                      $sql="SELECT username FROM user WHERE rolename = 'Level 1' "; // Query to collect data

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
                                     <input type="text" class="form-control" placeholder="Operation description" name="operation_description" value="" />
                               </div>



                              <input type="submit" class="btnRegister" name="add_operation"  value="Add operation"/>
                        </div>
                    </div>
                    </div>

                    </form>

                    <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <form action="operationDB.php" form class="form-style-9" method="POST">


                        <h3  class="register-heading">Reassign operation</h3>

                        <div class="row register-form">

                                    <div class="col-md-6">

                                      <div class="form-group">
                                        <div class="input-group">
                                          <select name="operation_id" id="operation_id" class="form-control">
                                            <option class="hidden"  selected disabled>Select operation</option>
                                            <?php
                                            require "../dbh.php";// connection to database
                                            $sql="SELECT operation_id FROM operations "; // Query to collect data
                                            foreach ($conn->query($sql) as $row) {
                                            echo "<option value=$row[operation_id]>$row[operation_id]</option>";
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

                                               <script type="text/javascript">
                                               var selected_option_value=$("#select1 option:selected").val();
                                               </script>

                                         </div>

                                       </div>

                                       <div class="form-group">
                                         <div class="input-group">
                                             <select name="username" id="username" class="form-control" onchange='load_new_content()'>
                                               <option class="hidden"  selected disabled>Select new person to assign</option>
                                               <?php
                                               require "../dbh.php";// connection to database
                                               $sql="SELECT username FROM user  "; // Query to collect data

                                               foreach ($conn->query($sql) as $row) {
                                               echo "<option value=$row[username]>$row[username]</option>";
                                               }
                                               ?>
                                             </select>
                                         </div>
                                       </div>



                                      <input type="submit" class="btnRegister" name="reassign"  value="Add operation"/>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>


        </form>
