"use strict";
$(document).ready(function() {
  
  document.getElementById("finish").value = GetCurrencyRates.defaultFinalDate();
  document.getElementById("start").value = GetCurrencyRates.defaultInitialDate();
  document.getElementById("button").onclick = GetCurrencyRates.generateChart;
});
