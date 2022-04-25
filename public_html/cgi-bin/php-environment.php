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
                $_ENV=getenv();
                foreach($_ENV as $k => $v){
                    echo "<b>" . $k . "</b>: " . $v . "</br>";
                }
            ?>
        </ul>
    </body>
</html>