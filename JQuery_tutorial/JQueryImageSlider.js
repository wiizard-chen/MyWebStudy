$(function () {

    //configuration
    var width = 1280;
    var animationSpeed = 1000;
    var pause = 1000;
    var currentSlide = 1;

    //cache
    var $slider = $('#slider');
    var $sliderContainer = $slider.find('.slides');
    var $sliders = $sliderContainer.find('.slide');

    var interval;

    function startSlider() {
        interval = setInterval(function () {
            $sliderContainer.animate({
                'margin-left': '-=' + width
            }, animationSpeed, function () {
                currentSlide++;
                if (currentSlide === $sliders.length) {
                    currentSlide = 1;
                    $sliderContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }

    function pauseSlider() {
        clearInterval(interval);
    }


    $slider.on('mouseenter', pauseSlider).on('mouseleave', startSlider);

    startSlider();

});