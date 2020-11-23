
window.addEventListener('DOMContentLoaded',function(){
    //coffee story 게시글 불러오기
    $.ajax({
        url:"data_story.json",
        type:"GET",
        success:function(data){
            console.log('성공');
            var artList = "";
            var idx = 150;

            data.article.sort(date_sort).forEach(function(el, key){
                if(key < 3){
                    //각 변수에 값 넣기
                    title = el.title; 
                    url = "pages/" + el.url;
                    thumb = el.thumb.substr(3);
                    hashtag = el.hashtag;
                    contents = el.contents;
                    num  = el.num;
                    
                    //contents에서 태그 제거
                    contents = contents.replace(/(<([^>]+)>)/ig,"");

                    //본문 미리보기 글자 수 제한
                    if(contents.length > 70 ){
                        contents = contents.substr(0, 70);
                        contents = contents.replace(contents, contents + "...");
                    }

                    //제목 미리보기 글자 수 제한
                    if(title.length > 25 ){
                        title = title.substr(0, 25);
                        title = title.replace(title, title + "...");
                    }

                    createArt();
                }
                idx+=100;
            });
            $(".news_container").html(artList);


            function createArt(){
                //html 태그 넣기
                artList += "<article data-aos='fade-up' data-aos-delay='"+ idx +"' id="+ num +"><div class='img_box'>";
                artList += "<a href="+ url +" class='thumb'>";
                artList += "<img src="+ thumb +" class='thumbImg'></a></div>";
                artList += "<div class='text'><span class='hashtag'>"+ hashtag +"</span>";
                artList += "<h3 class='f_20 title'>";
                artList += "<a href="+ url +">"+ title +"</a></h3>";
                artList += "<a href="+ url +"><p class='f_basic contents'>"+ contents +"</p></a></div></article>";
            }

            //게시글 최신 날짜순 정렬
            function date_sort(a,b){
                var dateA = new Date(a['date']).getTime();
                var dateB = new Date(b['date']).getTime();
                return dateA < dateB ? 1 : -1;
            }

            function clickArt(){
                //게시글 클릭 이벤트
                $('.news_container article').on('click',function(e){
                    e.preventDefault();

                    var viewUrl = $(this).find('a').attr('href');

                    localStorage.num = $(this).attr('id');
                    location.href = viewUrl;
                });
            }
            clickArt();
        }
    });


});
   