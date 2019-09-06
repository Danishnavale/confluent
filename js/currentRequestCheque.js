// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran

var data = getData('HoCurrentRequestData');
var place;
if (checkData('approveAmt')) {
  deleteData('approveAmt');
}

$('#logout').click(function () {
  Nav.assign('login.html');
});


$('#goBack').click(function () {
  Nav.back();
});

function showModal(elem) {

  console.log('clicked');
  var id = elem.id;
  place = id.split('-')[1];
  var type = 'cheque'

  console.log(place);

  $('.table-data-distributed tbody').html('');

  for (var i = 0; i < data.length; i++) {
    var branch = data[i];

    if (branch.place == place) {
      // var distributedData = {
      //   'place': place,
      //   'type': type,
      //   'chequeData': branch.chequeData
      // };

      for (var i = 0; i < branch.chequeData.length; i++) {
        var e = branch.chequeData[i];
        $('.table-data-distributed tbody').append(
          `
            <tr>
              <td>${e.beneficiary}</td>
              <td>${e.desc}</td>
              <td>${e.sapno}</td>
              <td>${e.amount}</td>
              <td><input id="${e.beneficiary}-${e.amount}" type="checkbox" name="checkboxes" value="${e.amount}"></td>
            </tr>
          `
        );
      }

      // setData('distributedData', JSON.stringify(distributedData));


      $('#myModal').modal('show');
    }
  }
}


function appendData(data) {
  for (var i = 0; i < data.length; i++) {
    branch = data[i];

    $('.table-data tbody').append(
      `
        <tr>
          <th scope="row">${branch.place}</th>
          <td onclick="showModal(this);" class="click-tab" id="cheque-${branch.place}">${branch.totalCheque}</td>
          <td><input onkeyup="appendNearestAmount(this);" class="approveInput" id="input-${branch.place}-cheque" type="number" value="${branch.totalCheque}"></td>
          <td></td>
        </tr>
      `
    );
  }
}
// onclick="clickTab(this);"
$(document).ready(function () {
  appendData(data);
  if (checkData('distributedData')) {
    deleteData('distributedData');
  }
});


// ===========================================================================


function appendNearestAmount(e) {
  var branch = e.id.split('-')[1];
  var reqData = [];
  // console.log(e.value);

  for (var i = 0; i < data.length; i++) {
    if (branch == data[i].place) {
      for (var j = 0; j < data[i]['chequeData'].length; j++) {
        reqData.push(data[i].chequeData[j]['amount']);
      }
      break;
    }
  }

  nearestAmt = getNearestAmount(reqData, e.value);
  var str;
  if (nearestAmt[0] && nearestAmt[1]) {
    str = '&#8377 ' + nearestAmt[0] + '  or  &#8377 ' + nearestAmt[1];
  } else if (nearestAmt[0] == '') {
    str = '&#8377 ' + nearestAmt[1];
  } else {
    str = '&#8377 ' + nearestAmt[0];
  }
  e.parentElement.nextElementSibling.innerHTML = str;

};



function getNearestAmount(arr, amt) {
  var i = 0,
      low = 0,
      high = 0;

  while (1) {
    high = high + arr[i];
    i++;
    if (high <= amt) {
      low = high;
    } else {
      break;
    }
    if(i > arr.length - 1){
      break;
    }
  }
  if (low == 0) {
    low = '';
  }
  if (low == high) {
    high = '';
  }
  return [low, high];
}


$('#save').click(function () {
  var sum = 0;
  var checkboxArr = [];
  var type = 'cheque';

  for (var i = 0; i < $('input[name="checkboxes"]:checked').length; i++) {
    var j = $('input[name="checkboxes"]:checked')[i];
    sum = sum + parseFloat(j.value);
    checkboxArr.push(j.id);
  }

  if (sum > 0) {
    if (checkData('approveAmt')) {
      var data = getData('approveAmt');
      data.push({
        'place': place,
        'type': type,
        'sum': sum,
        'checkboxArr': checkboxArr
      });

      setData('approveAmt', JSON.stringify(data));
    } else {
      setData('approveAmt', JSON.stringify([{
        'place': place,
        'type': type,
        'sum': sum,
        'checkboxArr': checkboxArr
      }]));
    }
  }

  updateInputField(getData('approveAmt'))
  $('#myModal').modal('hide');
});

function updateInputField(arr) {
  for (var i = 0; i < arr.length; i++) {
    var idElem = '#input-' + arr[i]['place'] + '-' + arr[i]['type'];
    if ($(idElem)) {
      $(idElem).val(arr[i].sum);
    }
  }
}


$('#submit').click(function () {

  var sendData = []
  var arrayOfElements = document.getElementsByClassName('approveInput');

  for (var i = 0; i < data.length; i++) {

    e = {
      'branch': data[i]['place'],
      'totalRequested': data[i]['totalCheque'],
      'totalApproved': parseFloat(arrayOfElements[i].value)
    }

    sendData.push(e);
  }

  console.log(sendData);

  // $.ajax({
  //     url: 'http://127.0.0.1/', //url to server
  //     type: 'POST',
  //     //Ajax events
  //     success: function(data) {
  //       //
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       //
  //     },
  //     data: sendData,
  // });

});














//
