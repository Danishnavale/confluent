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

 setData('hoGetList', JSON.stringify(data));
  var rtgsTotal = 0;
  for (var i = 0; i < data.length; i++) {
    rtgsTotal = rtgsTotal + parseFloat(data[i]['amountForTransfer']);
  }

  for (var i = 0; i < data.length; i++) {
    branch = data[i];

    $('.table-data tbody').append(
      `
      <tr>
        <td>${branch.beneficiaryName}</td>
        <td>${branch.paymentDescription}</td>
        <td>&#8377 ${branch.amountForTransfer}</td>
        <td>${branch.sapDocumentNumber}</td>
        <td align="right">
           <input type="checkbox" class="form-check-input checkbox" checked onchange="updateTotal();">
        </td>
      </tr>
      `
    );
  }
  $('.table-data tbody').append(
    `
    <tr class="table-secondary">
      <td colspan="2">
        <b>Total: </b>
      </td>
      <td colspan="3" id="total">
        &#8377 ${rtgsTotal}
      </td>
    </tr>
    `
  );
}

function updateTotal() {
  var sum = 0;

  for (var i = 0; i < $('.table tbody').children().length - 1; i++) {
    var row = $('.table tbody').children()[i];

    if (row.children[4].children[0].checked) {
      sum = sum + parseFloat(row.children[2].innerText.split(' ')[1]);
    }
  }

  $('#total').html('&#8377 ' + sum);
}


function selectAll() {

  if (document.querySelector('#checkbox-all').checked) {
    for (var i = 0; i < document.querySelectorAll('.checkbox').length; i++) {
      document.querySelectorAll('.checkbox')[i].checked = true;
    }
    $('#total').html('&#8377 ' + getData('fundReqL2').data.total);
  } else {
    for (var i = 0; i < document.querySelectorAll('.checkbox').length; i++) {
      document.querySelectorAll('.checkbox')[i].checked = false;
    }
    $('#total').html('&#8377 ' + 0);
  }
}



$(document).ready(function () {
  $('.nav-head').html('Fund Request for ' + getData('fundReqL2').type)
  appendData(getData('fundReqL2').data);
});



$('#approve').click(function (e) {
  e.preventDefault();
  var data = []

  for (var i = 0; i < $('.table tbody').children().length - 1; i++) {
    var row = $('.table tbody').children()[i];

    if (row.children[4].children[0].checked) {
      var rowData =  getData('hoGetList')[i].id;
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



  //
