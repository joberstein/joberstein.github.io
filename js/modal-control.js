jQuery(document).ready(function($) {
    $('.open').click(function () {
        $('body').addClass('modal-open');
    });

    $('.close').click(function () {
        $('body').removeClass('modal-open');
    });
});