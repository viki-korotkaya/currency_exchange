"use strict";
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