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



function appendData(data) {

	setData('l3GetList', JSON.stringify(data));
  for (var i = 0; i < data.length; i++) {
    branch = data[i];

    $('.table-data tbody').append(
      `
      <tr>
        <td>${branch.beneficiaryName}</td>
        <td>${branch.paymentDescription}</td>
        <td>${branch.amountForTransfer}</td>
        <td>${branch.sapDocumentNumber}</td>
        <td align="right">
           <input type="checkbox" class="form-check-input checkbox">
        </td>
      </tr>
      `
    );
  }
}


$(document).ready(function () {

  $.ajax({
      url: url + 'api/branchftpayments/requests', //url to server
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {
        appendData(data);
        $('.table-data').addClass('table-hover');
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



function selectAll() {

  if (document.querySelector('#checkbox-all').checked) {
    for (var i = 0; i < document.querySelectorAll('.checkbox').length; i++) {
      document.querySelectorAll('.checkbox')[i].checked = true;
    }
  } else {
    for (var i = 0; i < document.querySelectorAll('.checkbox').length; i++) {
      document.querySelectorAll('.checkbox')[i].checked = false;
    }
  }
}


$('#pay').click(function (e) {
  e.preventDefault();
  var data = []

  for (var i = 0; i < $('.table tbody').children().length; i++) {
    var row = $('.table tbody').children()[i];

    if (row.children[4].children[0].checked) {
      var rowData =  getData('l3GetList')[i].id;
	  console.log(rowData);
	  var id = rowData;
	  var idstg = ''+id;
      data.push(idstg);
    }
  }

  if(Array.isArray(data) && data.length){
var idarrayobj = {
      'ftIds':data
    };

var idarrayobjs = JSON.stringify(idarrayobj);
  console.log(idarrayobjs);
     $.ajax({
        url: url + 'api/branchftpayments/requests/approve', //url to server
        type: 'PUT',
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
        },
        //Ajax events
        success: function(data) {
          console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // console.log(jqXHR + textStatus + errorThrown);
          // alert('');
        },
        data: idarrayobjs,
        dataType: 'json',
        contentType: 'application/json',
    });
} else {
    alert('Please fill all the fields');
  }

});



$('#rework').click(function (e) {
  e.preventDefault();
  var data = []

  for (var i = 0; i < $('.table tbody').children().length; i++) {
    var row = $('.table tbody').children()[i];

    if (row.children[4].children[0].checked) {
      var rowData = {
        'payee': row.children[0].innerText,
        'desc': row.children[1].innerText,
        'amount': row.children[2].innerText,
        'sapno': row.children[3].innerText
      }
      data.push(rowData);
    }
  }

  console.log(data);

});




// ==========================================================================

var data = [
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


];


//
