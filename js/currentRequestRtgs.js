// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran

// var data = getData('HoCurrentRequestData');
var rtgsData;
var place;
if (checkData('approveAmt')) {
  deleteData('approveAmt');
}

$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});

function showModal(elem) {

  console.log('clicked');
  var id = elem.id;
  place = id.split('-')[1];
  var type = 'rtgs'

  console.log(place);

  $('.table-data-distributed tbody').html('');

  for (var i = 0; i < rtgsData.length; i++) {
    var branch = rtgsData[i];

    if (branch.branch == place) {
      // var distributedData = {
      //   'place': place,
      //   'type': type,
      //   'rtgsData': branch.rtgsData
      // };

      for (var i = 0; i < branch.getFTlistL2L3ResponseList.length; i++) {
        var e = branch.getFTlistL2L3ResponseList[i];
        $('.table-data-distributed tbody').append(
          `
            <tr>
              <td>${e.beneficiaryName}</td>
              <td>${e.paymentDescription}</td>
              <td>${e.sapDocumentNumber}</td>
              <td>${e.amountForTransfer}</td>
              <td><input id="${e.beneficiaryName}-${e.amountForTransfer}" type="checkbox" name="checkboxes" value="${e.amountForTransfer}"></td>
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
          <th scope="row">${branch.branch}</th>
          <td onclick="showModal(this);" class="click-tab" id="rtgs-${branch.branch}">${branch.amount}</td>
          <td><input onkeyup="appendNearestAmount(this);" class="approveInput" id="input-${branch.branch}-rtgs" type="number" value="${branch.amount}"></td>
          <td></td>
        </tr>
      `
    );
  }
}
// onclick="clickTab(this);"
$(document).ready(function () {

  $.ajax({
      url: url + 'api/ho/approve', //url to server
      type: 'GET',
      crossDomain: true,
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {
        rtgsData = data;
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

  for (var i = 0; i < rtgsData.length; i++) {
    if (branch == rtgsData[i].branch) {
      for (var j = 0; j < rtgsData[i]['getFTlistL2L3ResponseList'].length; j++) {
        reqData.push(rtgsData[i]['getFTlistL2L3ResponseList'][j]['amountForTransfer']);
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
  var type = 'rtgs';

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

  for (var i = 0; i < rtgsData[0]['getFTlistL2L3ResponseList'].length; i++) {

    e = {
      'approved': true,
      'id': rtgsData[0]['getFTlistL2L3ResponseList'][i]['id'],
      'requestAmount': parseFloat(arrayOfElements[i].value)
    }

    sendData.push(e);
  }

  console.log(sendData);

  $.ajax({
      url: url + 'api/ho/approve', //url to server
      type: 'POST',
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
      data: JSON.stringify(sendData),
      dataType: 'json',
      contentType: 'application/json',
  });

});









//
