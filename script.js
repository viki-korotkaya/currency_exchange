"use strict";
  $(document).ready(function(){
    function getValue() {
      var toDate = new Date ();
      var dd = toDate.getDate();
        if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
        return toDate;  
    }
    document.getElementById("finish").value = getValue();
  });

$(document).ready(function(){
    function getValueStart() {
      var toDate = new Date ();
      var dd = toDate.getDate();
        if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth();
        if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
      return toDate;  
    } 
    document.getElementById("start").value = getValueStart();
  });


  function generateChart() {

      var startDate = new Date(document.getElementById("start").value); 
      var endDate =  new Date(document.getElementById("finish").value);
      var rightnow = startDate;
      //создаем массив, который впоследствии будет содержать даты от и до
      var arrDate = []; 
      //массив, который в последствии будет содержать курс BYR к доллару
      var arrCourse = [];


        /*перебираем даты от начала до конца и преобразуем каждую в формат, 
        используемый в $.ajax и добавляем в массив arrDate*/
        function createDateArray() {
          while (rightnow <= endDate) {
            var dd = rightnow.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = rightnow.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yyyy = rightnow.getFullYear();
            var currentDate = yyyy + '-' + mm + '-' + dd;
            arrDate.push(currentDate);
            rightnow.setDate(rightnow.getDate() + 1);
          }
        };

        /*непосредственно сам $.ajax, который на выходе дает массив arr с данными
        по курсам валюты*/
        function getData() {
          var endpoint = 'historical';
          var access_key = '14fb98202ccbd5ece920f774327855a3';
          var currencies = 'BYR';
  
            function go(i) {
              $.ajax({
                  url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + arrDate[i] + '&currencies=' + currencies,   
                  dataType: 'json',
                  async: false,
                  success: function(json) {
                    arrCourse.push(json.quotes.USDBYR);
                  }
              })
            }

            for (var i = 0; i < arrDate.length; i++) {
              go(i);
            }
        };

        createDateArray();
        getData();

        //функция построения графика
        $(function () {

                $('#container').highcharts({
                    chart: {
                       type: 'column'
                    },
                    title: {
                      text: 'The change rate of the BYR against the dollar over time'
                    }, 
                    plotOptions: {
                        series: {
                            colorByPoint: true
                          }
                    },
                    xAxis: {
                      categories: arrDate
                    },
                    yAxis: {
                      min: null,
                      max: null
                    },
                    series: [{
                      data: arrCourse
                    }]
               
                });
          
        });
    };
    
    
    

    

    



           