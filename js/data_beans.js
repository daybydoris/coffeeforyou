$(function () {
  //start

  $.ajax({
    url: "/data_beans.json",
    type: "GET",
    success: function (data) {
      var country,
        flag,
        name,
        detail,
        origin,
        kind,
        grade,
        process,
        fragrance,
        acidity,
        body,
        sweetness,
        bitterness,
        balance,
        roasting,
        note = [],
        beanList = "",
        popList = "",
        fragCal = [],
        acidCal = [],
        sweetCal = [],
        bitterCal = [],
        bodyCal = [],
        balCal = [],
        moreBtn, popup, beanBlock, exit, wrap;
      
      function funList() {
        //상품 리스트 초기화
        beanList = "";
        

        data.beans.forEach(function (value, key) {
          //각 변수에 값 넣기
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

          // value.note.foreach(function (el, key){
          //   note.push(el);
          // });
          var aa = value.note;
          for(var i in aa){
            // console.log('key',i)
            // console.log('value',aa[i])
          }

          var first_key = Object.keys(value.note)[0];
          var first_value = value.note[Object.keys(value.note)[0]];

          // console.log(first_key);
          // console.log(first_value);
          

          balance = (fragrance + acidity + body +  sweetness + bitterness) / 5;
          // console.log(balance);
          // console.log(fragrance);

          //html 태그 넣기
          beanList += "<li class='bean_block'>";
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

          //수치 계산
          cal(fragCal, fragrance);
          cal(acidCal, acidity);
          cal(sweetCal, sweetness);
          cal(bitterCal, bitterness);
          cal(bodyCal, body);
          cal(balCal, balance); 

        });
        $(".bean_list ul").append(beanList); //beanList 화면에 뿌리기

        //bar width 설정
        setBar("fragBar", "bean_frag", fragCal);
        setBar("acidBar", "bean_acid", acidCal);
        setBar("sweetBar", "bean_sweet", sweetCal);
        setBar("bitterBar", "bean_bitter", bitterCal);
        setBar("bodyBar", "bean_body", bodyCal);
        setBar("balBar", "bean_balance", balCal);

      }
      funList();


      // ------------- funList 실행 끝 --------------- //



      // bar 수치 계산 후 배열 저장
      function cal(nameCal, status){
        nameCal.push(75 / 5 * status);
      }

      //각 특징별 수치 입력
      function setBar(nameBar, className, nameCal){
        var nameBar = document.querySelectorAll(".bean_bar ul ."+ className +" span:nth-of-type(2)");
        var nameBarPop = document.querySelectorAll(".popup .bean_bar ul ."+ className +" span:nth-of-type(2)");

        console.log(nameBarPop);

        for(var i=0;i<nameBar.length;i++){
          nameBar[i].style.width = nameCal[i] + "%";
          if(className == "bean_balance"){
            nameBar[i].style.background = "#e1421d";
          }
        }

      }
      
      moreBtn = document.querySelectorAll(".bean_block .more");

      //moreBtn 클릭 이벤트
      moreBtn.forEach(function(btn, key){
        //popup 생성
        funPopup();
        
        btn.addEventListener('click',function(){
          //popup 창 요소들 선택하기
          popup = document.querySelector(".popup"),
          exit = document.querySelectorAll(".exit"),
          wrap = document.querySelector(".body_wrap"),
          beanBlock = document.querySelectorAll('.popup .bean_block');
      
          //popup 나타내기
          popup.classList.add('active');
          beanBlock[key].classList.add('active');
          
          //exit 클릭 이벤트
          exit.forEach(function(btn){
            btn.addEventListener('click',function(){
              popup.classList.remove('active');
              beanBlock[key].classList.remove('active');
            });
          });
          
        });
      });


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

          //popup
          popList += "<div class='bean_block'><div class='block_wrap'><div class='bean_top'>";
          popList += "<img src="+ flag +" /><div class='bean_title'>";
          popList += "<h4 class='f_20'>"+ country +"</h4>";
          popList += "<h3 class='f_25'>"+ name +"</h3></div></div>";
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
          popList += "<ul><li><img src='"+ note[0] +"' /><p>wine</p></li>";
          popList += "<li><img src='"+ note[1] +"' /><p>brownsugar</p></li>";
          popList += "<li><img src='"+ note[2] +"' /><p>grapefruit</p></li></ul></div>";

          popList += "<h2 class='f_20'>Roasting point</h2><div class='roasting'><span class='r_mobile'>full city</span>";
          popList += "<div class='roast_bar'><span>약로스팅(신맛)</span><span>강로스팅(쓴맛)</span></div></div>";
          popList += "<div class='roast_lev'><span class='back_lev'></span><ul class='float_lev'>";
          popList += "<li><span></span>light</li><li><span></span>cinnamon</li><li><span></span>medium</li><li><span></span>high</li><li><span></span>city</li><li><span></span>full city</li><li><span></span>italian</li><li><span></span>french</li></ul></div></div></div>"
        });
        $('.popup').html(popList);

      }


    },
  });


  //end
});
