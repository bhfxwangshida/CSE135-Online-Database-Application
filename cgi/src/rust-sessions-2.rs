use std::io::{Write, self, Read};
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

    let mut buffer = Vec::new();
    io::stdin().read(&mut buffer)?;
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }
 

    write_stdout_s("Cache-Control: no-cache\n");
    write_stdout_s("Content-type: text/html\n\n");
  
    // Body - HTML
    write_stdout_s("<html>");
    write_stdout_s("<head><title>Rust Sessions</title></head>\n");
    write_stdout_s("<body>");
    write_stdout_s("<h1>Rust Sessions Page 2</h1>");
    write_stdout_s("<table>");
  

    if sortedmap.get("HTTP_COOKIE").is_some() && sortedmap.get("HTTP_COOKIE").unwrap() != "destroyed" {
            write_stdout(format!("<tr><td>Cookie:</td><td>{}</td></tr>\n", sortedmap.get("HTTP_COOKIE").unwrap()));
    } else {
        write_stdout_s("<tr><td>Cookie:</td><td>None</td></tr>\n");
    }
  
    write_stdout_s("</table>");
  
    // Links for other pages
    write_stdout_s("<br />");
    write_stdout_s("<a href=\"/cgi-bin/rust-sessions-1\">Session Page 1</a>");
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