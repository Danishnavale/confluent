// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request Amount page of mahavitaran


$(document).ready(function () {

  if (checkData('fundRequestAmountData')) {
    var amountData = getData('fundRequestAmountData');

    $('#chequeAmt').val(amountData.chequeAmount);
    $('#rtgsAmt').val(amountData.rtgsAmount);
    $('#cardAmt').val(amountData.cardAmount);
  }

});


$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});


$('#next').click(function () {
  var chequeAmount = $('#chequeAmt').val();
  var rtgsAmount = $('#rtgsAmt').val();

  if (checkData('fundRequestAmountData')) {
    deleteData('fundRequestAmountData');
  }


  if (chequeAmount || rtgsAmount) {
    var amountData = {
      'chequeAmount' : chequeAmount,
      'rtgsAmount' : rtgsAmount,
    };

    setData('fundRequestAmountData', JSON.stringify(amountData));
    Nav.assign('fundRequest.html');
  } else {
    alert('Please fill atleast one field')
  }

});










//
