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

function clickTab(elem) {

  console.log('clicked');
  var id = elem.id;
  var place = id.split('-')[1];
  var type = id.split('-')[0];

  console.log(place);

  for (var i = 0; i < data.length; i++) {
    var branch = data[i];

    if (branch.place == place) {
      var distributedData = {
        'place': place,
        'type': type,
        'chequeData': branch.chequeData,
        'rtgsData': branch.rtgsData
      };

      setData('distributedData', JSON.stringify(distributedData));
    }
  }
  Nav.assign('currentRequestAccept.html');
}


function appendData(data) {
  for (var i = 0; i < data.length; i++) {
    branch = data[i];

    $('.table-data tbody').append(
      `
        <tr>
          <th scope="row">${branch.place}</th>
          <td onclick="clickTab(this);" class="click-tab" id="cheque-${branch.place}">${branch.totalCheque}</td>
          <td onclick="clickTab(this);" class="click-tab" id="rtgs-${branch.place}">${branch.totalRtgs}</td>
          <td><input type="checkbox" value="yes"></td>
        </tr>
      `
    );
  }
}

$(document).ready(function () {
  appendData(data);
  if (checkData('distributedData')) {
    deleteData('distributedData');
  }
});



// DATA ==========================================================================

var data = [
  {
    'place': 'Mumbai',
    'totalCheque': 10000,
    'totalRtgs': 20000,
    'chequeData': [
      {
        'beneficiary': 'A',
        'amount': 5000
      },
      {
        'beneficiary': 'B',
        'amount': 3000
      },
      {
        'beneficiary': 'C',
        'amount': 2000
      }
    ],
    'rtgsData': [
      {
        'payee': 'A',
        'bankname': 'X bank',
        'accountno': 1234,
        'ifsc': 'abcd1234',
        'amount': 10000
      },
      {
        'payee': 'B',
        'bankname': 'Y bank',
        'accountno': 5678,
        'ifsc': 'efgh5678',
        'amount': 6000
      },
      {
        'payee': 'C',
        'bankname': 'Z bank',
        'accountno': 9000,
        'ifsc': 'ijkl9000',
        'amount': 4000
      }
    ]
  },
  {
    'place': 'Thane',
    'totalCheque': 30000,
    'totalRtgs': 40000,
    'chequeData': [
      {
        'beneficiary': 'Aa',
        'amount': 15000
      },
      {
        'beneficiary': 'Bb',
        'amount': 9000
      },
      {
        'beneficiary': 'Cc',
        'amount': 6000
      }
    ],
    'rtgsData': [
      {
        'payee': 'Aa',
        'bankname': 'X bank',
        'accountno': 1234,
        'ifsc': 'abcd1234',
        'amount': 20000
      },
      {
        'payee': 'Bb',
        'bankname': 'Y bank',
        'accountno': 5678,
        'ifsc': 'efgh5678',
        'amount': 12000
      },
      {
        'payee': 'Cc',
        'bankname': 'Z bank',
        'accountno': 9000,
        'ifsc': 'ijkl9000',
        'amount': 8000
      }
    ]
  },
  {
    'place': 'Pune',
    'totalCheque': 50000,
    'totalRtgs': 60000,
    'chequeData': [
      {
        'beneficiary': 'Aaa',
        'amount': 25000
      },
      {
        'beneficiary': 'Bbb',
        'amount': 15000
      },
      {
        'beneficiary': 'Ccc',
        'amount': 10000
      }
    ],
    'rtgsData': [
      {
        'payee': 'Aaa',
        'bankname': 'X bank',
        'accountno': 1234,
        'ifsc': 'abcd1234',
        'amount': 30000
      },
      {
        'payee': 'Bbb',
        'bankname': 'Y bank',
        'accountno': 5678,
        'ifsc': 'efgh5678',
        'amount': 18000
      },
      {
        'payee': 'Ccc',
        'bankname': 'Z bank',
        'accountno': 9000,
        'ifsc': 'ijkl9000',
        'amount': 12000
      }
    ]
  }
];





















//
