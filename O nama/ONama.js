$(function (){
    $('.ancor').click( function(){
        $('.qoute').find('p').removeClass("animation")
        setTimeout(() => {
            $('.qoute').find('p').addClass("animation")
        }, 100);
    })
})