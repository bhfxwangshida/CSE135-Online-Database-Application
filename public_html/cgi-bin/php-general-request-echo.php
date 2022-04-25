<html>
    <head>
        <title>Genreal Request Echo</title>
    </head>
    <body>
        <h1 align=center>General Request Echo</h1>
        <hr/>     
        <?php    
            echo "<tr> <td>Protocol:</td><td>" . $_SERVER['SERVER_PROTOCOL'] . "</td></tr></br>";
            echo "<tr> <td>Method:</td><td>" . $_SERVER['REQUEST_METHOD'] . "</td></tr></br>";
            echo "<tr> <td>Message Body:</td><td></td></tr></br>";   
        ?>
       
        <?php
            foreach($_POST as $k => $v){
                echo $k . ": " . $v. "</br>";
            }
        ?>
    </body>
</html>