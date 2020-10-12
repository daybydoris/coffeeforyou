$(function(){
    //start
    $.ajax({
        url:"https://graphicnovel.github.io/coffeeforyou/data_story.json",
        type:"GET",
        success:function(data){
            var title, url, date, thumb, hashtag, contents, imgSrc, artList = "";

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
                        contents = contents.substr(0, 30);
                        contents = contents.replace(contents, contents + "...");
                    }

                    if( tag == "all" || tag == hashtag ){
                        //html 태그 넣기
                        artList += "<article><div class='img_box'>";
                        artList += "<a href="+ url +">";
                        artList += "<img src="+thumb+"></a></div>";
                        artList += "<span class='hashtag'>"+ hashtag +"</span>";
                        artList += "<h3 class='f_20'>";
                        artList += "<a href="+ url +">"+ title +"</a></h3>";
                        artList += "<p class='f_basic'>"+ contents +"</p>";
                        artList += "<a href="+ url +" class='f_basic'>read more</a></article>";
                    }
                });
                $(".news_container").append(artList);
            }
            funList(all);  

            $('.category a').on('click', function(e){
                e.preventDefault();

                var tag = $(this).attr('href');

                funList(tag);
            });
        
        }
    });

    //end
});