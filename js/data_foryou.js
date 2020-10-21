$(function(){

    var step1Li = $('.step1 li');
    var step2Li = $('.step2 li');
    var id1 = "", id2 = "", id1Text = "", id2Text = "";

    step1Li.on('click',function(){
        step1Li.removeClass('active');
        $(this).toggleClass('active');
        console.log($('.step1 li.active'));
    });
    step2Li.on('click',function(){
        step2Li.removeClass('active');
        $(this).toggleClass('active');
        console.log($('.step2 li.active'));
    });

    $('.resultBtn').on('click',function(e){
        e.preventDefault();
        if(step1Li.hasClass('active') && step2Li.hasClass('active')){
            id1 = $('.step1 li.active').attr('id');
            id2 = $('.step2 li.active').attr('id');
            id1Text = $('.step1 li.active').text();
            id2Text = $('.step2 li.active').text();

            localStorage.id1 = id1;
            localStorage.id2 = id2;
            localStorage.id1Text = id1Text;
            localStorage.id2Text = id2Text;
        
            location.href = $(this).attr('href');
        }else{
            alert('STEP01과 STEP02를 선택해주세요.');
        }
    });

    
});