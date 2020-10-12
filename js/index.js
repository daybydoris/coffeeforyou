
    window.addEventListener('DOMContentLoaded',function(){
        var menu = document.querySelector('.menu-trigger');
        var nav = document.querySelector('nav');
        var body = document.querySelector('body');
        var menuList = document.querySelectorAll('a');
        var btn = document.querySelectorAll('button');
        

        //------- 화면 전환 효과 -------
        // 시간지연 => body에 active 클래스 추가
        setTimeout(function(){
            body.classList.add('active');
        },10);

        // menuList 누를 때 body active 클래스 제거
        // menuList href 불러옴
        menuList.forEach(function(el){
            el.addEventListener('click', function(e){
                e.preventDefault();
                body.classList.remove('active');

                setTimeout(function() {
                    location.href = el.href;
                },500);
            });
        });
        
        btn.forEach(function(el){
            el.addEventListener('click', function(e){
                   e.preventDefault();
                    body.classList.remove('active');

                    setTimeout(function() {
                        location.href = el.dataset.link;
                    },500);
                });
        });
        


    //------- 스크롤시 fade in 효과 -------
    //각 section 선택하기
    var section = document.querySelectorAll('section');


    //fadeIn 함수
    function fadeIn(){
        var winH = window.innerHeight;
            
        section.forEach(function(el) {
            el.classList.add('hideme');
        }); //모든 div 숨김

        setTimeout(function() {
            section[0].classList.remove('hideme');
            section[0].classList.add('active');
            //페이지에 들어온 0.5초 후 첫번째 div 나타남
        }, 500);

        window.addEventListener('scroll', scrollFun);

        // function scrollFun2(){
        //     section.forEach(function(el){
        //         //section의 자식 요소들을 변수에 담기
        //         var contents = el.childNodes;

        //         contents.forEach(function(con){
        //             var i = 1;

        //             setTimeout(function(){
        //                 con.classList.remove('hideme');
        //                 con.classList.add('active');
        //             },i*100);

        //             i++;
        //         });
        //     });
            
        // }

        function scrollFun() {
            section.forEach(function(el) {
                if (el.offsetTop - (winH * 0.6) < this.scrollY){
                    if(el.classList.contains('s_2')){
                        var left = el.querySelector('.left');
                        el.classList.remove('hideme');
                        left.classList.add('slide');
                    }else{
                        el.classList.remove('hideme');
                        el.classList.add('active');
                    }
                }
            });
        };
    };
    fadeIn();
});
   