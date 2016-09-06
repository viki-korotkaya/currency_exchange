"use strict";
  $(document).ready(function(){
    document.getElementById("finish").value = GetCurrencyRates.FinalDate();
    document.getElementById("start").value = GetCurrencyRates.InitialDate(); 
    document.getElementById("button").onclick = generateChart;
  });  
    
    

    

    



           