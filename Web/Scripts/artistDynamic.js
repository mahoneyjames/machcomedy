$(document).bind("pagebeforechange", function (e, data) {
    if (typeof data.toPage === "string") {
        var u = $.mobile.path.parseUrl(data.toPage);
        if (u.hash.search(/^#artist/) !== -1) {
            showArtist(u, data.options);
            e.preventDefault();
        }
    }
});

function showArtist(urlObj, options) {
    var artistName = urlObj.hash.replace(/.*name=/, ""),
        artist = artistData[artistName],
        pageSelector = urlObj.hash.replace(/\?.*$/, "");

    if (artist) {
        var $page = $(pageSelector),
            $header = $page.children(":jqmData(role=header)"),
            $content = $page.children(":jqmData(role=content)"),
            markup = "<p>" + artist.description + "</p><ul data-role='listview' data-inset='true'>",
            cItems = artist.items,
            numItems = cItems.length;

        for (var i = 0; i < numItems; i++) {
            markup += "<li>" + cItems[i].name + "</li>";
        }
        markup += "</ul>";

        $header.find("h1").html(artist.name);

        $content.html(markup);

        // Pages are lazily enhanced. We call page() on the page
        // element to make sure it is always enhanced before we
        // attempt to enhance the listview markup we just injected.
        // Subsequent calls to page() are ignored since a page/widget
        // can only be enhanced once.
        $page.page();

        // Enhance the listview we just injected.
        $content.find(":jqmData(role=listview)").listview();

        // We don't want the data-url of the page we just modified
        // to be the url that shows up in the browser's location field,
        // so set the dataUrl option to the URL for the artist
        // we just loaded.
        options.dataUrl = urlObj.href;

        // Now call changePage() and tell it to switch to
        // the page we just modified.
        $.mobile.changePage($page, options);
    }
}