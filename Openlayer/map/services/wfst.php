<?php


echo " Start test";
/***
<wfs:Transaction service="WFS" version="1.0.0" xmlns:Safety="http://safety.projectxplor.nl/Safety" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd ">
  <wfs:Insert>
    <Safety:cluster>
      <geom>
        <gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#28992"><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">112744.565067,400919.410656 112747.110022,400906.289897 112747.110022,400906.289897 112747.390085,400902.048643 112751.10608,400885.817339 112744.565067,400919.410656</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon>
      </geom>
      <soort>BD</soort>
    </Safety:cluster>
  </wfs:Insert>
</wfs:Transaction>
***/

function MyXmlLoader($strXml)
{
	set_error_handler('MyHandleXmlError');
	$dom = new DOMDocument();
	$dom->loadXml($strXml);
	restore_error_handler();
	return $dom;
 }

function MyHandleXmlError($errno, $errstr, $errfile, $errline)
{
  if ($errno==E_WARNING && (substr_count($errstr,"DOMDocument::loadXML()")>0))
  {
	  throw new DOMException($errstr);
  }
  else
	  return false;
}


$val_database_user = "admin";
$val_database_password = "geoserverh2278921";


$val_WFS_connectionstring = "http://safety.projectxplor.nl/geoserver/wfs?";

$wfst_start_tag = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd ">';


$val_oper = "new";

if( $val_oper == "new" )
{




            $geokolom = $wfstgeom;
            $body_wfs = $wfst_start_tag;
   			//$body_wfs = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd ">';
   			$body_wfs .= '<wfs:Insert><'.$val_database_tablename.'>';
   			$body_wfs .= '<'.$geokolom.'>';

   			if( substr($val_wkt,0, 5) == "POINT")
   			{
   			    $val_wkt = str_replace( "POINT(", "", $val_wkt );
   			    $val_wkt = str_replace( ")", "", $val_wkt );
   			    $val_wkt = str_replace( " ", ",", $val_wkt );

   			    $body_wfs .= '<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#28992">';
   	 		   	$body_wfs .= '<gml:coordinates decimal="." cs="," ts=" ">'.$val_wkt.'</gml:coordinates>';
   			    $body_wfs .= '</gml:Point>';

   			}

//"POLYGON((189601+418259.36,189009.64+417587.36,189681.64+417103.52,190649.32+417264.8,190729.96+417788.96,190353.64+418434.08,189601+418259.36))"
//<gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#28992"><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">197552.044,329610.906 197551.589,329612.272 197552.954,329612.651 197552.651,329614.244 197560.693,329616.672 197563.349,329608.023 197555.307,329605.519 197555.003,329606.202 197550.678,329604.684 197551.437,329602.181 197537.401,329597.78 197536.263,329600.815 197542.56,329602.484 197541.725,329605.898 197543.85,329607.719 197543.47,329608.554 197552.044,329610.906</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon>
   			if( substr($val_wkt,0, 7) == "POLYGON")
   			{
   			    $val_wkt = str_replace( "POLYGON((", "", $val_wkt );
   			    $val_wkt = str_replace( "))", "", $val_wkt );
   			    $val_wkt = str_replace( ",", "|", $val_wkt );
   			    $val_wkt = str_replace( " ", ",", $val_wkt );
   			    $val_wkt = str_replace( "|", " ", $val_wkt );

   			    $body_wfs .= '<gml:Polygon srsName="http://www.opengis.net/gml/srs/epsg.xml#28992"><gml:outerBoundaryIs><gml:LinearRing>';
   	 		   	$body_wfs .= '<gml:coordinates decimal="." cs="," ts=" ">'.$val_wkt.'</gml:coordinates>';
   			    $body_wfs .= '</gml:LinearRing></gml:outerBoundaryIs></gml:Polygon>';

   			}


  			$body_wfs .= '</'.$geokolom.'>';
  			//$body_wfs .= '<usernaam>Jantje</usernaam>';
  			$body_wfs .= '</'.$val_database_tablename.'>';
  			$body_wfs .= '</wfs:Insert>';
  			$body_wfs .= '</wfs:Transaction>';




$body_wfs = '<wfs:Transaction service="WFS" version="1.0.0" xmlns:Safety="http://safety.projectxplor.nl/Safety" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd ">';
$body_wfs .= '  <wfs:Insert>';
$body_wfs .= '      <Safety:cluster>';
$body_wfs .= '        <geom>';
$body_wfs .= '          <gml:MultiPolygon srsName="http://www.opengis.net/gml/srs/epsg.xml#28992"><gml:polygonMember><gml:Polygon><gml:outerBoundaryIs><gml:LinearRing><gml:coordinates decimal="." cs="," ts=" ">112744.565067,400919.410656 112747.110022,400906.289897 112747.110022,400906.289897 112747.390085,400902.048643 112751.10608,400885.817339 112744.565067,400919.410656</gml:coordinates></gml:LinearRing></gml:outerBoundaryIs></gml:Polygon></gml:polygonMember></gml:MultiPolygon>';
$body_wfs .= '        </geom>';
$body_wfs .= '        <soort>BD</soort>';
$body_wfs .= '      </Safety:cluster>';
$body_wfs .= '    </wfs:Insert>';
$body_wfs .= '  </wfs:Transaction>';


     $logFile = "../../data/logs/inventarisatie_".@date('Y-m-d').".log";
	   	$currentlog = file_get_contents($logFile);
	 	$currentlog .= @date('Y-m-d H:i:s').";".$_SERVER['REMOTE_ADDR'].";NIEUW".$val_database_connectionstring.";".$body_wfs.PHP_EOL;
	file_put_contents($logFile, $currentlog);


            $ch = curl_init($val_WFS_connectionstring);

  			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml', 'Content-Length: '.strlen($body_wfs)) );
  			curl_setopt($ch, CURLOPT_VERBOSE, true);
  			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
  			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
  			curl_setopt($ch, CURLOPT_POSTFIELDS, $body_wfs);


  			if( ($val_database_user != "" ) && ($val_database_password != "" ) )
  			{
  			  curl_setopt($ch, CURLOPT_USERPWD, $val_database_user.":".$val_database_password);
              }

  			curl_setopt($ch, CURLOPT_POST, 1);

  			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  			$output = curl_exec($ch);

              $successpos = strpos($output, "wfs:SUCCESS");

  			if ($successpos === false) {
  			    echo "Geen success";
  			} else {
  			   // echo "Wel success".$output;

  			   // $array_result = explode('"',


  			 $doc = MyXmlLoader($output);

  			 $test_pos = strpos($output, "wfs:InsertResult" );

  			 if( $test_pos !== false )
  			 {
  			   $insertResults = $doc->getElementsByTagName("InsertResult");

  			 }



  			 foreach($insertResults as $insertResult)

  			 {

                  foreach ($insertResult->childNodes as $result)
  	            {
  	 				$correct_new_fid = $result->getAttribute('fid');

                   }


               }


              }


	    $splitted_correct_new_fid = explode( ".", $correct_new_fid );



      echo $val_database_key."=".$splitted_correct_new_fid[ count($splitted_correct_new_fid)-1 ] ;

}

?>