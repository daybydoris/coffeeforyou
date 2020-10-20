$(function(){

    var step1Li = $('.step1 li');
    var step2Li = $('.step2 li');
    var stepText;

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
        //e.preventDefault();
        if(step1Li.hasClass('active') && step2Li.hasClass('active')){
            var id1 = $('.step1 li.active').text();
            var id2 = $('.step2 li.active').text();

            $.ajax({
                url:'https://graphicnovel.github.io/coffeeforyou/data_story.json',
                type:'GET',
                success:function(data){
                    console.log(id1, id2);
                    
                    stepText += id1 + "과 " + id2 + "를 즐기는"; 

                    $('.stepResult').html(stepText);
                }
            });
        }else{
            alert('STEP01과 STEP02를 선택해주세요.');
        }
    });

    
});