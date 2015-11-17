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
    $('form#inschrijvenworkshopForm').validate({
        debug: settings.debug,
        rules: {
            WORKSHOP: "required",
            DATE: "required",
            LAST_NAME: "required",
            PHONE: "required",
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

            var inschrijving = new Firebase(settings.firebase + 'inschrijvingen');

            var training = $this.find("input[name='WORKSHOP']").val(),
                date = $this.find("input[name='DATE']").val(),
                salutation = salutation === undefined ? '' : $this.find("input[name='SALUTATION']:checked").val(),
                fname = $this.find("input[name='FIRST_NAME']").val(),
                lname = $this.find("input[name='LAST_NAME']").val(),
                organisation = $this.find("input[name='ORGANISATION_NAME']").val(),
                street = $this.find("input[name='STREET[POSTAL]']").val(),
                zipcode = $this.find("input[name='ZIP[POSTAL]']").val(),
                city = $this.find("input[name='CITY[POSTAL]']").val(),
                phone = $this.find("input[name='PHONE']").val(),
                email = $this.find("input[name='EMAIL']").val(),
                remark = $this.find("#REMARK").val();

            // create object to push to database
            var record = {
                creation: Date.now(),
                training: training,
                datum: date,
                aanhef: salutation,
                voornaam: fname,
                achternaam: lname,
                organisatie: organisation,
                straat: street,
                postcode: zipcode,
                plaats: city,
                telefoon: phone,
                email: email,
                opmerking: remark
            };
            // push record
            var item = inschrijving.push();
            item.setWithPriority(record, Firebase.ServerValue.TIMESTAMP);


            // delete values in form
            var currentdate = moment();
            $this.find("input[name='creation']").val(moment());
            $this.find("input[name='WORKSHOP']").val('');
            $this.find("input[name='DATE']").val();
            $this.find("input[name='SALUTATION']").prop('checked', false);
            $this.find("input[name='FIRST_NAME']").val('');
            $this.find("input[name='LAST_NAME']").val('');
            $this.find("input[name='ORGANISATION_NAME']").val('');
            $this.find("input[name='STREET[POSTAL]']").val('');
            $this.find("input[name='ZIP[POSTAL]']").val('');
            $this.find("input[name='CITY[POSTAL]']").val('');
            $this.find("input[name='PHONE']").val('');
            $this.find("input[name='EMAIL']").val('');
            $this.find("#REMARK").val('');
            var $message = $('<div></div>', {
                html: '<p>Vriendelijk bedankt voor uw inschrijving.</p><p>Een kopie van uw <strong>inschrijving</strong> is u per email toegestuurd. U ontvangt voor aanvang van de workshop een officiële uitnodiging.</p><p>Heeft u aanvullende vragen, neemt u dan contact op met ons op telefoonnummer 0575-541060 of per email: <a href="mailto:info@brainspa.nl">info@brainspa.nl</a>.</p>',
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