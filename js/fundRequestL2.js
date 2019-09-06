// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran


$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});


var rtgsData;


$(document).ready(function () {

  $.ajax({
      url: url + 'api/branchftpayments/requests', //url to server
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {

        var rtgsTotal = 0;
        rtgsData = data;
		//setData('hoGetList', JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
          rtgsTotal = rtgsTotal + parseFloat(data[i]['amountForTransfer']);
        }

        document.getElementById('cheque').innerText = chequeData.total;
        document.getElementById('rtgs').innerText = rtgsTotal;

        if (checkData('fundReqL2')) {
          deleteData('fundReqL2');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // console.log(jqXHR + textStatus + errorThrown);
        // alert('');
      },
      data: '',
      dataType: 'json',
      contentType: 'application/json',
  });

});

$('td').click(function (e) {
  e.preventDefault();

  if ($(this).attr('id').trim() == 'cheque') {
    setData('fundReqL2', JSON.stringify({'type': 'Cheque', 'data': chequeData}));
  } else {
    setData('fundReqL2', JSON.stringify({'type': 'RTGS', 'data': rtgsData}));
  }

  Nav.assign('fundRequestAmountL2.html');


});



// ==========================================================================


var chequeData = {
    'place': 'Mumbai',
    'total': 40000,
    'data': [
      {
        'payee': 'A',
        'amount': 10000,
        'desc': 'X bank',
        'sapno': 1234,
      },
      {
        'payee': 'B',
        'amount': 6000,
        'desc': 'Y bank',
        'sapno': 5678,
      },

     {
        'payee': 'C',
        'amount': 4000,
        'desc': 'Z bank',
        'sapno': 91011,
      },
    {
        'payee': 'D',
        'amount': 20000,
        'desc': 'W bank',
        'sapno': 1213,
      }
    ],
  };




// var rtgsData = {
//     'place': 'Mumbai',
//     'total': 50000,
//     'data': [
//       {
//         'payee': 'A',
//         'amount': 10000,
//         'desc': 'X bank',
//         'sapno': 1234,
//       },
//       {
//         'payee': 'B',
//         'amount': 12000,
//         'desc': 'Y bank',
//         'sapno': 5678,
//       },
//
//       {
//         'payee': 'C',
//         'amount': 8000,
//         'desc': 'Z bank',
//         'sapno': 91011,
//       },
//       {
//         'payee': 'D',
//         'amount': 20000,
//         'desc': 'W bank',
//         'sapno': 1213,
//       }
//     ]
//   };










  //
