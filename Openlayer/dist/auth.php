
                <?php include('template.php'); ?>

                <!DOCTYPE html>
                <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">

                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                  <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
                  <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.1/js/mdb.min.js"></script>
                  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
                  <link rel="stylesheet" type="text/css" href="form.css">
                  <title>Log in</title>
                   <?php include('errors.php'); ?>
                  <body  '<div style="height: 1100px" id="content">
                                  <form action="login.php" form class="form-style-9" method="POST">
                                    <p>Please enter your information to log in</p>
	                                    <?php include('errors.php'); ?>
                                    <br>User name<br>
                                    <input type="text" class="form-control" name="username" placeholder="Your user name">
                                    <br>Password<br>
                                    <input type="password" class="form-control" name="password" placeholder="Your password"><br>
                                    <div class="buttonHolder">

                                    <button type="submit" name="login_user" class="btn btn-primary">Login</button>
                                  </div>
                                  </form>
                              </div>'

                  </body>
                </html>
