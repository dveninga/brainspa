$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1] || 0;
    }
};
$(function() {
    "use strict";
    moment.lang('nl');
    var mobile = false,
        $body = $('body'),
        vakgebied,
        currentBodyClass = $body.attr('class'),
        pageTitle = $('h1.pageTitle').html(),
        $navbar = $('.navbar.navbar-static-top'),
        $header = $('header'),
        $banner = $('.container-fluid.banner, .home header.container-fluid'),
        $workshop = $('body.workshop');
    smoothScroll(1000);
    $banner.addClass('on');
    toTop(mobile);
    marktable($workshop);
    datify();
    //mainNav();
    $(window).scroll(function() {
        mainNav();
    });
    // default behaviour external links new windows
    $("a[href^='http://']").attr("target", "_blank");
    $("a[href^='https://']").attr("target", "_blank");

    // avoid default scrolling when user moves with mouse
    $('.maps').on('click', function() {
        $(this).find('iframe').css('pointer-events', 'auto');
    });


    //mobile detection
    var BrowserDetect = {
        init: function() {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function(data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function(dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Trident",
            identity: "Explorer"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        }, {
            string: navigator.userAgent,
            subString: "Safari",
            identity: "Safari"
        }, {
            string: navigator.userAgent,
            subString: "Opera",
            identity: "Opera"
        }]
    };
    BrowserDetect.init();
    var ieOld = (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9) ? true : false;
    if (ieOld) {
        $('form').addClass('ieOld');
    }

    var $shareme = $('.share #shareme');
    if ($shareme.length > 0) {
        $shareme.sharrre({
            share: {
                twitter: true,
                facebook: true,
                linkedin: true,
                googlePlus: false
            },
            template: '<div class="box"><ul class="list-inline social"><li>Deel op: </li><li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li><li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li><li><a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a></li><li><a href="#" class="googleplus"><i class="fa fa-google-plus"></i></a></li></ul></div>',
            enableHover: false,
            enableTracking: false,
            render: function(api, options) {
                $(api.element).on('click', '.twitter', function() {
                    api.openPopup('twitter');
                });
                $(api.element).on('click', '.facebook', function() {
                    api.openPopup('facebook');
                });
                $(api.element).on('click', '.linkedin', function() {
                    api.openPopup('linkedin');
                });
                $(api.element).on('click', '.googleplus', function() {
                    api.openPopup('googlePlus');
                });
            }
        });
    }

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top >= ($header.height() + $navbar.height())) {
            $navbar.addClass('navbar-fixed-top');
        } else {
            $navbar.removeClass('navbar-fixed-top');
        }
    }
});

function marktable($workshop) {
    var $contentTable = $('.content table'),
        $contentUl = $('body.lijst .page-content .column2 ul');

    if ($contentTable.length) {

        if ($workshop.length > 0) {
            $contentTable.addClass('table table-condensed').wrap('<div class="price"></div>');
        } else {
            $contentTable.addClass('table table-condensed');
        }
    }
    if ($contentUl.length) {
        $contentUl.addClass('list-unstyled');
    }

}

function smoothScroll(duration) {
    $('a[href^="#"]').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function toTop(mobile) {

    if (mobile === false) {

        if (!$('#goToTop').length)
            $('body').append('<a href="#" id="goToTop"><i class="fa fa-arrow-up"></i></a>');

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#goToTop').slideDown('fast');
            } else {
                $('#goToTop').slideUp('fast');
            }
        });

        $('#goToTop').click(function(e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 800);

        });
    } else {
        if ($('#goToTop').length)
            $('#goToTop').remove();
    }
}

function datify() {
    moment.lang('nl');
    $('.post-meta').each(function(index) {
        $this = $(this);
        var date = $this.text();
        $this.text(moment(date).format("ddd D MMMM YYYY"));
    });
}

function appendBootstrap() {
    "use strict";
    if ($('#map_canvas').length) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//maps.google.com/maps/api/js?sensor=false&callback=initialize";
        document.body.appendChild(script);
    }
}