$('#formContact').submit(function(e){
    e.preventDefault();
        $.ajax({
            url: 'https://hooks.zapier.com/hooks/catch/11818558/36p2585/',
            type: 'post',
            data:$('#formContact').serialize(),
            success:function(){
                window.location.replace("https://powersandbox.com/uk-quote-form/uk-quote-thank-you.html");
        }
    });
});