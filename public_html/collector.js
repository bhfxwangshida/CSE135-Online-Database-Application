///////performance variables///////
//var timing_obj = window.performance.timing;
const perfEntries = performance.getEntriesByType("navigation");
const [p_c] = perfEntries;
console.log(p_c.toJSON());
console.log("document load = " + p_c.loadEventStart);

  for (var i=0; i < perfEntries.length; i++) {
    console.log("= Navigation entry[" + i + "]");
    var p = perfEntries[i];
    // dom Properties
    console.log("DOM content loaded = " + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart));
    console.log("DOM complete = " + p.domComplete);
    console.log("DOM interactive = " + p.interactive);

    // document load and unload time
    console.log("document load = " + p.loadEventStart);

    console.log("document load = " + (p.loadEventEnd - p.loadEventStart));
    console.log("document unload = " + (p.unloadEventEnd - p.unloadEventStart));

    // other properties
    console.log("type = " + p.type);
    console.log("redirectCount = " + p.redirectCount);
}

///////static variables///////
var user_agent = navigator.userAgent;
var userLang = navigator.language || navigator.userLanguage;
var cookie_enable = navigator.cookieEnabled;
//var js_enable = 
var img_enable = -1;
//var CSS_enable = 
var user_screen_height = window.screen.height;
var user_screen_width = window.screen.width;
var user_window_height = $(window).height();
var user_window_width = $(window).width();
var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var user_conn_type = conn.effectiveType;
//check user image enable
window.addEventListener("load", event => {
var image = document.querySelector('img');
img_enable = image.complete && image.naturalHeight !== 0;
alert(img_enable);
});



/////////jquery post & get///////////
$(document).ready(function(){
//var session = $('#session').val();
var session = "<%= Session[\"UserName\"]%>"
var timing_obj = 1;
    $("#myButton_post").click(function(){
        //performance
        $.post("https://felixwangsd.xyz/api/performance",
        { "session_id": session, "timing_obj": timing_obj, "start_time":start_time,
         "end_time": end_time, "load_time": load_time
        },
        function(){
            alert("post performance");
        })
        .done(function(session,load_time) {
        alert( "success" + "\nsessionid: " + session + "\nload_time: " + load_time);
        })
        .fail(function(session,load_time) {
        alert( "error" + "\nsessionid: " + session + "\nload_time: " + load_time);
        });
        //static
        $.post("https://felixwangsd.xyz/api/static",
        { "session_id": session, "language": userLang, "img_enable":img_enable,
         "cookie": cookie_enable, "user_agent": user_agent, "user_screen_height":user_screen_height,
        "user_screen_width":user_screen_width, "user_window_height":user_window_height,
        "user_window_width":user_window_width,"user_conn_type":user_conn_type
        },
        function(){
        })
        .done(function(session,img_enable,user_conn_type) {
        alert( "success" + "\nsessionid: " + session + "\nimg_enable: " + img_enable 
        + "\nuser_conn_type: " + user_conn_type);
        })
        .fail(function(session,img_enable) {
        alert( "error" + "\nsessionid: " + session+ "\nimg_enable: " + img_enable);
        });
    });
    /*$("#myButton_get").click(function(){
        $.get("https://felixwangsd.xyz/api/get/language?session=", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        })
        .fail(function(data, status) {
        alert( "error" + "\nData: " + data + "\nStatus: " + status);
        });
    });*/
});

