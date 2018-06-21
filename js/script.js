$(document).ready(function() {
    var $select1 = $('#select1'),
        $select2 = $('#select2'),
        $options = $select2.find('option');

    $select1.on('change', function() {
        $select2.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');


    $('#carouselExample').on('slide.bs.carousel', function(e) {

        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                } else if (e.direction == "right") {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });


});