$(document).ready(function () {
    var $page = $("#artists");
    var $content = $page.children(":jqmData(role=content)");
    var template = '<li><a href="#artistinfo?name={name}"><img src="images/Artists/{image}"><h2>{name}</h2><p>{venue}</p></a></li>';

    var markup = '<ul data-role="listview" data-inset="true">';
    for (var artistName in artists) {
        markup += template.replace(/{name}/g, artistName).replace("{venue}", artists[artistName].v).replace("{image}", artists[artistName].i);
    }
    markup += '</ul>';
    $content.html(markup);
    //$page.page();
    //$content.find(":jqmData(role=listview)").listview();
});

$(document).bind("pagebeforechange", function (e, data) {
    if (typeof data.toPage === "string") {
        var u = $.mobile.path.parseUrl(data.toPage);
        if (u.hash.search(/^#artistinfo/) !== -1) {
            showArtist(u, data.options);
            e.preventDefault();
        }
    }
});

function showArtist(urlObj, options) {
    var artistName = urlObj.hash.replace(/.*name=/, ""),
        artist = artists[artistName],
        pageSelector = urlObj.hash.replace(/\?.*$/, ""),
        template = '<img src="images/Artists/Big/{image}" />';

    if (artist) {
        var $page = $(pageSelector),
            $header = $page.children(":jqmData(role=header)"),
            $content = $page.children(":jqmData(role=content)"),
            markup = template.replace("{image}", artist.i);

        $header.find("h1").html(artistName);
        $content.html(markup);

        $page.page();
        options.dataUrl = urlObj.href;
        $.mobile.changePage($page, options);
    }
}