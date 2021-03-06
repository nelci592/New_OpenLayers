<?session_start();?>

<?php include('../dbh.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <title>TaskXplor</title>
    <meta charset="utf-8">
    <meta http-equiv="cache-control" content="no-cache, must-revalidate, post-check=0, pre-check=0" />
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="MobileOptimized" content="width" />
    <meta name="HandheldFriendly" content="true" />

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <link href="stylesheet/index.css" type="text/css" rel="stylesheet">

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.2.0/css/ol.css" type="text/css">


     <!-- <script src="data/navigatie.json"></script> -->

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/tabs.css">
    <!-- <link rel="stylesheet" href="css/font-awesome.css"> -->
    <!-- <link rel="stylesheet" href="css/ospb.css">
    <link rel="stylesheet" href="css/horizontal.css">
    < -->
    <script src="./script/kv_menu.js"></script>

    <link rel="stylesheet" href="sidebar/sidebar.css" />
      <script src="data/navigatie.json"></script>
      <!-- <script src="script/plugins.js"></script> -->

     <!-- link and script for the confirm button -->
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
     <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
     <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">


     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
     <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


<!-- for the second form   -->
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
     <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <!-- <script src="jquery-3.3.1.min.js"></script> -->

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </head>

  <body>





   <nav class="navbar navbar-inverse">
      <div class="container-fluid">


        <ul class="nav navbar-nav navbar-right">

          <!-- <li><a href=" <a href="http://localhost:1234/test.php"><span class="glyphicon glyphicon-user"></span> Login</a></li> -->
          <!-- <li><a onclick="myFunction()"><span class="glyphicon glyphicon-user"></span> Log in</a></li> -->
          <!-- <li><a class="<?php echo $activeHome; ?>" href="auth.php">HOME</a></li> -->
<!--
         -->

          <li><a href="../auth.php"><span class="glyphicon glyphicon-user"></span> Log in</a></li>


          <li><a href="../admin/home.php"><span class="glyphicon glyphicon-log-in"></span>Profile</a></li>
          <!-- <li><a href="../admin/home.php"><span class="glyphicon glyphicon-log-in"></span> Profile</a></li> -->

        </ul>
      </div>
    </nav>


<!-- <ul>


  <li><a href="../auth.php">Contact us</a></li>
  <li><a href="#home">Information</a></li>

  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Profile</a>
    <div class="dropdown-content">
      <a href="#">Profile page</a>
      <a href="#">Log out</a>
    </div>
  </li>

<li class="dropdown">
  <a href="javascript:void(0)" class="dropbtn">Polygon Settings</a>
  <div class="dropdown-content">
    <a href='../auth.php'>Draw</a>
    <a href="#">Edit</a>
    <a href="#">Something</a>
  </div>
</li>

</ul> -->


<!-- The Modal -->



    <!-- <div class="scrollbar">
      <div class="handle">
          <div class="mousearea"></div>
      </div>
  </div> -->

  <div class="frame" id="basic">
      <ul id="iconenmenu" class="clearfix">
          <li class=ulmenu title="Home"></li>
      </ul>
      <div id=titel>Vergeet niet uw bewerkingen op te slaan met de opslaan knop. <i class="fas fa-save"></i></div>
  </div>



      <div id="sidenav" class="sidenav">
          <a class="sidebutton" href="#" onclick="Expend(this.text)">Home</a>
          <a class="sidebutton" href="#" onclick="Expend(this.text)">Style</a></br>
          <a class="sidebutton" href="#" onclich="expandFirstForm()">First form</a>
          <a class="sidebutton" href="#" onclick="Expend(this.text)">Second form</a>
          <a class="sidebutton" href="#" onclick="Expend(this.text)">Personal</a>

      </div>


      <div id="sidetab" class="sidetab">
          <a href="#" class="closebtn" onclick="UnExpend()">&times;</a>


          <div id = "StyleContent" class="sidetabContent">
                  <p id="h1">Select color of the polygon</p>
                  <div class="box">
                    <a  onclick="ChangeSelectFeatureColor(styleGreen)" id= "CGreen" >#e74c3c</a>
                    <a id= "CBlue" onclick="ChangeSelectFeatureColor(styleBlue)">#3498db</a>
                    <a id= "CYellow" onclick="ChangeSelectFeatureColor(styleYellow)" >#f1c40f</a>
                    <a id= "CRed" onclick="ChangeSelectFeatureColor(styleRed)">Red>#f1c40f</a>
                    <a id="COrange" onclick="ChangeSelectFeatureColor(styleOrange)">#e67e22</a>
                  </div>
              <div class="buttonHolder">
                <button onclick="expandFirstForm()" id="formButton" class="button"><span>Confirm </span></button>

                <button onclick="myFunction()">Try it</button>

                <script>
                var role = "<?php echo $_SESSION['user']['rolename'] ?>";
                function myFunction() {
                   alert(role);
               }



                //$_SESSION['user']['rolename'];
                </script>

                <form id="form1">
                  <h2>Informatie over dit object</h2>
                  <b>Geef omschrijving:</b> <input type="text" name="firstName">
                    <br><br>
                  <b>Uiterste herstel datum:</b><input type="text" name="lastName">
                    <br><br>
                    <b>  VSM-nummer:</b><input type="text" name="lastName">
                      <br><br>

                  <b>Middelinzet:</b>
                  <select name="--Selecteer--">
                    <option value="krol">Krol met windhoff</option>
                    <option value="minima">Minima</option>
                    <option value="plassermatic">Plassermatic</option>
                    <option value="shimlifts">Shimlifts</option>
                    <option value="stopmachine">Stop machine 204/205</option
                      >
                  </select>
                    <br><br>

                  <b>WO-nummer:</b> <input type="text" name="firstName">
                    <br><br>

                  <button type="button" id="submit">Submit</button>
              </form>



              <form id="form2">
                <p>Informatie over dit object</p>
                <br>Inzet-nummer:<br>
                <input type="text" class="form-control" name="inzetnummer" placeholder="Inzet-nummer">

                <br>HWO-nummer:<br>
                <input type="text" class="form-control" name="hwonummer" placeholder="HWO-nummer">

                <br>Startdatum:<br>
                <input type="date" class="form-control" name="startdatum" placeholder="Startdatum">

                <br>Starttijd:<br>
                <input type="text" class="form-control" name="starttijd" placeholder="starttijd">

                <br>Einddatum::<br>
                <input type="text" class="form-control" name="einddatum" placeholder="Einddatum">

                <br>Endtijd:<br>
                <input type="text" class="form-control" name="endtijd" placeholder="Endtijd">

                <br>Weeknummer:<br>
                <input type="text" class="form-control" name="weeknummer" placeholder="Weeknummer">


                <div class="buttonHolder">
                <button type="submit" name="submit" class="btn btn-primary">Submit</button>
              </div>

            </form>


              </div>
          </div>

      </div>

      <script>
          var categorie_naam = "";
          var categorie = getUrlVars()['categorie'];
          var subcategorie = getUrlVars()['subcategorie'];
          var menukleur2 = "";
          var menukleur3 = "";
          var icoon1 = "";
          var icoon2 = "";

          var jsonData;

      </script>



      <div id="map"></div>
      <script src="./script/index.js"></script>
      <script src="./script/draw.js"></script>
      <script src="./sidebar/sidebar.js"></script>     <!-- import script for sidebar -->

      <!-- <script src="script/jquery.colorbox.js"></script>
      <link rel="stylesheet" href="stylesheet/colorbox.css" /> -->

<!-- over ride zoom button location -->
      <style>
          .ol-zoom{
              top:unset;
              bottom: 15%;
          }

      </style>
      <script>


function Expend(ID){
    document.getElementById('sidetab').style.width = '35%';
    //document.getElementById(ID+'Content').style.display = 'block';
}
function UnExpend(){
    document.getElementById('sidetab').style.width = '0px';
}


var confirm = document.getElementById('confirm');


function expandFirstForm() {
  Expend("FirstFormContent");
}

$(document).ready(function(){
    $("#formButton").click(function(){
      var role = "<?php echo $_SESSION['user']['rolename'] ?>";
      if (role == "Level 8") {
          $("#form1").toggle();
      }
      else if (role == "Level 1"){
        $("#form2").toggle();
      }
    });
});

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});


      </script>
  </body>
</html>
