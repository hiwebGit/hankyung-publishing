$(document).ready(function () {

  var headerFile = "layout_header.html";
  // var navFile = "layout_menu.html";

  if ($("#header").text().length) {
    headerFile = $("#header").text();
  }

  // if( $("").text().length) {
  //   navFile = $("#navigation").text();
  // }

  if ($("#menu-section").length) {
    $("#menu-section").load("../guide/layout_menu.html");
  }

  $("#header").load("../layout/" + headerFile);
  // $("#navigation").load("../layout/" + navFile);
  if ($("#footer").length) {
    $("#footer").load("../layout/layout_footer.html");
  }

  if ($(".reply-wrap").length) {
    $(".reply-wrap").load("../html/common_reply.html .content > div", function () {
      if ($('[data-pop-open=popupReplyPolicy]').length) {
        $("<div class='pop-reply'>/div>").appendTo(".wrap");
        $('.pop-reply').load("../html/PW_I_ON_CP_10_00.html .pop-wrap");
      }
    });
  }
})