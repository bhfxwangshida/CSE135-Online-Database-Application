<html>
    <head>
        <title>
            Environment Variables
        </title>
    </head>
    <body>
        
        <h1 align=center>
            Environment Variables
        </h1>
        
        <hr/>
        
        <ul>
            <?php
                foreach($_SERVER as $k => $v){
                    echo "<b>" . $k . "</b>: " . $v . "</br>";
                }
                foreach($_ENV as $k => $v){
                    echo "<b>" . $k . "</b>: " . $v . "</br>";
                }
            ?>
        </ul>
    </body>
</html>