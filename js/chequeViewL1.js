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

if (checkData('chequePrintData')) {
  deleteData('chequePrintData');
}

// ================================================================
// ================================================================

var data = [
  {
    'beneficiary': 'Manali',
    'amount': 10000,
    'status': 'approved'
  },
  {
    'beneficiary': 'Mihir',
    'amount': 20000,
    'status': 'awaiting'
  },
  {
    'beneficiary': 'Chetan',
    'amount': 30000,
    'status': 'printed'
  }
]

$(document).ready(function () {

  for (var i = 0; i < data.length; i++) {
    var cheque = data[i]

    if (cheque.status.trim() == 'approved') {
      $('.table tbody').append(`
        <tr>
          <td>${cheque.beneficiary}</td>
          <td>${cheque.amount}</td>
          <td>Funds Ready</td>
          <td><button onclick="toPrint(this);" class="btn btn-outline-info btn-sm" id="${cheque.beneficiary}-${cheque.amount}">Print</button></td>
        </tr>
      `);
    } else if (cheque.status.trim() == 'printed') {
      $('.table tbody').append(`
        <tr>
          <td>${cheque.beneficiary}</td>
          <td>${cheque.amount}</td>
          <td>Cheque Already Printed</td>
          <td><button onclick="toPrint(this);" class="btn btn-outline-info btn-sm" id="${cheque.beneficiary}-${cheque.amount}">Print</button></td>
        </tr>
      `);
    } else if (cheque.status.trim() == 'awaiting') {
      $('.table tbody').append(`
        <tr>
          <td>${cheque.beneficiary}</td>
          <td>${cheque.amount}</td>
          <td>Funds Awaiting</td>
          <td><button disabled class="btn btn-outline-info btn-sm" id="${cheque.beneficiary}-${cheque.amount}">Print</button></td>
        </tr>
      `);
    } else {
      console.log('Error in appending data to table');
    }
  }

});



function toPrint(str) {

  var ben = str.id.split('-')[0];
  var amt = str.id.split('-')[1];

  data = {
    'beneficiary': ben,
    'amt': amt
  }

  setData('chequePrintData', JSON.stringify(data));
  Nav.assign('chequePrint.html');

}

















//
