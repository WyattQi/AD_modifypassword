
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
	    if(check){
		    $.ajax({
			    type: 'POST',
			    url: document.URL,
			    data: $("form").serialize(),
			    dataType: "json",
			    success: detect_result,
		    });
	    }
		return false;
    });

    function detect_result(data)
    {
        var errcode = data["errcode"];
        if(errcode == 0){
            window.location.href=document.URL+"next"
        }
        else if(errcode == 1){
            $("#pemail").addClass('alert-validate');
            $("#ppass").addClass('alert-validate');
            $("#warn-info").text("用户名或密码不正确!");
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 5000);
        }
//        else if(errcode == 2){$("#pcode").addClass('alert-validate');}
        else if(errcode == 9){
            $("#warn-info").text(data["msg"]);
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 5000);
        }
        else {alert("未知错误");}
    }


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
	    if($(input).val().trim() == ''){
                return false;
            }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);
