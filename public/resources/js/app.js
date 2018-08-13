function getUrlVars() {
    var vars = [],
        hash;
    var hashes = decodeURIComponent(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
// function VisitCountryClick(cb) {
//     alert(cb.checked);

// }

jQuery(document).ready(function () {


    
    //var str = $("#visitedCC").val().replace('&#34;','"');
    //var VisitedCC = Array(str);
    //VisitedCC.push(str);
    // alert(VisitedCC);
    // if(Array.isArray( VisitedCC)){
    //     //alert(JSON.stringify(VisitedCC));
    //     alert(str);
    // }

    var lists = {
        africa: ["AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "DJ", "DZ", "EG", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "KE", "LR", "LS", "LY", "MA", "MU", "MG", "ML", "MR", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SD", "SL", "SN", "SO", "SS", "SZ", "TD", "TG", "TN", "TZ", "UG", "ZA", "ZM", "ZW", "EH", "KM", "GO", "JU", "SH", "ST", "YT", "BV", "CV", "SC"],
        asia: ["AE", "AF", "BD", "BN", "IO", "BT", "CN", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MO", "MM", "MN", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SY", "TH", "TJ", "TL", "TM", "TW", "UZ", "VN", "YE", "HK", "MV", "BH", "SG"],
        europe: ["AL", "AM", "AT", "AZ", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "JE", "FI", "FR", "GB", "GE", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MD", "ME", "MK", "NL", "NO", "PL", "PT", "RO", "RS", "SE", "SI", "SJ", "SK", "TR", "UA", "RU", "VA", "MT", "MC", "XK", "LI", "IM", "GI", "FO", "AD", "AX", "GG", "SM"],
        northAmerica: ["BS", "BZ", "CA", "CR", "CU", "DO", "GL", "GT", "HN", "HT", "JM", "MX", "NI", "PA", "PR", "SV", "US", "AG", "AW", "BB", "BL", "GD", "KN", "LC", "MQ", "TC", "VG", "AI", "BM", "DM", "PM", "GP", "KY", "MF", "MS", "SX", "TT", "VC", "VI", "BQ", "CW"],
        southAmerica: ["AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"],
        oceania: ["AS", "AU", "UM-FQ", "CC", "CX", "FJ", "FM", "GU", "HM", "UM-HQ", "UM-DQ", "UM-JQ", "KI", "MH", "UM-MQ", "MP", "NC", "NF", "NR", "NU", "NZ", "PG", "PW", "SB", "TF", "TK", "TL", "TO", "TV", "VU", "UM-WQ", "WF", "WS", "CK", "PF", "PN"]
    };
    var names = {};
    map = AmCharts.makeChart("mapdiv", {
        hideCredits: true,
        type: "map",
        theme: "app",
        addClassNames: true,
        zoomDuration: 0,
        backgroundColor: "#535364",
        backgroundAlpha: 1,
        projection: "mercator",
        zoomControl: {
            zoomControlEnabled: true
        },
        dataProvider: {
            map: "worldHigh",
            getAreasFromMap: true,
            areas: []
        },
        areasSettings: {
            autoZoom: false,
            selectable: true
        }
    });
    map.addListener("clickMapObject", function (event) {
        var CC = event.mapObject.id;
        var checkbox = jQuery("input[value=" + CC + "]");
        var anchor = jQuery(checkbox).parents(".tab-pane").attr("id");
        var mapObject = event.mapObject;
        map.selectedObject = map.dataProvider;
        mapObject.showAsSelected = !mapObject.showAsSelected;
        map.returnInitialColor(mapObject);
        checkbox[0].checked = event.mapObject.showAsSelected;
        jQuery(".section-map-list .nav-tabs [data-anchor=" + anchor + "]").tab("show");


    });
    map.updateSelection = function (gatherOnly) {
        var areas = [];
        jQuery(".section-map-list input:checked").each(function () {
            var CC = this.value;
            //alert(CC);
            areas.push({
                id: CC,
                showAsSelected: true
            });
        });
        if (!gatherOnly) {
            map.dataProvider.areas = areas;
            map.validateData();
            map.updateHash();
        }
        return areas;
    }
    map.updateHash = function () {
        var inputs = jQuery(".section-map-list input:checked");
        location.hash = jQuery.map(inputs, function (input) {
            return input.value
        }).join(",");
        //alert(location.hash);
    }

    jQuery(AmCharts.maps.worldHigh.svg.g.path).each(function () {
        if (this.title !== undefined)
            names[this.id] = this.title.replace(/x28/g, '(').replace(/x29/g, ')').replace(/x2C/g, ',');
    });
    jQuery(".section-map-list").each(function () {

        jQuery.map(lists, function (list, name) {
            var tbody = jQuery("#" + name).find("tbody");
            list.sort(function (x, y) {
                var a = names[x].toLowerCase(),
                    b = names[y].toLowerCase();
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
                return 0;
            });
            jQuery(list).each(function () {
                var CC = String(this);
                var row = jQuery("<tr>").appendTo(tbody);
                var col = jQuery("<td>").appendTo(row);
                var lnk = jQuery("<a>").appendTo(col).attr({href: "#fadeandscale"}).addClass("initialism fadeandscale_open");
                var div = jQuery("<div>").appendTo(lnk).addClass("checkbox");
                var label = jQuery("<label>").appendTo(div).text(names[CC]);
                var checkbox = jQuery("<input>").attr({
                    type: "checkbox",
                    name: "map",
                    value: this,
                }).prependTo(label);
                row.on("click", function () {
                    // console.log(VisitedCC.indexOf(CC));
                    // if(VisitedCC.indexOf(CC) != -1){
                    //     console.log(CC);
                    // }

                    checkbox.trigger("click");
                    //alert('clicked');
                    $("#CountryCodeHiddenText").val(CC);
                    map.updateSelection();
                    //checkbox.checked=false;
                });
            });
        });
    });

    
    // jQuery(".checkbox").on("click", function (e) {
    //     e.preventDefault();
    //     alert(.val());
    //     map.updateSelection();

    // });

    jQuery(".btn-settings-reset").on("click", function (e) {
        e.preventDefault();
        alert('Please wait for next release...');
    });
    if (location.hash || getUrlVars()["cc"]) {
        var areas = (getUrlVars()["cc"] ? getUrlVars()["cc"] : location.hash).replace("#", "").split(",");
        //var areas = VisitedCC.split(",");
        //console.log(areas);
        jQuery(areas).each(function () {

            jQuery(".section-map-list input[value=" + this + "]").prop("checked", true);
        });
        map.updateSelection();
    }


    var resizeTimer = 0;
    jQuery(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (jQuery(window).width() <= 480) {
                jQuery(".form-control").addClass("input-lg");
            } else {
                jQuery(".form-control").removeClass("input-lg");
            }
        }, 100);
    });

});

