$(function(){
    $.ajax({
        url:'https://graphicnovel.github.io/coffeeforyou/data_story.json',
        type:'GET',
        success:function(data){

            var viewList = "", recentList = "";

            function funView(){
                //초기화
                viewList = "";

                data.article.forEach(function(el, key){

                    //변수에 데이터 저장
                    title = el.title; 
                    url = el.url;
                    date = el.date;
                    thumb = el.thumb;
                    contents = el.contents;
                    imgSrc = el.imgSrc;

                    viewList += "<h2>"+ title +"</h2><div class='a_desc'><p class='f_15'>"+ date +"</p>";
                    viewList += "<a href='#'><img src='../img/icon_share.png' class='share_icon'></a>";
                    viewList += "<div class='share'><span>share</span><div class='exit'><span></span><span></span></div>";
                    viewList += "<div class='sns'><a href='#'></a><a href='#'></a><a href='#'></a></div>";

                    viewList += "<span>copy link</span><input type='text' name='pagelink' value='"+ url +"'><input type='submit' name='copy' value='복사'></div></div>";
                    viewList += "<div class='img_box'><img src='"+ imgSrc +"'></a></div>";
                    viewList += "<p class='f_15'>"+ contents +"</p>";


                });
                $('.news_container article').html(viewList);


            }
            funView();

            function recent(){
                recentList = "";

                data.article.forEach(function(el, key){
                    console.log(key<3);
                    if(key < 3){
                        //변수에 데이터 저장
                        title = el.title; 
                        url = el.url;
                        date = el.date;

                        //본문 미리보기 글자 수 제한
                    if(title.length > 30 ){
                        title = title.substr(0, 30);
                        title = title.replace(title, title + "...");
                    }
    
                        recentList += "<li><a href='"+ url +"'>"+ title +"</a><span>"+ date +"</span></li>";
                    }
                    
                });
                $('.recent ul').append(recentList);
            }
            recent();

        }
    });
});