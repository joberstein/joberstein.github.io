jQuery(document).ready(function($) {
    $('.sideways-arrow').click(function() {
        if ($('.nav-menu').hasClass('collapsed')) {
            openNavMenu();
        }
        else {
            closeNavMenu();
        }
    });

    window.openNavMenu = function() {
       $('.nav-boxes').show();
       $('.nav-boxes').animate({width: ["100%", "easeOutBounce"]}, 1000, function () {
            $('.sideways-arrow').attr('src', "img/collapse-sideways.png");
        });
        $('.nav-menu').removeClass('collapsed');
    };

    window.closeNavMenu = function() {
        $('.nav-boxes').delay(800).animate({width: ["0", "easeOutBounce"]}, 1000, function() {
            $('.sideways-arrow').attr('src', "img/expand-sideways.png");
            $('.nav-boxes').hide();
        });
        $('.nav-menu').addClass('collapsed');
    };

    $(".nav-box").hover(function() {
        $(this).append("<div class='alpha-overlay'></div>");
    }, function() {
        $(this).children('div.alpha-overlay').remove();
    });
});