//<script type="text/javascript">
  var user_agent = navigator.userAgent;
  var userLang = navigator.language || navigator.userLanguage;
  var cookie_enable = navigator.cookieEnabled;
  //var js_enable = 
  var img_enable = -1;
  //var CSS_enable = 
  //var user_screen_dim = 
  //var user_window_dim = 
  //var user_conn_type = 
  window.addEventListener("load", event => {
    var image = document.querySelector('img');
    img_enable = image.complete && image.naturalHeight !== 0;
    alert(img_enable);
  });
  $(document).ready(function(){
    //var session = $('#session').val();
    var session = "<%= Session[\"UserName\"]%>"
    $("#myButton_post").click(function(){
      //alert(userLang);
      $.post("https://felixwangsd.xyz/api/static",
      { "session_id": session, "language": userLang, "img_enable":img_enable },
      function(data, status, session){
        alert("Data: " + data + "\nStatus: " + status + "\nsessionid: " + session);
      })
      .done(function(session,img_enable) {
        alert( "second success" + "\nsessionid: " + session + "\nimg_enable: " + img_enable);
      })
      .fail(function(session,img_enable) {
        alert( "error" + "\nsessionid: " + session+ "\nimg_enable: " + img_enable);
      });
    });
    $("#myButton_get").click(function(){
      $.get("https://felixwangsd.xyz/api/get/language?session=", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      })
      .fail(function(data, status) {
        alert( "error" + "\nData: " + data + "\nStatus: " + status);
      });
    });
  });
//</script>