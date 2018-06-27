$(document).ready(function() {
    //Database column name
    const
        ID = 0,
        NAME = 1,
        PRICE = 2,
        GENRE = 3,
        IMAGE_PATH = 4,
        SELLING_VOLUME = 5,
        URL = 6;

    var value = "",
        genre = "",
        min = 0,
        max = 99999,
        filterType = '';
    var url = decodeURIComponent(window.location.search.substring(1));
    var variables = url.split('&');

    //Database: id, name, price, category, imagepath, sellingvolume
    const gameList = [
        ['arktika', 'Arktika', 399, 'action', './img/arktika.jpg', 20, 'arktika.html'],
        ['battlefield 4', 'Battlefield 4', 599, 'shooter', './img/battlefield.jpg', 30,'battlefield.html'],
        ['call of duty infinite warfare', 'Call of Duty: Infinite Warfare', 599, 'shooter', './img/callofduty.jpg', 40,'Call of Duty_infinitewarefare.html'],
        ['civilization vi', 'Civilization VI', 899, 'simulation', './img/civilization6.jpg', 50,'Civilzation.html'],
        ['command conquer', 'Command & Conquer', 239, 'survival', './img/commandandconquer.jpg', 60,'command_conquer.html'],
        ['detroit become human', 'Detroit: Become Human', 1899, 'strategy', './img/detroit.jpg', 70,'Detroit.html'],
        ['forza horizon 4', 'Forza Horizon 4', 799, 'racing sport', './img/forzahorizon4.jpg', 80, 'forza_horizon.html'],
        ['dark souls remastered', 'Dark souls remastered', 1299, 'action survival', './img/darksoul.jpg', 90,'darksoul.html'],
        ['sea of theives', 'Sea of Theives', 1099, 'survival simulation', './img/seaoftheives.jpg', 100,'sea_of_theive.html'],
        ['heroine_Anthem', 'Heroine_Anthem', 999, 'action', './img/Heroine_Anthem.jpg', 110,'HeroineAnthemZERO.html'],
        ['rise of the Tomb Raider', 'Rise of the Tomb Raider', 799, 'survival action', './img/Raider.jpg', 80,'RiseOfTheTombRaider.html'],
        ['Clash of Cards', 'Clash of Cardsr', 699, 'strategy', './img/Clash of Cards.jpg', 40,'ClashOfCards.html'],
        ['thesims4', 'Thesims4', 499, 'strategy simulation', './img/thesims4.jpg', 30,'thesims4.html'],
        ['hellblade', 'Hellblade', 1299, 'survival action', './img/Hellblade.jpg', 70,'Hellblade.html'],
        ['final fantasy xv', 'Final fantasy xv', 1099, 'rpg action', './img/final fantasy xv.jpg', 60,'final fantasy xv.html'],
        ['watchdog2', 'watchdog2', 1499, 'action', './img/watchdogs2.jpg', 70,'watchdog2.html'],
        ['team Super Sonic', 'Team Super Sonic', 899, 'action', './img/teamsupersonic.jpg', 20,'Team Super Sonic.html'],
        ['unravel', 'Unravel', 599, 'family', './img/unravel2.jpg', 20,'unravel.html'],
    ];

    //Sorting use compartor function
    function sortPriceASC(a, b) {
        if (a[PRICE] < b[PRICE]) return -1;
        if (a[PRICE] > b[PRICE]) return 1;
        return 0;
    }

    function sortPriceDES(a, b) {
        if (a[PRICE] < b[PRICE]) return 1;
        if (a[PRICE] > b[PRICE]) return -1;
        return 0;
    }

    function sortSoldVolume(a, b) {
        if (a[SELLING_VOLUME] < b[SELLING_VOLUME]) return 1;
        if (a[SELLING_VOLUME] > b[SELLING_VOLUME]) return -1;
        return 0;
    }

    function filter() {
        var result = [];
        gameList.forEach(function(game) {
            if (game[ID].includes(value) && game[PRICE] >= min && game[PRICE] <= max && game[GENRE].includes(genre)) {
                result.push(game[0]);
            }
        });

        $('.card').each(function() {
            $(this).hide();
        });
        result.forEach(function(element) {
            $("div[id*='" + element + "']").show();
        });
    }
    /* ********** DECLARETION END ********** */

    /* Generate game card */
    function generateGameCard(gameArray) {
        console.log(gameArray);
        gameArray.forEach(function(game) {
            var html = `
                <div class="game card col-lg-4 col-md-6 col-sm-12" id="` + game[ID] + `" style="display: block;">
                    <a href="` + game[URL] + `">
                        <img class="card-img-top" src="` + game[IMAGE_PATH] + `" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">` + game[NAME] + `</h5>

                            <div class="box float-right">NT$ ` + game[PRICE] + `</div>
                            <div class="box float-right" style="background-color: peru">` + game[SELLING_VOLUME] + ` SOLD</div>
                        </div>
                    </a>
                </div>
            `;
            console.log(html);
            $('#allGame').append(html);
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
    generateGameCard(gameList);
    filter();

    $('#searchBox').on('keyup keypress', function(event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
            $('#submit').attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre + "&filterType=" + filterType);
            $('#submit').trigger("click");
        }
        value = $(this).val().toLowerCase();
        // filter();
    });

    $(".price").on('click', function() {
        min = $(this).attr("min");
        max = $(this).attr("max");
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    });

    $(".genre").on('click', function() {
        genre = $(this).attr("genre");
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    });

    $('#submit').on('click', function() {
        $(this).attr("href", "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre);
    });

    $('#DropdownSelect').on('change', function() {
        var gameArray;
        var selected = $('#DropdownSelect option:selected').val();
        if (selected == 1) {
            gameArray = gameList.sort(sortSoldVolume);
        } else if (selected == 2) {
            gameArray = gameList.sort(sortPriceDES);
        } else if (selected == 3) {
            gameArray = gameList.sort(sortPriceASC);
        } else {
            gameArray = gameList;
        }

        $('#allGame').html('');
        generateGameCard(gameArray);
    });
});