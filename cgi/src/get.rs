use std::io::Write;
use std::env;
use std::collections::btree_map::BTreeMap;

use chrono::{DateTime, Utc};
 
fn write_stderr( msg : String ) {
    let mut stderr = std::io::stderr();
    write!(&mut stderr, "{}", msg).unwrap();
}
 
fn write_stderr_s( msg : &str ) {
    write_stderr( msg.to_string() );
}
 
fn write_stdout( msg : String ) {
    let mut stdout = std::io::stdout();
    write!(&mut stdout, "{}", msg).unwrap();
}
 
fn write_stdout_s( msg : &str ) {
    write_stdout( msg.to_string() );
}
 
fn html_escape( msg : String ) -> String {
    let mut copy : String = String::with_capacity( msg.len() );
 
    for thechar in msg.chars() {
        if thechar == '&' {
            copy.push_str( "&amp;" );
        } else if thechar == '<' {
            copy.push_str( "&lt;" );
        } else if thechar == '>' {
            copy.push_str( "&gt;" );
        } else if thechar == '\"' {
            copy.push_str( "&quot;" );
        } else {
            copy.push( thechar );
        }
    }
 
    return copy;
}
 
fn main() { 
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }
    write_stdout_s("Cache-Control: no-cache\n");
    write_stdout_s("Content-type: text/html\n\n");
    write_stdout_s("<html><head><title>GET query string</title></head>\
      <body><h1 align=center>GET query string</h1>\
        <hr/>\n");
  
    // Get and format query string
    let query = sortedmap.get("QUERY_STRING").unwrap();
    write_stdout(format!("Raw query string: {}\n<br/><br/>", query.clone()));
    write_stdout_s("<table> Formatted Query String:");
    write_stdout_s("</table>");
    for sub_str in query.split('&') {
        if sub_str.contains("=") {
            let split: Vec<&str> = sub_str.split('=').collect();
            write_stdout(format!("<tr><td>{}:</td><td>{}</td></tr>\n", split[0].to_string(), split[1].to_string()));   
        }
    }

    // Print HTML footer  
    write_stdout_s("</body>");
    write_stdout_s("</html>");
}