$(function(){
   //start
    
//    console.log(location.pathname);
//    console.log(location.host);
    
    $('header').load('https://graphicnovel.github.io/coffeeforyou/inc_head_foot.html header .h_container',menuTrigger);
    $('footer').load('https://graphicnovel.github.io/coffeeforyou/inc_head_foot.html footer .f_container');
    
    function menuTrigger(){
        // menu-trigger active 클래스 추가
        var menu = document.querySelector('.menu-trigger');
        var nav = document.querySelector('nav');
        
        menu.addEventListener('click',function(){
            menu.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    //top 버튼
    setTimeout(function(){
        var topBtn = document.querySelector(".f_container .top a");

        topBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
            top: 0,
            behavior: "smooth"
            });
        });
    },100);
    
    //end
});

    