<html>
    <head>
        <title>PHP Sessions</title>
    </head>
    <body>
        <h1 align=center>PHP Sessions Page 2</h1>
        <hr/>
            <p>
                <?php
                    $username=$_COOKIE['username'];
                    echo "<p><b>Name:</b>" . $username;
                    
                ?>
            </p>
        
        <a href="/cgi-bin/php-sessions-1.php">Session Page 1</a><br />
        <a href="/php-cgiform.html">CGI Form</a><br />
        <form style="margin-top:30px" action="/cgi-bin/php-destroy-session.php" method="get">
            <button type="submit">Destroy Session</button>
        </form>
    </body>
</html>