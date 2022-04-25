<html>
    <head>
        <title>POST Request Echo</title>
    </head>
    <body>
        <h1 align=center>POST Request Echo</h1>
        <hr/>
            <b>Query String:</b> 
                <?php    foreach($_POST as $k => $v){
                        echo $k . ": " . $v . "<br/>";
                    }
                ?>
    </body>
</html>