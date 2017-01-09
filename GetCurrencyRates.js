var GetCurrencyRates = (function() {
  return {

    defaultInitialDate: function() {
      var toDate = new Date();
      var dd = toDate.getDate();
      if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth();
      if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
      return toDate;
    },

    defaultFinalDate: function() {
      var toDate = new Date();
      var dd = toDate.getDate();
      if (dd < 10) dd = '0' + dd;
      var mm = toDate.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      var yyyy = toDate.getFullYear();
      toDate = yyyy + '-' + mm + '-' + dd;
      return toDate;
    },


    generateChart: function() {
      document.getElementById("progress").style.display = 'block';

      var startDate = new Date(document.getElementById("start").value);
      var endDate = new Date(document.getElementById("finish").value);

      //функция создания массива дат для функции построения графика в формате YYYY-MM-DD
      function createDateArray(startDate, endDate) {
        var rightnow = startDate;
        var result = [];
        while (rightnow <= endDate) {
          var dd = rightnow.getDate();
          if (dd < 10) dd = '0' + dd;
          var mm = rightnow.getMonth() + 1;
          if (mm < 10) mm = '0' + mm;
          var yyyy = rightnow.getFullYear();
          var currentDate = yyyy + '-' + mm + '-' + dd;
          result.push(currentDate);
          rightnow.setDate(rightnow.getDate() + 1);
        }
        return result;
      };
      //создаем массив, который впоследствии будет содержать даты от и до
      var arrDate = createDateArray(startDate, endDate);
      //ajax-запрос, на выходе массив с данными по курсу валюты на выбранные даты arrCourse
      function collectArrCourse(arrDate) {
        var endpoint = 'historical';
        var access_key = '38beb183813c14963a4b0813cd4f6640';
        var currencies = 'BYR';
        var arrCourse = [];
        var i = 0;

        function getCourse(i) {
          $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + arrDate[i] + '&currencies=' + currencies,
            dataType: 'jsonp',
            success: function(json) {
              arrCourse.push(json.quotes.USDBYR);
              i++;
              if (i < arrDate.length) {
                getCourse(i);
              } else {

                var arrColor = getColorArray(arrCourse);
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

                var chart = $('#container').highcharts({


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
                document.getElementById("progress").style.display = 'none';

              }
            }
          })
        }
        getCourse(i);
      };

      collectArrCourse(arrDate);

      function getColorArray(arrCourse) {
        var result = ['#7cb5ec'];
        for (var i = 1; i < arrCourse.length; i++) {
          if (arrCourse[i] / arrCourse[i - 1] >= 1.002) {
            result.push('red');
          } else if (arrCourse[i] / arrCourse[i - 1] <= 0.998) {
            result.push('green');
          } else {
            result.push('#7cb5ec');
          }
        };
        return result;
      }
    }
  }
})();
