<?php

$conn = new mysqli("studmysql01.fhict.local","dbi349735","neli123","dbi349735")
or die ('Cannot connect to db');

    $result = $conn->query("select distinct(rolename) from user");

    echo "<html>";
    echo "<body>";
    echo "<select rolename='id'>";

    while ($row = $result->fetch_assoc()) {

                  unset($rolename);
                  rolename = $row['rolename'];
                  echo '<option value="'.$id.'">'.$rolename.'</option>';

}

    echo "</select>";
    echo "</body>";
    echo "</html>";
?>
