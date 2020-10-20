$(function(){
    //start
    $.ajax({
        url:"https://graphicnovel.github.io/coffeeforyou/data_story.json",
        type:"GET",
        success:function(data){
            var title, num=0, url, date, thumb, hashtag, contents, imgSrc, tag="all", artList = "";
            var artLen = 0, totalLen = 0, blockNum = 6, pageNum, pageNumList, currentPage, pageList = "";
            var pageGroup = [], pageTag=[], totalGroup = [], currentArt;

            
            function funList(tag, currentPage){                

                //페이지 버튼 눌렀을 때, 페이지 번호에 따라 불러올 범위 지정
                var start = blockNum * (currentPage-1);
                var end = blockNum * currentPage;

                //리스트 초기화
                artList = "";
                

                //반복문
                data.article.forEach(function(el, key){
                    //각 변수에 값 넣기
                    title = el.title; 
                    url = el.url;
                    thumb = el.thumb;
                    hashtag = el.hashtag;
                    contents = el.contents;

                    function createArt(){
                        //html 태그 넣기
                        artList += "<article><div class='img_box'>";
                        artList += "<a href="+ url +" class='thumb'>";
                        artList += "<img src="+ thumb +" class='thumbImg'></a></div>";
                        artList += "<span class='hashtag'>"+ hashtag +"</span>";
                        artList += "<h3 class='f_20 title'>";
                        artList += "<a href="+ url +">"+ title +"</a></h3>";
                        artList += "<a href="+ url +"><p class='f_basic contents'>"+ contents +"</a></p>";
                        artList += "<a href="+ url +" class='f_basic readMore'>read more</a></article>";
                    }
                    

                    //본문 미리보기 글자 수 제한
                    if(contents.length > 30 ){
                        contents = contents.substr(0, 150);
                        contents = contents.replace(contents, contents + "...");
                    }
                    


                    if(tag == hashtag){ //tag와 hashtag가 같은 경우

                        createArt(); //해당하는 카테고리 게시글 html 태그 작성

                        //해당하는 카테고리의 총 게시글 수 체크를 위한 배열
                        totalGroup.push(artList);

                        //한 페이지에 출력할 게시글을 배열에 저장
                        pageTag.push(artList);

                    }else if( tag == "all" ){ //tag가 all일 경우

                        createArt(); //html 태그 작성
                        totalGroup.push(artList);

                        if(key >= start && key < end ){ //페이징 조건
                            pageGroup.push(artList); //pageGroup에 넣기
                        }   
                    }

                    //게시글 데이터가 마지막까지 다 돌았을 때
                    if(data.article.length-1 == key){
                        pushTag();
                    }

                    //artList 초기화
                    artList = "";
                   
                    
                });
                funPage(currentPage); //페이징 함수에 currentPage 변수를 보내 함수 실행


                //pageTag 배열의 요소들을 pageGroup에 넣어줌
                function pushTag(){
                    pageTag.forEach(function(a, key){
                        //페이징 조건
                        if(key >= start && key < end){
                            pageGroup.push(a);
                        }
                    });
                }


                //태그 뿌리기
                $(".news_container").html(pageGroup);

                
                //게시글 클릭 이벤트
                $('article a').on('click',function(e){
                    e.preventDefault();
                    viewUrl = $(this).attr('href');
                    console.log($(this).title);
                });

                

                //페이징 배열 초기화
                pageGroup = [];
                pageTag = [];
                totalGroup = [];

            }
            //첫 페이지 뿌리기
            funList("all", 1);

            

            //카테고리 클릭 이벤트
            $('.category a').on('click', function(e){
                e.preventDefault();

                //클릭한 카테고리의 href 속성을 tag 변수에 담음
                tag = $(this).attr('href');

                //페이지 번호 초기화
                currentPage = 1;

                //tag 변수를 funList로 보내 실행
                funList(tag, currentPage);

                //카테고리 버튼 활성화
                $('.category a').removeClass('active');
                $(this).addClass('active');
            });


            

            
            //페이징 함수
            function funPage(currentPage){
                artLen = $('article').length; //뿌려진 게시글 수
                totalLen = totalGroup.length; //총 게시글 수

                pageList = ""; //페이지 리스트 초기화

                if(totalLen<blockNum){ //총 게시글 수 < 한 페이지 당 표시할 게시글 수
                    pageNum = 1;

                    pageList += "<li><a href='#' class='1'>"+ pageNum +"</a></li>"
                }else{
                    //페이지 수 = ( 게시글 수 / 한 페이지 당 표시할 게시글 수 )
                    pageNum = Math.ceil(totalLen / blockNum);
                    
                    //페이지 버튼 표시
                    pageList += "<li><a href='#' class='prev'>＜</a></li>" //prev
                    for(var i = 1; i<pageNum+1; i++){
                        pageNumList = (pageNum -(pageNum-i)).toString();
                        pageList += "<li class='"+ i +"'><a href='#'>"+ pageNumList +"</a></li>";
                    }
                    pageList += "<li><a href='#' class='next'>＞</a></li>" //next
                }

                //페이지 버튼 뿌리기
                $(".paging ul").html(pageList);


                //첫 번째 페이지 넘버에 active 추가
                if(totalLen<blockNum){
                    $('.paging ul li').eq(0).find('a').addClass('active');
                }else{
                    $('.paging ul li').eq(currentPage).addClass('active');
                }


                //페이지 버튼 클릭 이벤트
                $('.paging ul li a').on('click',function(e){
                    e.preventDefault();


                    if(pageNum != 1){ //pageNum이 1이면 실행 안함
                        if($(this).hasClass('prev')){ //prev 버튼
                            if(currentPage > 1){
                                currentPage--;
                            }else{
                                return;
                            }
                        }else if($(this).hasClass('next')){ //next 버튼
                            if(currentPage < pageNum){
                                currentPage++;
                            }else{
                                return;
                            }
                        }else{
                            //prev, next 버튼이 아닌 경우
                            //클릭한 페이지 버튼의 인덱스 currentPage에 저장
                            currentPage = $(this).parent().index();
                        }

                    //funList 재실행
                    funList(tag, currentPage);
                    
                    }
                });
            }

        }
    });

    //end
});
