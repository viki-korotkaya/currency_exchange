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
       

    //функция создания массива дат для функции построения графика в формате YYYY-MM-DD
    function createDateArray() {
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
    var arrDate = createDateArray();
    //ajax-запрос, на выходе массив с данными по курсу валюты на выбранные даты arrCource
      function collectArrCourse() {
          var endpoint = 'historical';
          var access_key = '38beb183813c14963a4b0813cd4f6640';
          var currencies = 'BYR';
          var result = [];
          function getCourse(i) {
            $.ajax({
                  
                  url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key + '&date=' + arrDate[i] + '&currencies=' + currencies,   
                  dataType: 'json',
                  async: false,
                  
                  success: function(json) {
                    result.push(json.quotes.USDBYR);
                  }
              })
            };

            for (var i = 0; i < arrDate.length; i++) {
              getCourse(i);
            }
            return result;
        };
        
        
        var arrCourse = collectArrCourse();

        function getColorArray(arrCourse) {
          var result = ['#7cb5ec'];
          for (var i = 1; i < arrCourse.length; i++) {
            if (arrCourse[i] / arrCourse[i-1] >= 1.002) {
              result.push('red');
            } else if (arrCourse[i] / arrCourse[i-1] <= 0.998) {
              result.push('green');
            } else {
              result.push('#7cb5ec');
            }
          };
          return result;
        };

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
          
        
        document.getElementById("progress").style.display='none';
      }, 5000);
    };