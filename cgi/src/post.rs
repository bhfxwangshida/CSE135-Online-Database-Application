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
    write_stdout_s("<html><head><title>POST query string</title></head>\
      <body><h1 align=center>POST query string</h1>\
        <hr/>\n");
  
    // Get and format query string
    let query = sortedmap.get("QUERY_STRING").unwrap();
    write_stdout(format!("Raw query string: {}\n<br/><br/>", query.clone()));
    write_stdout_s("<table> Formatted Query String:");
    write_stdout_s("</table>");
    write_stdout(format!("Message Body: {:?}\n<br/>", buffer));

    // Print HTML footer  
    write_stdout_s("</body>");
    write_stdout_s("</html>");

    Ok(()) 
}