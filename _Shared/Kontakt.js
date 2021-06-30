$(function() {
  kontakt();
});

let kontakt = function() {
  $("#kontakt").click(function() {
    $(".kontakt").dialog({
      modal: true,
      height: chkHeight(),
      width: chkWidth(),
      resizable: false,
      draggable: false,
      show: {
        effect: "fade",
        duration: 300
      },
      hide: {
        effect: "fade",
        duration: 300
      }
    });
    $(".ui-dialog-titlebar").hide();

    $("[type=reset]").click(function() {
      $(".kontakt").dialog("close");
    });
  });
};

let chkWidth = function() {
  if ($(window).width() < 768) {
    return 300;
  }
  else if ($(window).width() <= 1200) {
    return 700;
  }
  else if ($(window).width() > 1200) {
    return 1000;
  }
};

let chkHeight = function(){
    if ($(window).height() < 825) {
        return 500
    }
    else{
        return 700
    }
}
