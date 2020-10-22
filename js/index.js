
    window.addEventListener('DOMContentLoaded',function(){
        // var menu = document.querySelector('.menu-trigger');
        // var nav = document.querySelector('nav');
        // var body = document.querySelector('body');
        // var menuList = document.querySelectorAll('a');
        // var btn = document.querySelectorAll('button');
        

        // //------- 화면 전환 효과 -------
        // // 시간지연 => body에 active 클래스 추가
        // setTimeout(function(){
        //     body.classList.add('active');
        // },10);

        // // menuList 누를 때 body active 클래스 제거
        // // menuList href 불러옴
        // menuList.forEach(function(el){
        //     el.addEventListener('click', function(e){
        //         e.preventDefault();
        //         body.classList.remove('active');

        //         setTimeout(function() {
        //             location.href = el.href;
        //         },500);
        //     });
        // });
        
        // btn.forEach(function(el){
        //     el.addEventListener('click', function(e){
        //            e.preventDefault();
        //             body.classList.remove('active');

        //             setTimeout(function() {
        //                 location.href = el.dataset.link;
        //             },500);
        //         });
        // });
        


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


    //coffee story 게시글 불러오기
    $.ajax({
        url:"https://graphicnovel.github.io/coffeeforyou/data_story.json",
        type:"GET",
        success:function(data){
            var artList = "";

            data.article.sort(date_sort).forEach(function(el, key){
                if(key < 3){
                    //각 변수에 값 넣기
                    title = el.title; 
                    url = "pages/" + el.url;
                    thumb = el.thumb.substr(3);
                    hashtag = el.hashtag;
                    contents = el.contents;
                    num  = el.num;

                    //본문 미리보기 글자 수 제한
                    if(contents.length > 30 ){
                        contents = contents.substr(0, 70);
                        contents = contents.replace(contents, contents + "...");
                    }

                    createArt();
                }
            });
            $(".news_container").html(artList);


            function createArt(){
                //html 태그 넣기
                artList += "<article id="+ num +"><div class='img_box'>";
                artList += "<a href="+ url +" class='thumb'>";
                artList += "<img src="+ thumb +" class='thumbImg'></a></div>";
                artList += "<div class='text'><span class='hashtag'>"+ hashtag +"</span>";
                artList += "<h3 class='f_20 title'>";
                artList += "<a href="+ url +">"+ title +"</a></h3>";
                artList += "<a href="+ url +"><p class='f_basic contents'>"+ contents +"</p></a></div></article>";
                //artList += "<a href="+ url +" class='f_basic readMore'>read more</a></article>";
            }

            //게시글 최신 날짜순 정렬
            function date_sort(a,b){
                var dateA = new Date(a['date']).getTime();
                var dateB = new Date(b['date']).getTime();
                return dateA < dateB ? 1 : -1;
            }

            function clickArt(){
                //게시글 클릭 이벤트
                $('article').on('click',function(e){
                    e.preventDefault();
                    console.log($(this).attr('id'));
                    var viewUrl = $(this).find('a').attr('href');

                    localStorage.num = $(this).attr('id');

                    location.href = viewUrl;
                });
            }
            clickArt();
        }
    });


});
   