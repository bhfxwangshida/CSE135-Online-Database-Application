<html>
 <head>
  <title>Hello CGI World</title>
 </head>
 <body>
 <h1 align=center>Hello HTML World</h1>
 <hr/>
 Hello World<br/>

    <?php
    echo "This program was generated at: " . date("D m d G i s e Y",$t) . "<br>";
    echo "Your current IP address is: " . $_SERVER['REMOTE_ADDR'];
    ?>

 </body>
</html>