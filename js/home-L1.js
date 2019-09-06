// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for home page of mahavitaran



$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#fReqDiv').click(function () {
  Nav.assign('fundRequestAmount.html');
});

$('#chequePrintDiv').click(function () {
  Nav.assign('chequeViewL1.html');
});

$('#benMaster').click(function () {
  Nav.assign('benMaster.html');
});

if (checkData('fundRequestAmountData')) {
  deleteData('fundRequestAmountData');
}


















//
