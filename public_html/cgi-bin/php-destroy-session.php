<html>
    <head>
        <title>GET Request Echo</title>
    </head>
    <body>
        <h1 align=center>GET Request Echo</h1>
        <hr/>
            <b>Query String:</b> 
                <?php
                    foreach($_GET as $k => $v){
                        echo $k . ": " . $v . "</br>";
                    }
                ?>
    </body>
</html>