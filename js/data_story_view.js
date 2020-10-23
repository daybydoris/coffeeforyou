$(function(){
    $.ajax({
        url:'../data_story.json',
        type:'GET',
        success:function(data){

            var viewList = "", recentList = "", artBlock;
            

            function funView(){
                //초기화
                viewList = "";

                data.article.forEach(function(el, key){

                    //변수에 데이터 저장
                    title = el.title; 
                    url = "https://graphicnovel.github.io/coffeeforyou/pages/" + el.url;
                    date = el.date;
                    thumb = el.thumb;
                    contents = el.contents;
                    imgSrc = el.imgSrc;
                    num = el.num;

                    if(localStorage.getItem('num') == num){

                        viewList += "<h2 data-aos='fade-down' data-aos-duration='600'>"+ title +"</h2><div class='a_desc'><p class='f_15'>"+ date +"</p>";
                        viewList += "<a href='#' class='shareBtn'><img src='../img/icon_share.png' class='share_icon'></a>";
                        viewList += "<div class='share'><span>share</span><div class='exit'><span></span><span></span></div>";
                        viewList += "<div class='sns'><a href='#'></a><a href='#'></a><a href='#'></a></div>";

                        viewList += "<span>copy link</span><input type='text' name='pagelink' value='"+ url +"'><input type='submit' name='copy' value='복사'></div></div>";
                        viewList += "<div class='contents'>"+ contents +"</div>";
                    }
                });
                $('.news_container article').html(viewList);


            }
            funView();

            function recent(){
                recentList = "";

                //최신순 3개만 가져옴
                data.article.sort(date_sort).forEach(function(el, key){
                    
                    if(key < 3){
                        //변수에 데이터 저장
                        title = el.title; 
                        url = el.url;
                        date = el.date;
                        num = el.num;

                        //본문 미리보기 글자 수 제한
                    if(title.length > 30 ){
                        title = title.substr(0, 30);
                        title = title.replace(title, title + "...");
                    }
    
                        recentList += "<li id="+ num +"><a href='"+ url +"'>"+ title +"</a><span>"+ date +"</span></li>";
                    }
                    
                    
                });
                $('.recent ul').append(recentList);

                $('.recent li').on('click',function(e){
                    e.preventDefault();
                    console.log($(this));
                    console.log($(this).attr('id'));
                    viewUrl = $(this).find('a').attr('href');

                    localStorage.num = $(this).attr('id');

                    location.href = viewUrl;
                });
            }
            recent();

            //게시글 최신 날짜순 정렬
            function date_sort(a,b){
                var dateA = new Date(a['date']).getTime();
                var dateB = new Date(b['date']).getTime();
                return dateA < dateB ? 1 : -1;
            }

            // $(window).on('beforeunload', function(){
            //     localStorage.removeItem('num');
            //   });
            
            function share(){
                $('.shareBtn').on('click',function(e){
                    e.preventDefault();
                    
                    $('.share').fadeIn();
                });
                $('.share .exit').on('click',function(){
                    $('.share').fadeOut();
                });
                $('input[name=copy]').on('click',function(){
                    var copyUrl = document.querySelector('input[name=pagelink]');
                    copyUrl.select();
                    document.execCommand("Copy");
                    
                    alert("복사 완료!");
                    
                });
            }
            share();
        }
    });
});