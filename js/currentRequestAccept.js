// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran


var place,
    type;


$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


$(document).ready(function () {

  place = getData('distributedData').place;
  type = getData('distributedData').type;
  var data;

  if (getData('distributedData').type == 'cheque') {
    data = getData('distributedData').chequeData;
  } else {
    data = getData('distributedData').rtgsData;
  }


  if (type == 'cheque') {
    $('#nav-head-desc').html(capitalizeFirstLetter(place) + ' > ' + capitalizeFirstLetter(type));

    $('thead').append(
      `<tr>
      <th scope="col">Beneficiary</th>
      <th scope="col">Amount</th>
      <th scope="col">Checklist</th>
      </tr>`
    );

    for (var i = 0; i < data.length; i++) {
      var e = data[i];
      $('.table-data tbody').append(
        `
          <tr>
            <td>${e.beneficiary}</td>
            <td>${e.amount}</td>
            <td><input id="${e.beneficiary}-${e.amount}" type="checkbox" name="checkboxes" value="${e.amount}"></td>
          </tr>
        `
      );
    }
  } else {
    $('#nav-head-desc').html(capitalizeFirstLetter(place) + ' > ' + type.toUpperCase());

    $('thead').append(
      `<tr>
      <th scope="col">Payee</th>
      <th scope="col">Bank Name</th>
      <th scope="col">Account</th>
      <th scope="col">IFSC</th>
      <th scope="col">Amount</th>
      <th scope="col">Checklist</th>
      </tr>`
    );

    for (var i = 0; i < data.length; i++) {

      var e = data[i];
      $('.table-data tbody').append(
        `
        <tr>
        <td>${e.payee}</td>
        <td>${e.bankname}</td>
        <td>${e.accountno}</td>
        <td>${e.ifsc}</td>
        <td>${e.amount}</td>
        <td><input id="${e.payee}-${e.amount}" type="checkbox" name="checkboxes" value="${e.amount}"></td>
        </tr>
        `
      );
    }
}

});


$('#save').click(function () {
  var sum = 0;
  var checkboxArr = [];

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
    setData('redirectCurrRequest', JSON.stringify('redirect': true));
  }
});




//
