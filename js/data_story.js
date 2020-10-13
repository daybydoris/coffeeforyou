$(function(){
    //start
    $.ajax({
        url:"/data_story.json",
        type:"GET",
        success:function(data){
            var title, num, url, date, thumb, hashtag, contents, imgSrc,tag="all", artList = "";
            var artLen = 0, totalLen = 0, blockNum = 6, pageNum, pageNumList,currentPage = 1, pageList = "";
            var pageGroup = [], currentArt;

            function funList(tag){
                //리스트 초기화
                artList = "";

                data.article.forEach(function(el, key){
                    //각 변수에 값 넣기
                    title = el.title;
                    num = el.num;
                    url = el.url;
                    date = el.date;
                    thumb = el.thumb;
                    hashtag = el.hashtag;
                    contents = el.contents;
                    imgSrc = el.imgSrc;

                    //게시글 넘버 담는 배열
                    pageGroup.push(num);
                    

                    if(contents.length > 30 ){
                        contents = contents.substr(0, 150);
                        contents = contents.replace(contents, contents + "...");
                    }

                    if( tag == "all" || tag == hashtag ){
                        
                        var start = blockNum * (currentPage);
                        console.log(start);
                        currentArt = pageGroup.slice(start, start + blockNum);

                        console.log(currentArt);

                        if(num <= start){
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
                    }
                    
                });
                $(".news_container").html(artList);
                funPage();
            }
            funList("all");

            $('.category a').on('click', function(e){
                e.preventDefault();

                tag = $(this).attr('href');

                funList(tag);
            });
        
            function funPage(){
                //artLen = $("article").length;
                artLen = $('article').length;
                totalLen = data.article.length;

                console.log(artLen);
                console.log(totalLen);

                pageList = "";

                if(totalLen<blockNum){
                    pageNum = 1;

                    pageList += "<li><a href='#'>"+ pageNum +"</a></li>"
                }else{
                    pageNum = Math.ceil(totalLen / blockNum); //페이지 수 = 게시글 수 / 한 페이지 당 표시할 게시글 수

                    //페이지 버튼 표시
                    pageList += "<li><a href='#'>＜</a></li>"
                    for(var i = 1; i<pageNum+1; i++){
                        pageNumList = (pageNum -(pageNum-i)).toString();
                        pageList += "<li><a href='#'>"+ pageNumList +"</a></li>";
                    }
                    pageList += "<li><a href='#'>＞</a></li>"
                }
                //페이지 버튼 뿌리기
                $(".paging ul").html(pageList);

                //페이지 버튼 클릭시 
                $('.paging ul li a').on('click',function(e){
                    e.preventDefault();
                    currentPage = $(this).parent().index();
                    console.log(currentPage);
                    funList(tag);
                });
            }
        }
    });

    //end
});
