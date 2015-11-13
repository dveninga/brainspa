/*
|--------------------------------------------------------------------------
| GOOGLE MAP
|--------------------------------------------------------------------------
*/



function initialize(id) {
    "use strict";
    var page = window.location.pathname.toLowerCase().replace(/\//g, ''),
        image = '/assets/img/icon-map.png',
        overlayTitle = 'MariënburgGroep',
        locations = [];

    if (page !== 'agenda') {

        locations = [
            ['MariënburgGroep', 'Burgemeester Roelenweg 33<br/>8031 ES Zwolle<br/><a href="https://goo.gl/maps/yEiAV" target="external-link">routebeschrijving</a>', 52.5175303, 6.0836402]
        ];

    } else {

        locations = [
            ['Trainingslocatie', 'Amersfoort'],
            ['Trainingslocatie', 'Arnhem'],
            ['Trainingslocatie', 'Breukelen'],
            ['Trainingslocatie', 'Den Bosch'],
            ['Trainingslocatie', 'Eindhoven'],
            ['Trainingslocatie', 'Elst'],
            ['Trainingslocatie', 'IJsselstein (Utrecht)'],
            ['Trainingslocatie', 'Rotterdam'],
            ['Trainingslocatie', 'Utrecht'],
            ['Trainingslocatie', 'Vianen'],
            ['Trainingslocatie', 'Weesp'],
            ['Trainingslocatie', 'Zwolle']
        ];

    }
    /*** DON'T CHANGE ANYTHING PASSED THIS LINE ***/
    id = (id === undefined) ? 'map_canvas' : id;

    var map = new google.maps.Map(document.getElementById(id), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: true,
        scaleControl: false,
        zoom: 14

    });

    var myLatlng,
        marker, i,
        bounds = new google.maps.LatLngBounds(),
        infowindow = new google.maps.InfoWindow({
            content: "loading..."
        });

    for (i = 0; i < locations.length; i++) {
        if (locations[i][2] !== undefined && locations[i][3] !== undefined) {
            var content = '<div class="infoWindow">' + locations[i][0] + '<br>' + locations[i][1] + '</div>';
            (function(content) {
                myLatlng = new google.maps.LatLng(locations[i][2], locations[i][3]);

                marker = new google.maps.Marker({
                    position: myLatlng,
                    icon: image,
                    title: overlayTitle,
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function() {
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, this);
                    };
                })(this, i));

                if (locations.length > 1) {
                    bounds.extend(myLatlng);
                    map.fitBounds(bounds);
                } else {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                    map.setCenter(myLatlng);
                }
            })(content);
        } else {

            var geocoder = new google.maps.Geocoder(),
                info = locations[i][0],
                addr = locations[i][1],
                latLng = locations[i][1];

            (function(info, addr) {

                geocoder.geocode({

                    'address': latLng

                }, function(results) {

                    myLatlng = results[0].geometry.location;

                    marker = new google.maps.Marker({
                        position: myLatlng,
                        icon: image,
                        title: overlayTitle,
                        map: map
                    });
                    var $content = '<div class="infoWindow">' + info + '<br>' + addr + '</div>';
                    google.maps.event.addListener(marker, 'click', (function() {
                        return function() {
                            infowindow.setContent($content);
                            infowindow.open(map, this);
                        };
                    })(this, i));

                    if (locations.length > 1) {
                        bounds.extend(myLatlng);
                        map.fitBounds(bounds);
                    } else {
                        map.setCenter(myLatlng);
                    }
                });
            })(info, addr);

        }
    }
}