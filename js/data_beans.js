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
        note,
        beanList = "";

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
          balance;
          roasting = value.roasting;

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
          beanList += "<li>향<span></span><span></span></li>";
          beanList += "<li>산미<span></span><span></span></li>";
          beanList += "<li>단맛<span></span><span></span></li>";
          beanList += "<li>쓴맛<span></span><span></span></li>";
          beanList += "<li>바디감<span></span><span></span></li>";
          // beanList += "<li>" + balance + "<span></span>";
          // beanList += "<span></span>";
          // beanList += "</li>";
          beanList += "</ul>";
          beanList += "</div></div></li>";
        });
        $(".bean_list ul").append(beanList);
      }
      funList();
    },
  });

  //end
});
