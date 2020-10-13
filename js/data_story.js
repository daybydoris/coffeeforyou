$(function(){
    //start
    $.ajax({
        url:"https://graphicnovel.github.io/coffeeforyou/data_story.json",
        type:"GET",
        success:function(data){
            var title, url, date, thumb, hashtag, contents, imgSrc, artList = "";
            var artLen=0, blockNum = 6, pageNum, pageNumList, pageList = "";

            function funList(tag){
                //리스트 초기화
                artList = "";

                data.article.forEach(function(el, key){
                    //각 변수에 값 넣기
                    title = el.title;
                    url = el.url;
                    date = el.date;
                    thumb = el.thumb;
                    hashtag = el.hashtag;
                    contents = el.contents;
                    imgSrc = el.imgSrc;

                    if(contents.length > 30 ){
                        contents = contents.substr(0, 150);
                        contents = contents.replace(contents, contents + "...");
                    }

                    if( tag == "all" || tag == hashtag ){
                        //html 태그 넣기
                        artList += "<article><div class='img_box'>";
                        artList += "<a href="+ url +">";
                        artList += "<img src="+ thumb +"></a></div>";
                        artList += "<span class='hashtag'>"+ hashtag +"</span>";
                        artList += "<h3 class='f_20'>";
                        artList += "<a href="+ url +">"+ title +"</a></h3>";
                        artList += "<a href="+ url +"><p class='f_basic'>"+ contents +"</a></p>";
                        artList += "<a href="+ url +" class='f_basic'>read more</a></article>";
                    }
                });
                $(".news_container").html(artList);
                funPage();
            }
            funList("all");

            $('.category a').on('click', function(e){
                e.preventDefault();

                var tag = $(this).attr('href');

                funList(tag);
            });
        
            function funPage(){
                artLen = $("article").length;

                pageList = "";

                if(artLen<blockNum){
                    pageNum = 1;

                    pageList += "<li><a href='#'>"+ pageNum +"</a></li>"
                }else{
                    pageNum = artLen / blockNum; //페이지 수 = 게시글 수 / 한 페이지 당 표시할 게시글 수

                    //페이지 버튼 표시
                    pageList += "<li><a href='#'>＜</a></li>"
                    for(var i = 1; i<pageNum+1; i++){
                        pageNumList = (pageNum -(pageNum-i)).toString();
                        pageList += "<li><a href='#'>"+ pageNumList +"</a></li>";
                    }
                    pageList += "<li><a href='#'>＞</a></li>"
                }
                $(".paging ul").html(pageList);
            }
        }
    });

    //end
});
