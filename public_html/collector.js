///////get cookie///////
let cookie = decodeURIComponent(document.cookie);
if (cookie == ""){
    var cookieID = setcookie();
} else {
    let cookie_array = cookie.split(';');
    let idname = cookie_array[0].split('=');
    var cookieID = idname[1];
    //alert("cookieID:"+cookieID);
}
///////set cookie///////
function setcookie(){
    const id = Date.now().toString(32) + Math.random().toString(32);
    const d = new Date();
    var expiredays = 2;
    d.setTime(d.getTime() + expiredays*24*60*60*1000);
    let cookie_toset = "cookieID=" + id + ";expires=" + d.toUTCString();
    document.cookie = cookie_toset;
    //alert("setting cookie:"+cookie_toset);
    return id;
}
///////performance variables///////
var perfEntries = window.performance.getEntriesByType("navigation");
var timing_obj = perfEntries[0];
var start_time = timing_obj.domContentLoadedEventStart;
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
//window.addEventListener("load", event => {
var im = document.getElementById("pepper");
//var image = document.querySelector('assets/img/favicon.jpeg');
img_enable = im.complete; //&& im.naturalHeight !== 0;
console.log(img_enable);
//});

///////activity variables///////
var idleTime = 0;
var idles = [];

setInterval(function(){
    idleTime += 500;
}, 500);


document.onmousemove = handleMouseMove;
document.onmousedown = handleMouseClick;
document.onscroll = handleMouseScroll;
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
window.onbeforeunload = handleUnload;
window.onload = handleLoad;
var pageLoad = new Date().getTime();
var pageName = window.location.pathname;
var pageUnload;
var mousePos = [];
var mouseClick = [];
var mouseScroll = [];
var keyDown = [];
var keyUp = [];
function handleUnload() {
    pageUnload = new Date().getTime();
}
function recordIdle(){
    if (idleTime > 2000) {
        idles.push({"idleEndAt": new Date().getTime(), "Idlelasts": idleTime});
    }
    idleTime = 0;
}
function handleKeyDown(event) {
    recordIdle();

    keyDown.push({
        key: event.key,
        keyCode: event.keyCode,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        timestamp: event.timeStamp
      })
}

function handleKeyUp(event) {
    recordIdle();
    keyUp.push({
        key: event.key,
        keyCode: event.keyCode,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        timestamp: event.timeStamp
      })
}

function handleMouseClick(event) {
    recordIdle();
    var event = event || window.event;

    if (event.button == 0) {
        var click = {
            "timestamp": event.timeStamp,
            "button": "Left"
        };
        mouseClick.push(click);
    } else if (event.button == 2) {
        var click = {
            "timestamp": event.timeStamp,
            "button": "Right"
        };
        mouseClick.push(click);
    } else if (event.button == 1) {
        var click = {
            "timestamp": event.timeStamp,
            "button": "Middle"
        };
        mouseClick.push(click);
    } else {
        var click = {
            "timestamp": event.timeStamp,
            "button": "Others"
        };
        mouseClick.push(click);
    }
}

function handleMouseScroll(event) {
    recordIdle();

    event = event || window.event; // IE-ism
    var doc = document.documentElement;
var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    var point = {
        "scrollTop": top,
        "scrollLeft": left,
        "timestamp": event.timeStamp
    };
    mouseScroll.push(point);
}

function handleMouseMove(event) {
    recordIdle();
    var eventDoc, doc, body;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y
    // are, calculate pageX/Y - logic taken from jQuery
    // Calculate pageX/Y if missing and clientX/Y available
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    var point = {
        "x": event.pageX,
        "y": event.pageY,
        "timestamp": event.timeStamp
    };
    mousePos.push(point);
} 

function handleLoad() {

        //performance
        $.post("https://felixwangsd.xyz/api/performance",
        { "cookieID": cookieID, "timing_obj": JSON.stringify(timing_obj), "start_time":start_time,
         "end_time": end_time, "load_time": load_time
        },
        function(){
            //alert("post performance");
        })
        .done(function(cookieID,load_time) {
        //alert( "success" + "\ncookieID: " + cookieID + "\nload_time: " + load_time);
        })
        .fail(function(cookieID,load_time) {
        //alert( "error" + "\ncookieID: " + cookieID + "\nload_time: " + load_time);
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
        //alert( "success" + "\ncookieID: " + cookieID + "\nimg_enable: " + img_enable + "\nuser_conn_type: " + user_conn_type);
        })
        .fail(function(cookieID,img_enable) {
        //alert( "error" + "\ncookieID: " + cookieID+ "\nimg_enable: " + img_enable);
        });

}


/////////jquery post & get///////////
$(document).ready(function(){
    $("#myButton_post").click();
});

setInterval(function() {$.post("https://felixwangsd.xyz/api/activity",
{ 
    "cookieID": cookieID,
    "mousePos": JSON.stringify(mousePos),
    "mouseScroll": JSON.stringify(mouseScroll),
    "mouseClick": JSON.stringify(mouseClick),
    "keyDown": JSON.stringify(keyDown),
    "keyUp": JSON.stringify(keyUp),
    "pageLoadTime": pageLoad,
    "pageUnloadTime": pageUnload,
    "curPage": pageName,
    "idle":JSON.stringify(idles)


})
.done(function() {
    mousePos = [];
    mouseScroll = [];
    mouseClick = [];
    keyDown = [];
    keyUp = [];
    idles = [];
})
.fail(function() {
    mousePos = [];
    mouseScroll = [];
    mouseClick = [];
    keyDown = [];
    keyUp = []; 
    idles = [];
})
}, 10000)







