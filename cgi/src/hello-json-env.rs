use std::io::Write;
use std::env;
use std::time::SystemTime;
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
    let now: DateTime<Utc> = Utc::now();
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }
    write_stdout_s("Cache-Control: no-cache\n");
    write_stdout_s("Content-type: application/json\n\n");
    write_stdout_s("{\n\t\"message\": \"Hello World\",\n");

    write_stdout(format!("\t\"date\": \"{}\",\n", now.format("%a %b %e %T %Y")));
    write_stdout(format!("\t\"currentIP\": \"{}\"\n }}\n", sortedmap.get("REMOTE_ADDR").unwrap()))
    /*
    let now: DateTime<Utc> = Utc::now();
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }
    write_stdout_s("Cache-Control: no-cache\n");
    write_stdout_s("Content-type: application/json\n\n");
    write_stdout_s("{\n\t\"message\": \"Hello World\",\n");

    write_stdout(format!("\t\"date\": \"{}\",\n", now.format("%a %b %e %T %Y")));
    write_stdout(format!("\t\"currentIP\": \"{}\"\n }}\n", sortedmap.get("REMOTE_ADDR").unwrap()));



    
    write_stdout_s( "Content-type: text/html\n" );
    write_stdout_s( "\n" );
    write_stdout_s( "<html>\n" );
    write_stdout_s( "  <head>\n" );
    write_stdout_s( "    <title>Rust CGI Test</title>\n" );
    write_stdout_s( "    <style type=\"text/css\">\n" );
    write_stdout_s( "      td { border:1px solid black; }\n" );
    write_stdout_s( "      td { font-family:monospace; }\n" );
    write_stdout_s( "      table { border-collapse:collapse; }\n" );
    write_stdout_s( "    </style>\n" );
    write_stdout_s( "  </head>\n" );
    write_stdout_s( "  <body>\n" );
    write_stdout_s( "    <h1>Environment</h1>\n" );
    write_stdout_s( "    <table>\n" );
    write_stdout_s( "      <tr><th>Key</th><th>Value</th></tr>\n" );
 
    // copy environment into a BTreeMap which is sorted
    let mut sortedmap : BTreeMap<String,String> = BTreeMap::new();
    for (key, value) in env::vars() {
        sortedmap.insert( key, value );
    }
 
    // output environment into HTML table
    for (key, value) in sortedmap {
        write_stdout(
            format!(
                "      <tr><td>{}</td><td>{}</td></tr>\n",
                html_escape( key ),
                html_escape( value )
            )
        );
    }
    write_stdout_s( "    </table>\n" );
    write_stdout_s( "  </body>\n" );
    write_stdout_s( "</html>\n" ); */
}