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



    // Headers
    write_stdout_s("Cache-Control: no-cache\n");
    write_stdout_s("Set-Cookie: destroyed\n");
    write_stdout_s("Content-type: text/html\n\n");
  
    // Body - HTML
    write_stdout_s("<html>");
    write_stdout_s("<head><title>Rust Session Destroyed</title></head>");
    write_stdout_s("<body>");
    write_stdout_s("<h1>Rust Session Destroyed</h1>");
  
    // Links
    write_stdout_s("<a href=\"/cgi-bin/rust-sessions-1\">Back to Page 1</a>");
    write_stdout_s("<br />");
    write_stdout_s("<a href=\"/cgi-bin/rust-sessions-2\">Back to Page 2</a>");
    write_stdout_s("<br />");
    write_stdout_s("<a href=\"/rust-cgiform.html\">C CGI Form</a>");
  
    write_stdout_s("</body>");
    write_stdout_s("</html>");

    Ok(())  
}