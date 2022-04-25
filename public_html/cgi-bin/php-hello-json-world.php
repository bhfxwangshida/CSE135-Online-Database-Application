<html>
 <head>
  <title>Hello CGI JSON World</title>
 </head>
 <body>

   <?php
        echo "{\"message\":\"Hello World\",";
        echo "\"date\":\"" . date("D-m-d-G-i-s-e-Y") . "\",";
        echo "\"currentIP\":\"" . $_SERVER['REMOTE_ADDR'] . "\"}";
    ?>

 </body>
