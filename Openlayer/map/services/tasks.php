<?php
$loginstring = "host=localhost port=5433 dbname=safety user=safety password=safety";
ini_set('precision', 20);
set_time_limit(240000);   // 66 uur

$update_aantallen=1;

$cluster = $_POST['cluster'];
$task = $_POST['task'];

error_log( $task );

$dbconn = pg_connect( $loginstring ) or die("Could not connect");;

if($dbconn) {
// echo 'connected';
} else {
echo 'there has been an error connecting';
}



 $obj = json_decode($task);

 $found_features = count($obj->{'features'});

 error_log( "aantal = " .$found_features );

if( $found_features == 0 )
{
   echo "LET OP : GEEN FEATURES";
   exit;
}

 $inlist = "(";

// welke bestaande kvids zijn er

 for( $jj=0; $jj<count($obj->{'features'}); $jj++)
 {


   if( $obj->{'features'}[$jj]->properties->{kvid} > 0 )
   {
      if( $inlist != "(" )
      {
        $inlist .= ",";
      }
      $inlist .= $obj->{'features'}[$jj]->properties->{kvid};
   }

 }
 $inlist .= ")";


   if( $inlist == "()" )
   {
     $sql_delete = "delete from tasks where cluster=".$cluster;
     $result_delete = pg_query( $sql_delete ) or die('Query '.$result_delete.' failed!');


    //$sql_delete = "delete from tasks_styles where cluster=".$cluster;
    // $result_delete = pg_query( $sql_delete ) or die('Query '.$result_delete.' failed!');
   }
   else
   {
     $sql_delete = "delete from tasks where cluster=".$cluster." and kvid not in ".$inlist;
     $result_delete = pg_query( $sql_delete ) or die('Query '.$result_delete.' failed!');
    // $sql_delete = "delete from tasks_styles where styleid not in ".$inlist;
    // $result_delete = pg_query( $sql_delete ) or die('Query '.$result_delete.' failed!');

   }
 	error_log( $sql_delete );



 for( $jj=0; $jj<count($obj->{'features'}); $jj++)
 {


  // $this_value = $obj->{'features'}[$jj]->properties->{$prop_val};

   if( $obj->{'features'}[$jj]->properties->{kvid} > 0 )
   {
     error_log( "bestaande kvid=".$obj->{'features'}[$jj]->properties->{kvid} );

     $new_id = $obj->{'features'}[$jj]->properties->{kvid};

     $omschrijving = $obj->{'features'}[$jj]->properties->{omschrijving};
     $hersteldatum = $obj->{'features'}[$jj]->properties->{hersteldatum};


     $startdatum = $obj->{'features'}[$jj]->properties->{startdatum};
     $einddatum = $obj->{'features'}[$jj]->properties->{einddatum};
     $starttijd = $obj->{'features'}[$jj]->properties->{starttijd};
     $einddtijd = $obj->{'features'}[$jj]->properties->{einddtijd};

   $middelinzet = $obj->{'features'}[$jj]->properties->{middelinzet};
   $wonummer = $obj->{'features'}[$jj]->properties->{wonummer};

   $inzetnummer = $obj->{'features'}[$jj]->properties->{inzetnummer};
   $weeknummer = $obj->{'features'}[$jj]->properties->{weeknummer};
    $vsmnummer = $obj->{'features'}[$jj]->properties->{vsmnummer};
     $hwonummer = $obj->{'features'}[$jj]->properties->{hwonummer};

if( $vsmnummer == "" )
{
  $vsmnummer = 0;
}
if( $hwonummer == "" )
{
  $hwonummer = 0;
}
if( $weeknummer == "" )
{
  $weeknummer = 0;
}

   $this_geo = json_encode( $obj->{'features'}[$jj]->geometry );

   $sql = "update tasks set geom=ST_GeomFromGeoJSON('".$this_geo."') where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set omschrijving='".$omschrijving."' where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   if( strlen( $hersteldatum ) > 9 )
   {
     $sql = "update tasks set hersteldatum='".$hersteldatum."' where kvid=".$new_id;
     $result = pg_query( $sql ) or die('Query '.$sql.' failed!');
error_log( "QUERY=".$sql );

   }
   $sql = "update tasks set middelinzet='".$middelinzet."' where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set wonummer=".$wonummer." where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set inzetnummer=".$inzetnummer." where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set vsmnummer=".$vsmnummer." where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set hwonummer=".$hwonummer." where kvid=".$new_id;

   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $sql = "update tasks set weeknummer=".$weeknummer." where kvid=".$new_id;
   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   if( strlen( $startdatum ) > 9 )
   {
     $sql = "update tasks set startdatum='".$startdatum."' where kvid=".$new_id;
     $result = pg_query( $sql ) or die('Query '.$sql.' failed!');
    }
   if( strlen( $einddatum ) > 9 )
   {
     $sql = "update tasks set einddatum='".$einddatum."' where kvid=".$new_id;
     $result = pg_query( $sql ) or die('Query '.$sql.' failed!');
    }
    if( strlen( $starttijd ) > 0 )
    {
      $sql = "update tasks set starttijd='".$starttijd."' where kvid=".$new_id;
      $result = pg_query( $sql ) or die('Query '.$sql.' failed!');
     }
    if( strlen( $eindtijd ) > 0 )
    {
      $sql = "update tasks set eindtijd='".$eindtijd."' where kvid=".$new_id;
      $result = pg_query( $sql ) or die('Query '.$sql.' failed!');
     }



   $this_stroke = 1; // $obj->{'features'}[$jj]->style->stroke;
    $this_color = $obj->{'features'}[$jj]->style->color;
    $this_dasharray = $obj->{'features'}[$jj]->style->dashArray;
     $this_weight = $obj->{'features'}[$jj]->style->weight;
    $this_opacity = round($obj->{'features'}[$jj]->style->fillOpacity,2);
    $this_fillcolor = $obj->{'features'}[$jj]->style->fillColor;



   $sql_style = "update tasks_styles set stroke='".$this_stroke."',color='".$this_color."',fillcolor='".$this_fillcolor."',dasharray='".$this_dasharray."',weight='".$this_weight."',opacity='".$this_opacity."' where styleid=".$new_id;
   $result_style = pg_query( $sql_style ) or die('Query '.$sql_style.' failed!');



   }
   else  ////// NIEUW///////
   {

   $this_geo = json_encode( $obj->{'features'}[$jj]->geometry );
   $omschrijving = $obj->{'features'}[$jj]->properties->{omschrijving};
   $middelinzet = $obj->{'features'}[$jj]->properties->{middelinzet};
   $wonummer = $obj->{'features'}[$jj]->properties->{wonummer};
   $hwonummer = $obj->{'features'}[$jj]->properties->{hwonummer};
   $vsmnummer = $obj->{'features'}[$jj]->properties->{vsmnummer};
   $weeknummer = $obj->{'features'}[$jj]->properties->{weeknummer};

   $hersteldatum = $obj->{'features'}[$jj]->properties->{hersteldatum};
   $einddatum = $obj->{'features'}[$jj]->properties->{einddatum};
   $startdatum = $obj->{'features'}[$jj]->properties->{startdatum};
   $eindtijd = $obj->{'features'}[$jj]->properties->{eindtijd};
   $starttijd = $obj->{'features'}[$jj]->properties->{starttijd};
   $inzetnummer = $obj->{'features'}[$jj]->properties->{inzetnummer};



	 if( is_numeric( $wonummer ) == false )
	 {
	    $wonummer = 0;
     }
	 if( is_numeric( $hwonummer ) == false )
	 {
	    $hwonummer = 0;
     }
	 if( is_numeric( $vsmnummer ) == false )
	 {
	    $vsmnummer = 0;
     }
	 if( is_numeric( $weeknummer ) == false )
	 {
	    $weeknummer = 0;
     }



	 if( is_numeric( $inzetnummer ) == false )
	 {
	    $inzetnummer = 0;
     }


   if( strlen( $hersteldatum ) < 10 )
   {
     $hersteldatum = "01-01-2000";
   }
   if( strlen( $einddatum ) < 10 )
   {
     $einddatum = "01-01-2000";
   }
   if( strlen( $startdatum ) < 10 )
   {
     $startdatum = "01-01-2000";
   }



   $sql = "INSERT into tasks (geom, cluster,omschrijving,hersteldatum,middelinzet,wonummer,inzetnummer,vsmnummer,hwonummer,weeknummer,startdatum,einddatum,starttijd,eindtijd) values ( ST_GeomFromGeoJSON('".$this_geo."'), ".$cluster.",'".$omschrijving."','".$hersteldatum."','".$middelinzet."',".$wonummer.",".$inzetnummer.",".$vsmnummer.",".$hwonummer.",".$weeknummer.",'".$startdatum."','".$einddatum."','".$starttijd."','".$eindtijd."') returning kvid";

   error_log( $sql );


   $result = pg_query( $sql ) or die('Query '.$sql.' failed!');

   $row = pg_fetch_row($result);
   $new_id = $row['0'];

    error_log( "nieuwe kvid=".$new_id );


    $this_stroke = 1; // $obj->{'features'}[$jj]->style->stroke;
    $this_color = $obj->{'features'}[$jj]->style->color;
    $this_dasharray = $obj->{'features'}[$jj]->style->dashArray;
    $this_weight = $obj->{'features'}[$jj]->style->weight;
    $this_opacity = round($obj->{'features'}[$jj]->style->fillOpacity,2);
    $this_fillcolor = $obj->{'features'}[$jj]->style->fillColor;


    $array_this_iconsize = $obj->{'features'}[$jj]->properties->markerOptions->iconSize;;
    $this_iconurl = $obj->{'features'}[$jj]->properties->markerOptions->iconUrl;



    if( count( $array_this_iconsize ) == 2 )
    {
      $this_iconsize = $array_this_iconsize[0].",".$array_this_iconsize[1];
    }

    $sql_style = "INSERT into tasks_styles (styleid, stroke,color,fillcolor,dasharray,weight,opacity,iconsize,iconurl) values (".$new_id.",'".$this_stroke."','".$this_color."','".$this_fillcolor."','".$this_dasharray."','".$this_weight."','".$this_opacity."','".$this_iconsize."','".$this_iconurl."')";
    error_log( $sql_style);
    $result_style = pg_query( $sql_style ) or die('Query '.$sql_style.' failed!');


  }

 }

 echo "Succesvol verwerkt (".$found_features.")";

?>
