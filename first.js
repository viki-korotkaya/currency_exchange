"use strict";
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