(function() {
    "use strict";
    var agenda = {

        init: function() {
            this.cacheDom();
            this.bindEvents();
        },

        cacheDom: function() {
            this.$agendaList = $('#agenda .agenda-list');
            this.$btnSubscribe = $('#agenda .btn.subscribe');
            this.$title = this.$btnSubscribe.attr('data-title');
            this.$date = this.$btnSubscribe.attr('data-date');
            this.$btnOption = $('#agenda .btn.option');
            this.$agenda = $('#agenda .agenda-list');
            this.$form = $('form#inschrijvenworkshopForm');
            this.$form.hide();
            this.render();
        },

        bindEvents: function() {
            var self = this;
            this.$btnSubscribe.on('click', function(e) {
                var title = $(this).attr('data-title');
                var date = $(this).attr('data-date');
                date = date === undefined ? 'wachtlijst' : date;
                e.preventDefault();
                self.$form.find('input#WORKSHOP').attr('disabled', true).val(title);
                self.$form.find('input#DATE').attr('disabled', true).val(date);
                self.$form.slideDown();
                $('html, body').animate({
                    scrollTop: self.$form.offset().top - 100
                }, 1000);
            });
        },

        render: function() {
            // set the language to dutch
            moment.lang('nl');

            this.$agendaList.find('.agenda-item').each(function() {
                var self = this;
                // cache this
                var $this = $(this),
                    date = '';

                $this.find('.date').each(function() {
                    // cache every date
                    var $this = $(this);
                    // cache date
                    date = $this.text();
                    // change format date to nice readable date
                    $this.text(moment(date, 'DD-MM-YYYY').format("ddd D MMMM YYYY"));
                });
            });
        }
    };

    agenda.init();

})();