
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
        // 判断密码是否一致，并且符合要求
       if($("#pass").val() != $("#rpass").val()){
            $("#warn-info").text("两次密码不一致");
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 3000);
            return false;
       }
       // 判断密码复杂度
       var iscomplex = false;
       var regex = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
       var regex2 = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])');
       var regex3 = new RegExp('(?=.*[0-9])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
       var regex4 = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
       var regex5 = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
       if(regex.test($("#pass").val())){iscomplex = true;}
       else if(regex2.test($("#pass").val())){iscomplex = true;}
       else if(regex3.test($("#pass").val())){iscomplex = true;}
       else if(regex4.test($("#pass").val())){iscomplex = true;}
       else if(regex5.test($("#pass").val())){iscomplex = true;}
       if(!iscomplex){
            $("#warn-info").text("密码复杂度不够，需要从大写、小写、数字、特殊字符中选取3类或以上，长度8位及以上！");
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 3000);
            return false;
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
            $("#warn-info").text("密码修改成功！");
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 3000);
            window.location.href=document.URL.split("next")[0] + 'success';
        }
        else if(errcode == 8)
        {
            window.location.href=document.URL.split("next")[0];
        }
        else{
             $("#warn-info").text(data["msg"]);
            $("#warn").show();
            var id = setTimeout(function(){$("#warn").hide();}, 3000);
        }
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
