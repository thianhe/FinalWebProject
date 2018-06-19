$(document).ready(function() {
    var $select1 = $('#select1'),
        $select2 = $('#select2'),
        $options = $select2.find('option');

    $select1.on('change', function() {
        $select2.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');

    var countries = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // url points to a json file that contains an array of country names, see
        // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
        prefetch: '../data/countries.json'
    });

    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.typeahead').typeahead(null, {
        name: 'countries',
        source: countries
    });
});