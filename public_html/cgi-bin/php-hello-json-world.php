<html>
 <head>
  <title>Hello CGI JSON World</title>
 </head>
 <body>
 <h1 align=center>Hello HTML World</h1>
 <hr/>
 Hello World<br/>

   <?php
        echo "{\"message\":\"Hello World\",";
        echo "\"date\":\"" . date("D-m-d-G-i-s-e-Y") . "\",";
        echo "\"currentIP\":\"" . $_SERVER['REMOTE_ADDR'] . "\"}";
    ?>

 </body>
