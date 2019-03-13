$(document).ready(()=>{

    $('#country').change(function () {
    var countryCode = $(this).val();

    if (countryCode) {
        $('#code').val(countryCode);
    }
});

//Email Verifying

$("#email").focusout(()=>{
    check();
});

function check(){

var restURL="http://apilayer.net/api/check?access_key=c5118f1f9827f42a5fc4b231932130a8&email="+$("#email").val()+"&smtp=1&format=1";
$.ajax({
    type:'GET',
    url: restURL,
    dataType:"json",
    success: renderList,
});
    return false;

}

function renderList(data)
{
    if((data.format_valid==true) && (data.smtp_check==true))
    {
     $('#status').removeClass('fa fa-times-circle-o').addClass('fa fa-check-circle-o').css("color","green");
     document.getElementById("status2").innerHTML="Valid";
    }
    else
    {
     $('#status').removeClass('fa fa-check-circle-o').addClass('fa fa-times-circle-o').css("color","red");  
     document.getElementById("status2").innerHTML="Please provide valid Email";
    }
}

//Phone Number Verify

$("#phone").focusout(()=>{
    checkNumber();
});

$("#code").change(()=>{
    checkNumber();
});


function checkNumber(){
    var urlPhone="http://apilayer.net/api/validate?access_key=af1fd47c576c38855bba214e8c74b839&number="+$("#code").val()+$("#phone").val()+"";
    $.ajax({
        type:'GET',
        url: urlPhone,
        dataType:"json",
        success: phoneAction,
    });
        return false;
}

function phoneAction(rohit)
{
    if((rohit.valid==true))
    {
     $('#numberStatus').removeClass('fa fa-times-circle-o').addClass('fa fa-check-circle-o').css("color","green");
    }
    else
    {
     $('#numberStatus').removeClass('fa fa-check-circle-o').addClass('fa fa-times-circle-o').css("color","red");  
    }
}



});




//getting country code

 var urlCode="http://apilayer.net/api/countries?access_key=af1fd47c576c38855bba214e8c74b839&format=1";
    $.ajax({
        type:'GET',
        url: urlCode,
        dataType:"json",
        success: function(data) {
            jData = data
            $.each(jData, function(key, value) {
               // $('#country').append("<option value=" + value.dialling_code + ">" + value.country_name + "</option>");
                $('#country').append($('<option>').text(value.country_name ).attr('value', value.dialling_code));
            
            });
        }
});