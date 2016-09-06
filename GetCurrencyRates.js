var GetCurrencyRates = (function() {
    return {
      
      InitialDate: function() {
      var toDate = new Date ();
      var dd = toDate.getDate();
        if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth();
        if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
      return toDate;  
      },

      FinalDate: function() {
      var toDate = new Date();
      var dd = toDate.getDate();
        if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
        return toDate;
      }
    }
  }());

function generateChart() {
    document.getElementById("progress").style.display='block';
    setTimeout(function() { 
    var startDate = new Date(document.getElementById("start").value); 
    var endDate =  new Date(document.getElementById("finish").value);
    var rightnow = startDate;

    //создаем массив, который впоследствии будет содержать даты от и до
    var arrDate = []; 
    //массив, который в последствии будет содержать курс BYR к доллару
    var arrCourse = [];
    //массив цветов для столбов в зависимости от разницы в курсах
    var arrColor = ['#7cb5ec'];

    //функция создания массива дат для функции построения графика в формате YYYY-MM-DD
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

    //ajax-запрос, на выходе массив с данными по курсу валюты на выбранные даты arrCource
      function collectArrCource() {
          var endpoint = 'historical';
          var access_key = '38beb183813c14963a4b0813cd4f6640';
          var currencies = 'BYR';
  
          function getCource(i) {
            $.ajax({
                  
                  url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + arrDate[i] + '&currencies=' + currencies,   
                  dataType: 'json',
                  async: false,
                  
                  success: function(json) {
                    arrCourse.push(json.quotes.USDBYR);
                  }
              })
            };

            for (var i = 0; i < arrDate.length; i++) {
              getCource(i);
            }
        };
        
        createDateArray();
        collectArrCource();

        function getColorArray(arrCourse) {

          for (var i = 1; i < arrCourse.length; i++) {
            if (arrCourse[i] / arrCourse[i-1] >= 1.002) {
              arrColor.push('red');
            } else if (arrCourse[i] / arrCourse[i-1] <= 0.998) {
              arrColor.push('green');
            } else {
              arrColor.push('#7cb5ec');
            }
          };
          return arrColor;
        };

        getColorArray(arrCourse);
         
        Highcharts.theme = {
          colors: arrColor,
          title: {
            style: {
            color: '#000',
            font: 'bold 20px "Trebuchet MS", Verdana, sans-serif'
            }
          },
          chart: {
            type: 'column'
          },
          plotOptions: {
            series: {
                colorByPoint: true
            }
          },
          yAxis: {
            min: null,
            max: null
          }
        };
        Highcharts.setOptions(Highcharts.theme);

        $(function () {

          
                $('#container').highcharts({
                    
                    
                    title: {
                      text: 'The change rate of the BYR against the dollar over time'
                    }, 
                    
                    xAxis: {
                      categories: arrDate
                    },
                    
                    series: [{
                      data: arrCourse,
                      
                    }]
               
                });
          
        });
        document.getElementById("progress").style.display='none';
      }, 5000);
    };