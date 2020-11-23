$(function () {
  //start

  $.ajax({
    //https://graphicnovel.github.io/coffeeforyou
    url: "../data_beans.json",
    type: "GET",
    success: function (data) {
      var country, flag, name, detail, origin, kind, grade, process, fragrance,
        acidity, body, sweetness, bitterness, balance, roasting, recommend = [], note = [],
        beanList = "", popList = "", resultText = "", retryBtn = "", fragCal = [], acidCal = [], sweetCal = [],
        bitterCal = [], bodyCal = [], balCal = [], roast = [], noteGroup = [],
        moreBtn, popup, beanBlock, exit, wrap ,idx = 300;

      function funList() {
        
        if(localStorage.getItem('id1') != null){
          var id1Text = localStorage.getItem('id1Text');
          var id2Text = localStorage.getItem('id2Text');
          
          resultText += "<h2 class='f_20'>"+ id1Text +"과 <br>"+ id2Text +" 풍미를 즐기는 <br>당신에게 맞는 원두는</h2>"
          retryBtn += "<a href='sub04.html' class='retryBtn'>다시하기</a>";

          $('.retryBtn').html(retryBtn);//다시하기 버튼 뿌리기
        }else{
          resultText += "<a href='/coffeeforyou/pages/sub04.html' class='resultBtn'>원두 추천 받기</a>";
          $('.retryBtn').css('display','none');
        }
        $('.result_text').html(resultText);
        

        //상품 리스트 초기화
        beanList = "";
        resultText = "";
          
        data.beans.forEach(function (value, key) {
          //각 변수에 값 넣기
          country = value.country;
          backImg = value.backImg;
          flag = value.flag;
          name = value.name;
          detail = value.detail;
          origin = value.origin;
          kind = value.kind;
          grade = value.grade;
          process = value.process;
          fragrance = value.fragrance;
          acidity = value.acidity;
          body = value.body;
          sweetness = value.sweetness;
          bitterness = value.bitterness;
          roasting = value.roasting;
          note = value.note;

          balance = (fragrance + acidity + body +  sweetness + bitterness) / 5;


          //recommend 배열 초기화
          //원두 추천시 필요한 키워드 저장
          recommend = [];
          
          //localStorage에 id1 값이 있는지 확인
          if(localStorage.getItem('id1') != null){
            recommend.push(value.recommend[0]);
            recommend.push(value.recommend[1]);

            var id1 = localStorage.getItem('id1');
            var id2 = localStorage.getItem('id2');

            //step에 들어온 키워드와 원두 데이터에 있는 데이터가 일치하는지 검사
            if(id1 == recommend[0] && id2 == recommend[1]){
              //일치하면 html 태그 넣기
              createArt();
              createPopup();
            }else{
              //일치하지 않으면 출력하지 않기
              beanList += "";
            }
          }else{
            //localStorage에 id1 값이 없을 때 (sub03일 때) 모두 출력
            //html 태그 넣기
            createArt();
            createPopup();
          }

          //수치 계산
          cal(fragCal, fragrance);
          cal(acidCal, acidity);
          cal(sweetCal, sweetness);
          cal(bitterCal, bitterness);
          cal(bodyCal, body);
          cal(balCal, balance); 

          idx += 100;

        });
        
        $(".bean_list ul").append(beanList); //beanList 화면에 뿌리기
        $('.popup').html(popList); //popup 화면에 뿌리기

        setRoast(roasting); //로스팅 레벨 정보를 setRoast에 보내 실행
      }
      funList();
      // ------------- funList 실행 끝 --------------- // 


      //페이지를 벗어나면 localStorage에서 step 삭제
      $(window).on('beforeunload', function(){
        localStorage.removeItem('id1');
        localStorage.removeItem('id2');
        localStorage.removeItem('id1Text');
        localStorage.removeItem('id2Text');
      });


      function createArt(){
        beanList += "<li class='bean_block' data-aos='fade-up' data-aos-delay='"+ idx +"'>";
        beanList += "<div class='more f_15'>";
        beanList += "<a>자세히 보기</a></div>";
        beanList += "<div class='bean_top'>";
        beanList += "<img src='" + flag + "'/>";
        beanList += "<div class='bean_title'>";
        beanList += "<h4>" + country + "</h4>";
        beanList += "<h3>" + name + "</h3>";
        beanList += "</div></div>";

        beanList += "<div class='bean_detail'>";
        beanList += "<p>" + detail + "</p></div>";

        beanList += "<div class='bean_bar'><ul>";
        beanList += "<li class='bean_frag'>향<span></span><span></span></li>";
        beanList += "<li class='bean_acid'>산미<span></span><span></span></li>";
        beanList += "<li class='bean_sweet'>단맛<span></span><span></span></li>";
        beanList += "<li class='bean_bitter'>쓴맛<span></span><span></span></li>";
        beanList += "<li class='bean_body'>바디감<span></span><span></span></li>";
        beanList += "<li class='bean_balance'>밸런스<span></span><span></span>";
        beanList += "</li>";
        beanList += "</ul>";
        beanList += "</div></div></li>";
      }


      function createPopup(){
        //note 정보 초기화
        noteGroup = [];


        //note 데이터를 배열에 저장
        for(var i in note){

          noteGroup.push(i);
          noteGroup.push(note[i]);

        }

        //popup
        popList += "<div class='bean_block'><div class='block_wrap'><div class='bean_top'>";
        popList += "<img src="+ flag +" /><div class='bean_title'>";
        popList += "<h4 class='f_20'>"+ country +"</h4>";
        popList += "<h3 class='f_25'>"+ name +"</h3></div><div class='bean_top_bg'><img src="+ backImg +"></div></div>";
        popList += "<div class='exit'><span></span><span></span></div>";
        popList += "<p class='f_15'>"+ detail +"</p>";
        popList += "<table><tr><th>산지</th><td>"+ origin +"</td></tr>";
        popList += "<tr><th>품종</th><td>"+ kind +"</td></tr>";
        popList += "<tr><th>원두등급</th><td>"+ grade +"</td></tr>";
        popList += "<tr><th>가공방식</th><td>"+ process +"</td></tr></table>";
        popList += "<h2 class='f_20'>Cupping note</h2><div class='bean_bar'><div class='bar_left'>";
        popList += "<ul><li class='bean_frag'>향<span></span><span></span></li>";
        popList += "<li class='bean_acid'>산미<span></span><span></span></li>";
        popList += "<li class='bean_sweet'>단맛<span></span><span></span></li></ul></div>";
        popList += "<div class='bar_right'><ul><li class='bean_bitter'>쓴맛<span></span><span></span></li>";
        popList += "<li class='bean_body'>바디감<span></span><span></span></li>";
        popList += "<li class='bean_balance'>밸런스<span></span><span></span></li></ul></div></div>";

        popList += "<h2 class='f_20'>Taste</h2><div class='taste_icon'>";
        popList += "<ul><li><img src='"+ noteGroup[1] +"' /><p>"+ noteGroup[0] +"</p></li>";
        popList += "<li><img src='"+ noteGroup[3] +"' /><p>"+ noteGroup[2] +"</p></li>";
        popList += "<li><img src='"+ noteGroup[5] +"' /><p>"+ noteGroup[4] +"</p></li></ul></div>";

        popList += "<h2 class='f_20'>Roasting point</h2><div class='roasting'><span class='r_mobile'>"+ roasting +"</span>";
        popList += "<div class='roast_bar'><span></span><span></span><span>약로스팅(신맛)</span><span>강로스팅(쓴맛)</span></div></div>";
        popList += "<div class='roast_lev'><span class='back_lev'></span><ul class='float_lev'>";
        popList += "<li class='light'><span></span>light</li><li class='cinnamon'><span></span>cinnamon</li><li class='medium'><span></span>medium</li><li class='high'><span></span>high</li><li class='city'><span></span>city</li><li class='fullcity'><span></span>full city</li><li class='italian'><span></span>italian</li><li class='french'><span></span>french</li></ul></div></div></div>"
        
        roast.push(roasting); //로스팅 레벨 정보를 배열에 담음

        var topBg = document.querySelector('.bean_top_bg');
      }
      //popup 생성
      //funPopup();

      //bar width 설정
      setBar("fragBar", "bean_frag", fragCal);
      setBar("acidBar", "bean_acid", acidCal);
      setBar("sweetBar", "bean_sweet", sweetCal);
      setBar("bitterBar", "bean_bitter", bitterCal);
      setBar("bodyBar", "bean_body", bodyCal);
      setBar("balBar", "bean_balance", balCal);



      // bar 수치 계산 후 배열 저장
      function cal(nameCal, status){
        nameCal.push(75 / 5 * status);
      }

      //각 특징별 수치 입력
      function setBar(nameBar, className, nameCal){
        var nameBar = document.querySelectorAll(".bean_list .bean_bar ul ."+ className +" span:nth-of-type(2)");
        var nameBarPop = document.querySelectorAll(".popup .bean_bar ul ."+ className +" span:nth-of-type(2)");
        
        for(var i=0;i<nameBar.length;i++){
          nameBar[i].style.width = nameCal[i] + "%"; //리스트
          nameBarPop[i].style.width = nameCal[i] + "%"; //팝업
          if(className == "bean_balance"){
            nameBar[i].style.background = "#e1421d";
            nameBarPop[i].style.background = "#e1421d";
          }
        }

      }

      function setRoast(roasting){
        var roastBarPop = document.querySelectorAll(".roast_bar span:nth-of-type(1)");

        var popBlock = document.querySelectorAll('.popup .bean_block');        
        

        //roasting point 이름 bold로 처리
        popBlock.forEach(function(el, key){
          var roastLi = el.querySelectorAll('.float_lev li'); //로스팅 레벨 담기

          roastLi.forEach(function(r, key2){
            //원두 로스팅 레벨과 클래스 리스트가 일치하면 글씨체 bold
            if(roastLi[key2].classList == roast[key]){
              roastLi[key2].style.fontWeight = "bold";
            }
          });
        });
        
        //roasting point bar 길이 조정
        roastBarPop.forEach(function(r, key){

          switch(roast[key]){
            case "light":
              r.style.width = "7%";
              break;
            case "cinnamon":
              r.style.width = "19%";
              break;
            case "medium":
              r.style.width = "32%";
              break;
            case "high":
              r.style.width = "44%";
              break;
            case "city":
              r.style.width = "58%";
              break;
            case "fullcity":
              r.style.width = "70%";
              break;
            case "italian":
              r.style.width = "82%";
              break;
            case "french":  
              r.style.width = "95%";
              break;
            default:
              break;
          }
        });
      }
      
      
      


      function funPopup(){

        //popup 리스트 초기화
        popList = "";

        data.beans.forEach(function(value, key){

          country = value.country;
          flag = value.flag;
          name = value.name;
          detail = value.detail;
          origin = value.origin;
          kind = value.kind;
          grade = value.grade;
          process = value.process;
          fragrance = value.fragrance;
          acidity = value.acidity;
          body = value.body;
          sweetness = value.sweetness;
          bitterness = value.bitterness;
          roasting = value.roasting;
          note = value.note;

          //note 정보 초기화
          noteGroup = [];


          //note 데이터를 배열에 저장
          for(var i in note){

            noteGroup.push(i);
            noteGroup.push(note[i]);

          }

          //popup
          popList += "<div class='bean_block'><div class='block_wrap'><div class='bean_top'>";
          popList += "<img src="+ flag +" /><div class='bean_title'>";
          popList += "<h4 class='f_20'>"+ country +"</h4>";
          popList += "<h3 class='f_25'>"+ name +"</h3></div><div class='bean_top_bg'><img src='../img/popup_" + country + ".jpg'></div></div>";
          popList += "<div class='exit'><span></span><span></span></div>";
          popList += "<p class='f_15'>"+ detail +"</p>";
          popList += "<table><tr><th>산지</th><td>"+ origin +"</td></tr>";
          popList += "<tr><th>품종</th><td>"+ kind +"</td></tr>";
          popList += "<tr><th>원두등급</th><td>"+ grade +"</td></tr>";
          popList += "<tr><th>가공방식</th><td>"+ process +"</td></tr></table>";
          popList += "<h2 class='f_20'>Cupping note</h2><div class='bean_bar'><div class='bar_left'>";
          popList += "<ul><li class='bean_frag'>향<span></span><span></span></li>";
          popList += "<li class='bean_acid'>산미<span></span><span></span></li>";
          popList += "<li class='bean_sweet'>단맛<span></span><span></span></li></ul></div>";
          popList += "<div class='bar_right'><ul><li class='bean_bitter'>쓴맛<span></span><span></span></li>";
          popList += "<li class='bean_body'>바디감<span></span><span></span></li>";
          popList += "<li class='bean_balance'>밸런스<span></span><span></span></li></ul></div></div>";

          popList += "<h2 class='f_20'>Taste</h2><div class='taste_icon'>";
          popList += "<ul><li><img src='"+ noteGroup[1] +"' /><p>"+ noteGroup[0] +"</p></li>";
          popList += "<li><img src='"+ noteGroup[3] +"' /><p>"+ noteGroup[2] +"</p></li>";
          popList += "<li><img src='"+ noteGroup[5] +"' /><p>"+ noteGroup[4] +"</p></li></ul></div>";

          popList += "<h2 class='f_20'>Roasting point</h2><div class='roasting'><span class='r_mobile'>"+ roasting +"</span>";
          popList += "<div class='roast_bar'><span></span><span></span><span>약로스팅(신맛)</span><span>강로스팅(쓴맛)</span></div></div>";
          popList += "<div class='roast_lev'><span class='back_lev'></span><ul class='float_lev'>";
          popList += "<li class='light'><span></span>light</li><li class='cinnamon'><span></span>cinnamon</li><li class='medium'><span></span>medium</li><li class='high'><span></span>high</li><li class='city'><span></span>city</li><li class='fullcity'><span></span>full city</li><li class='italian'><span></span>italian</li><li class='french'><span></span>french</li></ul></div></div></div>"
          
          roast.push(roasting); //로스팅 레벨 정보를 배열에 담음

          var topBg = document.querySelector('.bean_top_bg');
          // topBg.style.background = "url('../img/popup_" + country + ".jpg') no-repeat;";
                      
        });
        $('.popup').html(popList);
        setRoast(roasting); //로스팅 레벨 정보를 setRoast에 보내 실행

        
        
      }



      moreBtn = document.querySelectorAll(".bean_block .more");

      
      //moreBtn 클릭 이벤트
      moreBtn.forEach(function(btn, key){

        //반복문으로 버튼마다 클릭 이벤트 걸기
        btn.addEventListener('click',function(){

          
          //popup 창 요소들 선택하기
          popup = document.querySelector(".popup"),
          exit = document.querySelectorAll(".exit"),
          wrap = document.querySelector(".body_wrap"),
          beanBlock = document.querySelectorAll('.popup .bean_block');
          bodyWrap = document.querySelector('.body_wrap');

          var scrollY = window.pageYOffset;

          //스크롤된 위치에 맞춰 나타내기
          $('.popup .bean_block').eq(key).css('top', (scrollY + 500 )+'px');

          //배경 어둡게
          $('.body_wrap').fadeIn();

          //popup 나타내기
          $('.popup').fadeIn(100);
          $('.popup .bean_block').eq(key).fadeIn(100);
          

          //exit 클릭 이벤트
          exit.forEach(function(btn){
            btn.addEventListener('click',function(){
              $('.popup').fadeOut();
              $('.popup .bean_block').fadeOut();
              $('.body_wrap').fadeOut();
            });
          });
          
          //popup 바깥쪽 클릭 이벤트
          bodyWrap.addEventListener('click',function(){
            $('.popup').fadeOut();
            $('.popup .bean_block').fadeOut();
            $('.body_wrap').fadeOut();
          });


        });
      });

    },
  });


  //end
});
