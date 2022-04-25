use std::io::{Write, self, Read, BufRead};
use std::env;
use std::collections::btree_map::BTreeMap;
 
fn write_stdout( msg : String ) {
    let mut stdout = std::io::stdout();
    write!(&mut stdout, "{}", msg).unwrap();
}
 
fn write_stdout_s( msg : &str ) {
    write_stdout( msg.to_string() );
}

 
fn main() -> io::Result<()>{ 

    let mut name = String::new();
    let stdin = io::stdin();
    stdin.lock().read_line(&mut name).unwrap();
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }

    // Headers
    write_stdout_s("Cache-Control: no-cache\n");

    // Get Name from Environment

    // Check to see if a proper name was sent
    let mut s = name;
    if s.starts_with("username") {
        s = s[9..].to_string();
    }
    

    // Set the cookie using a header, add extra \n to end headers
    if s.len() >= 0 {
        write_stdout_s("Content-type: text/html\n");
        write_stdout(format!("Set-Cookie: {:?}\n\n", s));
    } else {
        write_stdout_s("Content-type: text/html\n\n");
    }

    // Body - HTML
    write_stdout_s("<html>");
    write_stdout_s("<head><title>Rust Sessions</title></head>\n");
    write_stdout_s("<body>");
    write_stdout_s("<h1>Rust Sessions Page 1</h1>");
    write_stdout_s("<table>");

    // First check for new Cookie, then Check for old Cookie
    if s.len() > 0 {
        write_stdout(format!("<tr><td>Cookie:</td><td>{:?}</td></tr>\n", s));
    } else if sortedmap.get("HTTP_COOKIE").is_some() && sortedmap.get("HTTP_COOKIE").unwrap() != "destroyed" {
            write_stdout(format!("<tr><td>Cookie:</td><td>{}</td></tr>\n", sortedmap.get("HTTP_COOKIE").unwrap()));
    } else {
        write_stdout_s("<tr><td>Cookie:</td><td>None</td></tr>\n");
    }

    write_stdout_s("</table>");

    // Links for other pages
    write_stdout_s("<br />");
    write_stdout_s("<a href=\"/cgi-bin/rust-sessions-2\">Session Page 2</a>");
    write_stdout_s("<br />");
    write_stdout_s("<a href=\"/rust-cgiform.html\">Rust CGI Form</a>");
    write_stdout_s("<br /><br />");

    // Destroy Cookie button
    write_stdout_s("<form action=\"/cgi-bin/rust-destroy-session\" method=\"get\">");
    write_stdout_s("<button type=\"submit\">Destroy Session</button>");
    write_stdout_s("</form>");

    write_stdout_s("</body>");
    write_stdout_s("</html>");

    Ok(())  
}