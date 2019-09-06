// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran

var benList;

$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});

if (checkData('chequePrintData')) {
  deleteData('chequePrintData');
}


$(document).ready(function () {
  $('#exampleModal2 h3').html('Loading');
  $('#exampleModal2').modal('show');

  $.ajax({
      url: url + 'api/bene-record/bene', //url to server
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {
        benList = data;
        for (var i = 0; i < data.length; i++) {
          var ben = data[i];
          $('.table-div .table tbody').append(`
            <tr>
              <td>${ben.beneficiaryName}</td>
              <td>${ben.beneficiaryUid}</td>
              <td>${ben.beneficiaryAddress}</td>
              <td>${ben.beneficiaryBankAccountNumber}</td>
              <td>${ben.beneficiaryBankIfsc}</td>
              <td>${ben.beneficiaryMobile}</td>
              <td>${ben.beneficiaryEmail}</td>
            </tr>
          `);
          $('.table-div-modal .table tbody').append(`
            <tr>
              <td><input class="form-control" type="text" value="${ben.beneficiaryName}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryUid}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryAddress}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryBankAccountNumber}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryBankIfsc}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryMobile}"></td>
              <td><input class="form-control" type="text" value="${ben.beneficiaryEmail}"></td>
            </tr>
          `);
        }
        setTimeout(function () {
          $('#exampleModal2').modal('hide');
        }, 1000);
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


// ================================================================
// ================================================================

// var data = [
//   {
//     'name': 'Manali',
//     'id': 10000,
//     'city': 'Pune',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'manali@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   },
//   {
//     'name': 'Mihir',
//     'id': 20000,
//     'city': 'Mumbai',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'mihir@mail.com'
//   },
//   {
//     'name': 'Chetan',
//     'id': 30000,
//     'city': 'Delhi',
//     'acno': '1234MNBV',
//     'ifsc': 'POIUI1234567',
//     'phone': 9876543210,
//     'email': 'chetan@mail.com'
//   }
// ]
//
// $(document).ready(function () {
//
//   for (var i = 0; i < data.length; i++) {
//     var cheque = data[i]
//     $('.table-div .table tbody').append(`
//       <tr>
//         <td>${cheque.name}</td>
//         <td>${cheque.id}</td>
//         <td>${cheque.city}</td>
//         <td>${cheque.acno}</td>
//         <td>${cheque.ifsc}</td>
//         <td>${cheque.phone}</td>
//         <td>${cheque.email}</td>
//       </tr>
//     `);
//   }
//
// });


$('#submit').click(function () {

  var name = $('#name').val().trim(),
      city = $('#city').val().trim(),
      acno = $('#acno').val().trim(),
      ifsc = $('#ifsc').val().trim(),
      phone = $('#phone').val().trim(),
      email = $('#email').val().trim();

  if (!phone && !email) {
    phone = '0000000000';
    email = 'abc@blank.com';
  }


  if (name && city && acno && ifsc) {

  // if (name!==null && city!==null && acno!==null && ifsc!==null && phone!==null && email!==null && email.length &&
  // name.length && city.length && acno.length && ifsc.length && phone.length) {

    $('#exampleModal2 h3').html('Sending Request... Please Wait');
    $('#exampleModal2').modal('show');

    var data = [{
      'beneficiaryAddress': city,
      'beneficiaryBankAccountNumber': String(acno),
      'beneficiaryBankIfsc': ifsc,
      'beneficiaryEmail': email,
      'beneficiaryMobile': String(phone),
      'beneficiaryName': name,
    }];

    data = JSON.stringify(data);
    console.log(data);

    // console.log(data);
    // var authorizationToken = getData('user').tokenType + getData('user').accessToken;

    $.ajax({
        url: url + 'api/bene-record/bene', //url to server
        type: 'POST',
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
        },
        //Ajax events
        success: function(data) {
          $('#exampleModal2').modal('hide');
          console.log(data);
    		  alert('Done');
          window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // console.log(jqXHR + textStatus + errorThrown);
          // alert('');
          $('#exampleModal2 .container').html('Some Error has occured. Try again or refresh the page');
        },
        data: data,
        dataType: 'json',
        contentType: 'application/json',
    });


  } else {
    alert('Please fill all the fields. Only Phone and Email are not mandatory.');
  }



});


$('#saveBen').click(function () {

  var changedArr = getUpdatedBene(document.getElementsByClassName('table-div-modal')[0].children[0].children[1].children, benList);

  // console.log(changedArr);
  if (changedArr.length) {

    $.ajax({
        url: url + 'api/bene-record/bene', //url to server
        type: 'PUT',
        beforeSend: function(request) {
          request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
        },
        //Ajax events
        success: function(data) {
          $('#exampleModal2').modal('hide');
          console.log(data);
    		  alert('Done');
          // window.location.reload();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // console.log(jqXHR + textStatus + errorThrown);
          // alert('');
          $('#exampleModal2 .container').html('Some Error has occured. Try again or refresh the page');
        },
        data: JSON.stringify(changedArr),
        dataType: 'json',
        contentType: 'application/json',
    });

  } else {
    $('#exampleModal').modal('hide');
  }

});



function getUpdatedBene(tbodyChildrenList, beneList) {
  var currArr = [];
  var changedArr = [];

  for (var i = 0; i < tbodyChildrenList.length; i++) {
    e = tbodyChildrenList[i];
    // console.log(e);

    // for (var j = 0; j < e.children[0].children.length; j++) {
    if (e.children[6].children[0].value.trim() == "null") {
      benMob = null;
    }
    if (e.children[5].children[0].value.trim() == "null") {
      benEmail = null;
    }
    var a = {
      'beneficiaryUid': e.children[1].children[0].value,
      'beneficiaryName': e.children[0].children[0].value,
      'beneficiaryAddress': e.children[2].children[0].value,
      'beneficiaryMobile': benMob,
      'beneficiaryEmail': benEmail,
      'beneficiaryBankAccountNumber': e.children[3].children[0].value,
      'beneficiaryBankIfsc': e.children[4].children[0].value
    };
    currArr.push(a);
    // }
  }

  // console.log(JSON.stringify(currArr[1]));
  // console.log(JSON.stringify(beneList[1]));
  for (i = 0; i < currArr.length; i++) {
    if (JSON.stringify(currArr[i]) !== JSON.stringify(beneList[i])) {
      changedArr.push(currArr[i]);
    }
  }

  return changedArr;
}











//
