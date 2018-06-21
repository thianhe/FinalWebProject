$(document).ready(function() {
    //Database: keyword, price, category
    const gameList = [
        ['arktika', 399, 'action'],
        ['battlefield 4', 599, 'shooter'],
        ['call of duty infinite warfare', 599, 'rpg'],
        ['civilization vi', 899, 'simulation'],
        ['command conquer', 239, 'survival'],
        ['detroit become human', 1899, 'strategy'],
        ['forza horizon 4', 799, 'family'],
        ['racing', 1299, 'sport'],
        ['sea of theives', 1099, 'racing']
    ];

    var value = "",
        genre = "",
        min = 0,
        max = 99999;
    var url = decodeURIComponent(window.location.search.substring(1));
    var variables = url.split('&');

    function filter() {
        var result = [];
        gameList.forEach(function(element) {
            if (element[0].includes(value) && element[1] >= min && element[1] <= max && element[2].includes(genre)) {
                result.push(element[0]);
            }
        });

        $('.card').each(function() {
            $(this).hide();
        });
        result.forEach(function(element) {
            $("div[id*='" + element + "']").show();
        });
    }

    for (var i = 0; i < variables.length; i++) {
        var parameter = variables[i].split('=');
        if (parameter[0] == 'value' && parameter[1] != undefined) {
            value = parameter[1];
        } else if (parameter[0] == 'min' && parameter[1] != undefined) {
            min = parseInt(parameter[1]);
        } else if (parameter[0] == 'max' && parameter[1] != undefined) {
            max = parseInt(parameter[1]);
        } else if (parameter[0] == 'genre' && parameter[1] != undefined) {
            genre = parameter[1];
        }
    }

    $('#searchBox').val(value);
    filter();

    $('#searchBox').on('keyup keypress', function(event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
            $('#submit').attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
            $('#submit').click();
        }
        value = $(this).val().toLowerCase();
        filter();
    });

    $(".price").click(function() {
        min = $(this).attr("min");
        max = $(this).attr("max");
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    });

    $(".genre").click(function() {
        genre = $(this).attr("genre");
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    });

    $('#submit').click(function() {
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    })

    /*load more function */


});