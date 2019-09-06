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



function appendData(data) {
  for (var i = 0; i < data.length; i++) {
    branch = data[i];

    $('.table-data tbody').append(
      `
      <tr>
        <td>${branch.payee}</td>
        <td>${branch.desc}</td>
        <td>${branch.amount}</td>
        <td>${branch.sapno}</td>
        <td align="right">
           <input type="checkbox" class="form-check-input checkbox">
        </td>
      </tr>
      `
    );
  }
}


$(document).ready(function () {
  appendData(data);
  $('.table-data').addClass('table-hover');
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
