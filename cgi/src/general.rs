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
    write_stdout_s("<html><head><title>General Request Echo</title></head> \
      <body><h1 align=center>General Request Echo</h1> \
        <hr/>\n");
  
    // Get environment vars
    write_stdout_s("<table>\n");
    write_stdout(format!("<tr><td>Protocol:</td><td>{}</td></tr>\n", sortedmap.get("SERVER_PROTOCOL").unwrap()));
    write_stdout(format!("<tr><td>Method:</td><td>{}</td></tr>\n", sortedmap.get("REQUEST_METHOD").unwrap()));
    write_stdout(format!("<tr><td>Message Body:</td><td> {:?}</td></tr>\n", buffer));
    
    // Print HTML footer
    write_stdout_s("</body>");
    write_stdout_s("</html>");

    Ok(()) 
}