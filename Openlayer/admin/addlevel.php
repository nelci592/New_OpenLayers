<?php
include '../dbh.php';
session_start();
$username = $_SESSION['username'];
?>
<?php include('../template.php'); ?>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="addtask.css">

<form action="addlevelDB.php" form class="form-style-9" method="POST">

<div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">


                    </div>
                    <div class="col-md-9 register-right">

                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Add new level / role</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Level / role name" name="rolename" value="" />
                                        </div>


                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                          <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Level / role description"  name="role_desc" value="" />

                                          </div>
                                              </div>




                                        <input type="submit" class="btnRegister"  value="Add level"/>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </div>
</form>
