// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran


$('#logout').click(function () {
  Nav.assign('login.html');
});


$('#goBack').click(function () {
  Nav.back();
});


$(document).ready(function () {

  if(checkData('chequePrintData')) {
    $('#benSpan').html(getData('chequePrintData').beneficiary);
    $('#amtSpan').html(getData('chequePrintData').amt);
  } else {
    Nav.replace('chequeViewL1.html');
  }


});


$('#print').click(function (e) {

  e.preventDefault();

  var chequeNo = $('#chequeInput').val().trim(),
      sapNo = $('#sapInput').val().trim(),
      date = $('#dateInput').val().trim(),
      amount = $('#amtSpan').html().trim(),
      beneficiary = $('#benSpan').html().trim();

  var data = {
    'chequeNo': chequeNo,
    'sapNo': sapNo,
    'date': date,
    'amount': amount,
    'beneficiary': beneficiary
  }

  if (chequeNo && sapNo && date) {
    console.log(data);
    // alert('Success');
    var doc = new jsPDF({
      orientation: 'landscape'
    });

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.addImage(imgData, 'JPEG', 0, 0,  180, 160);
    doc.text(26, 65, beneficiary);
    doc.setFontSize(16);
    doc.text(145, 59, date);
    doc.setFontSize(18);
    // doc.text(145, 80, String('₹ ' + amount));
    doc.text(135, 84, amount);
    doc.text(70, 120, chequeNo);

    doc.save(String('cheque-number-' + chequeNo));

  } else {
    alert('Please fill all the fields');
  }

});
















//
