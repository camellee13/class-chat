$(document).ready(function(){
    $("#login-form-btn").click(function(){
        var isLoginHide = $("#login-form").hasClass("hide");
        var isRegisterShow = $("#register-form").hasClass("show");
        var isLoginBtnLight = $("#login-form-btn").hasClass("btn-light");
        var isRegisterBtninfo = $("#register-form-btn").hasClass("btn-info");
            if (isLoginHide === true && isRegisterShow === true) {
                document.getElementById("register-form").classList.remove('show');
                document.getElementById("register-form").classList.add('hide');
                document.getElementById("login-form").classList.remove('hide');
                document.getElementById("login-form").classList.add('show');
            }
        
            if (isLoginBtnLight === true && isRegisterBtninfo === true) {
                document.getElementById("register-form-btn").classList.remove('btn-info');
                document.getElementById("register-form-btn").classList.add('btn-light');
                document.getElementById("login-form-btn").classList.remove('btn-light');
                document.getElementById("login-form-btn").classList.add('btn-info');
            }
    });
    $("#register-form-btn").click(function(){
        var isLoginShow = $("#login-form").hasClass("show");
        var isRegisterHide = $("#register-form").hasClass("hide");
        var isLoginBtnInfo = $("#login-form-btn").hasClass("btn-info");
        var isRegisterBtnLight = $("#register-form-btn").hasClass("btn-light");
            if (isLoginShow === true && isRegisterHide === true) {
                document.getElementById("login-form").classList.remove('show');
                document.getElementById("login-form").classList.add('hide');
                document.getElementById("register-form").classList.remove('hide');
                document.getElementById("register-form").classList.add('show');
            }
        
        
            if (isLoginBtnInfo === true && isRegisterBtnLight === true) {
                document.getElementById("login-form-btn").classList.remove('btn-info');
                document.getElementById("login-form-btn").classList.add('btn-light');
                document.getElementById("register-form-btn").classList.remove('btn-light');
                document.getElementById("register-form-btn").classList.add('btn-info');
            }ß
    });
});