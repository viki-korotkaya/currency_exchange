"use strict";
$(document).ready(function() {
  // Возможно, вы меня неправильно поняли, но разве в этом месте мы присваиваем Финальную дату и начальную дату, которую нельзя никак поменять??
  // Подсказка: я имею ввиду, что непонятно, что происходит, если смотреть на названия методов
  document.getElementById("finish").value = GetCurrencyRates.FinalDate();
  document.getElementById("start").value = GetCurrencyRates.InitialDate();
  document.getElementById("button").onclick = generateChart;
});
