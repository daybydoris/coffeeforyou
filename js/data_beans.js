$(function () {
  //start

  $.ajax({
    url: "https://graphicnovel.github.io/coffeeforyou/data_beans.json",
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
        note,
        beanList = "",
        fragCal = [],
        acidCal = [],
        sweetCal = [],
        bitterCal = [],
        bodyCal = [];

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
          // beanList += "<li class='bean_balance'>밸런스" + balance + "<span></span><span></span>";
          // beanList += "</li>";
          beanList += "</ul>";
          beanList += "</div></div></li>";

          // var fragBar = document.querySelector('.bean_bar ul .bean_frag span:nth-of-type(2)');
          
          // 수치 계산 후 배열 저장
          function cal(nameCal, status){
            nameCal.push(75 / 5 * status);
          }
          cal(fragCal, fragrance);
          cal(acidCal, acidity);
          cal(sweetCal, sweetness);
          cal(bitterCal, bitterness);
          cal(bodyCal, body); 
        });
        $(".bean_list ul").append(beanList);
        
        //각 특징별 수치 입력
        function setBar(nameBar, className, nameCal){
          var nameBar = document.querySelectorAll(".bean_bar ul ."+ className +" span:nth-of-type(2)");

          for(var i=0;i<nameBar.length;i++){
            nameBar[i].style.width = nameCal[i] + "%";
          }
        }

        setBar("fragBar", "bean_frag", fragCal);
        setBar("acidBar", "bean_acid", acidCal);
        setBar("sweetBar", "bean_sweet",sweetCal);
        setBar("bitterBar", "bean_bitter",bitterCal);
        setBar("bodyBar", "bean_body",bodyCal);         
      }
      funList();
    },
  });


  //end
});
