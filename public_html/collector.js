///////get cookie///////
let cookie = decodeURIComponent(document.cookie);
if (cookie == ""){
    setcookie();
} else {
    let cookie_array = cookie.split(';');
    let idname = cookie_array[0].split('=');
    var cookieID = idname[1];
    alert("cookieID:"+cookieID);
}
///////set cookie///////
function setcookie(){
    const id = Date.now().toString(32) + Math.random().toString(32);
    const d = new Date();
    var expiredays = 2;
    d.setTime(d.getTime() + expiredays*24*60*60*1000);
    let cookie_toset = "cookieID=" + id + ";expires=" + d.toUTCString();
    document.cookie = cookie_toset;
    alert("setting cookie:"+cookie_toset);
}
///////performance variables///////
var perfEntries = window.performance.getEntriesByType("navigation");
var timing_obj = perfEntries[0];
var start_time = timing_obj.loadEventStart;
var end_time = timing_obj.loadEventEnd;
var load_time = end_time-start_time;
console.log(load_time);
console.log(start_time);
console.log(end_time);
console.log(timing_obj);
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
    $("#myButton_post").click(function(){
        //performance
        $.post("https://felixwangsd.xyz/api/performance",
        { "cookieID": cookieID, "timing_obj": timing_obj, "start_time":start_time,
         "end_time": end_time, "load_time": load_time
        },
        function(){
            alert("post performance");
        })
        .done(function(cookieID,load_time) {
        alert( "success" + "\ncookieID: " + cookieID + "\nload_time: " + load_time);
        })
        .fail(function(cookieID,load_time) {
        alert( "error" + "\ncookieID: " + cookieID + "\nload_time: " + load_time);
        });
        //static
        $.post("https://felixwangsd.xyz/api/static",
        { "cookieID": cookieID, "language": userLang, "img_enable":img_enable,
         "cookie_enable": cookie_enable, "user_agent": user_agent, "user_screen_height":user_screen_height,
        "user_screen_width":user_screen_width, "user_window_height":user_window_height,
        "user_window_width":user_window_width,"user_conn_type":user_conn_type
        },
        function(){
        })
        .done(function(cookieID,img_enable,user_conn_type) {
        alert( "success" + "\ncookieID: " + cookieID + "\nimg_enable: " + img_enable 
        + "\nuser_conn_type: " + user_conn_type);
        })
        .fail(function(cookieID,img_enable) {
        alert( "error" + "\ncookieID: " + cookieID+ "\nimg_enable: " + img_enable);
        });
    });
    /*$("#myButton_get").click(function(){
        $.get("https://felixwangsd.xyz/api/get/language?cookieID=", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        })
        .fail(function(data, status) {
        alert( "error" + "\nData: " + data + "\nStatus: " + status);
        });
    });*/
});