jQuery(document).ready(function($) {
    var currentSection;
    var NAV_SCROLL_ANIMATION_TIME = 1000;
    var logoDiv = $('.moving-head-bar').children('.logo-container');
    var DARK_BLUE_RGB = "rgb(0, 102, 153)";
    var DARK_RED_RGB = "rgb(194, 43, 11)";

    determineClosestSection();
    colorCorrectSection();
    stickCorrectSectionToTop($(currentSection));

    // Smooth scroll to the welcome page when the logo is clicked.
    $(document).on('click', '.logo', function() {
        animateNavigationScroll($('.welcome-head-bar').parent());
    });

    // On scroll, the text in the header bar changes according to section.
    $(window).on('scroll', function(ev) {
        currentSection = determineClosestSection();
        colorCorrectSection();
        stickCorrectSectionToTop($(currentSection));
    });

    // Smooth scroll to the corresponding section in the nav bar that was clicked.
    $('.nav-box').click(function(ev) {
        ev.preventDefault();
        var anchor = $(this).children('a');
        animateNavigationScroll($(anchor).attr('href'), window.closeNavMenu);
    });

    // On hover, change the color of the nav menu item that links to each section.
    $('.nav-move-link').hover(function() {
        $(this).css("color", "#D13C3C");
    }, function(ev) {
        if ($(this).attr('href') == getSectionHref(currentSection)) {
            ev.preventDefault();
        }
        else {
            $(this).css("color", '#06C');
        }
    });

    function animateNavigationScroll(section, callback) {
        $('html, body').animate({
            scrollTop: $(section).offset().top + Math.abs(($(section)[0]).offsetTop)
        }, NAV_SCROLL_ANIMATION_TIME, function() {
            if (callback && typeof(callback) === "function") {
                callback();
            }
        });

        return false;
    }

    function determineClosestSection() {
        var closest = 3000;
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;

        $('.section').map(function() {
            var currentDistance = scrollTop - getVerticalOffsetRect(this);

            if (currentDistance >= 0 && currentDistance <= closest) {
                currentSection = this;
                closest = currentDistance;
            }
        });
        return currentSection;
    }

    function getVerticalOffsetRect(elem) {
        var box = elem.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var top  = box.top + scrollTop - clientTop;

        return Math.round(top);
    }

    function getSectionHref(section) {
        return "#" + $(section).children("a").attr('id');
    }

    function stickCorrectSectionToTop(section) {
        var welcomeHeadBar = section.children('.welcome-head-bar');
        var headBar = section.children('.head-bar');
        var numberLogoDivsFound = $('.moving-head-bar').find('.logo-container').length;

        if ($(welcomeHeadBar).is($('.welcome-head-bar'))) {
            var welcomeHeadText = $(welcomeHeadBar).find('p').text();
            var textBox = $('.moving-head-bar').children('.center').children('p');

            $(textBox).text(welcomeHeadText);

            if ($(textBox).hasClass('page-head')) {
                $(textBox).removeClass('page-head');
            }
            if (numberLogoDivsFound > 0) {
                $(logoDiv).remove();
            }
            $(textBox).addClass('welcome-head');
            return;
        }

        $('.head-bar').each(function(bar) {
            if ($(headBar).is($(this))) {
                var headText = $(headBar).find('p').text();
                var textBox = $('.moving-head-bar').children('.center').children('p');

                $(textBox).text(headText);

                if ($(textBox).hasClass('welcome-head')) {
                    $(textBox).removeClass('welcome-head');
                }
                if (numberLogoDivsFound == 0) {
                    $('.moving-head-bar').append($(logoDiv));
                }
                $(textBox).addClass('page-head');
                return;
            }
        });
    }

    function colorCorrectSection() {
        $('.section').each(function() {
            if (getSectionHref(currentSection) === getSectionHref(this)) {
                $(".nav-move-link[href=" + getSectionHref(this) + "]").parent().css("background", DARK_RED_RGB);
            }
            else {
                $(".nav-move-link[href=" + getSectionHref(this) + "]").parent().css("background", DARK_BLUE_RGB);
            }
        });
    }
});