$(function(){
   //start

   //헤더, 푸터 불러오기
    $('header').load('https://graphicnovel.github.io/coffeeforyou/inc_head_foot.html header .h_container',menuTrigger);
    $('footer').load('https://graphicnovel.github.io/coffeeforyou/inc_head_foot.html footer .f_container', scrollTop);
    

    var body = document.querySelector('body');
    var menuList = document.querySelectorAll('.h_container a');
    var btn = document.querySelectorAll('button');


    //모바일 트리거 메뉴
    function menuTrigger(){
        // menu-trigger active 클래스 추가
        var menu = document.querySelector('.menu-trigger');
        var nav = document.querySelector('nav');
        
        //메뉴 버튼 클릭 시 nav 토글
        menu.addEventListener('click',function(){
            menu.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    //Top 이동 기능
    function scrollTop(){
        setTimeout(function(){
            var topButton = document.querySelector('.topBtn');

            topButton.addEventListener("click", function (e) {
                e.preventDefault();
                window.scrollTo({
                top: 0,
                behavior: "smooth"
                });
            });
        },500);
    }

    $('body').fadeTo(500, 1 );

    setTimeout(function(){
        $('.h_container a').on('click',function(e){
            pageHref = $(this).attr('href');

            e.preventDefault();
            
            $('body').fadeOut(500);
            setTimeout(function(){
                location.href = pageHref;
            },500);
        }); 
    },500);


    //end
});

    