<?php
    $name= $_POST["username"];
    if(!is_null($name)){
        setcookie("cookie", $name, time() + 3600);
    }
?>
<html>
    <head>
        <title>PHP Sessions</title>
    </head>
    <body>
        <h1 align=center>PHP Sessions Page 1</h1>
        <hr/>
        <p>
            <b>Name:</b>
            <?php
                if(!is_null($name)){
                    echo "<p><b>Name:</b>" . $name;
                }else{
                    echo "<p><b>Name:</b> You do not have a name set</p>";
                }
                
            ?>
        </p>
        
        <a href="/cgi-bin/php-sessions-2.php">Session Page 2</a>
        <a href="/php-cgiform.html">CGI Form</a><br />
        <form style="margin-top:30px" action="/cgi-bin/php-destroy-session.php" method="get">
            <button type="submit">Destroy Session</button>
        </form>
    </body>
</html>