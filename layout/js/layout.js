$(document).ready(function(){
  
  var headerFile = "layout_header.html";
  // var navFile = "layout_menu.html";
  
  if( $("#header").text().length) {
    headerFile = $("#header").text();
  }
  
  // if( $("").text().length) {
  //   navFile = $("#navigation").text();
  // }

  if($("#menu-section").length){
    $("#menu-section").load("../guide/layout_menu.html");
  }
  
  $("#header").load("../layout/" + headerFile);
  // $("#navigation").load("../layout/" + navFile);
  if($("#footer").length){
    $("#footer").load("../layout/layout_footer.html");
  }
  
})

