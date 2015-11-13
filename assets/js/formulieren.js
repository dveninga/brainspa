(function($) {
    "use strict";

    var settings = {
        firebase: 'https://brainspa.firebaseio.com/',
        debug: false
    };

    $('form#contactform').validate({
        debug: settings.debug,
        rules: {
            PERSON_NAME: "required",
            EMAIL: {
                required: true,
                email: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.radio-inline').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function(e) {
            // cache this
            var $this = $(e);

            var contact = new Firebase(settings.firebase + 'contact');

            var name = $this.find("input[name='PERSON_NAME']").val(),
                phone = $this.find("input[name='PHONE']").val(),
                email = $this.find("input[name='EMAIL']").val(),
                remark = $this.find("#REMARK").val();

            // create object to push to database
            var record = {
                creation: Date.now(),
                naam: name,
                email: email,
                telefoon: phone,
                opmerking: remark
            };
            // push record
            var item = contact.push();
            item.setWithPriority(record, Firebase.ServerValue.TIMESTAMP);


            // delete values in form
            var currentdate = moment();
            $this.find("input[name='creation']").val(moment());
            $this.find("input[name='PERSON_NAME']").val('');
            $this.find("input[name='EMAIL']").val('');
            $this.find("input[name='PHONE']").val('');
            $this.find("#REMARK").val('');
            var $message = $('<div></div>', {
                html: '<p>Vriendelijk bedankt voor uw contactverzoek.</p><p>Een kopie van uw <strong>contactverzoek</strong> is u per email toegestuurd.</p>',
                class: 'well'
            });
            $this.slideUp();
            $('html, body').animate({
                scrollTop: $this.offset().top
            }, 1000);
            $this.after($message);
        }
    });
})(jQuery);