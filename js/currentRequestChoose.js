// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for current request choose page of mahavitaran




$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});


$('.optionReq').click(function () {
  if ($(this).attr('id') == 'cheque') {
    setData('HoCurrentRequestData', JSON.stringify(chequeData));
  } else {
    setData('HoCurrentRequestData', JSON.stringify(rtgsData));
  }
});




// DATA ==========================================================================

var chequeData = [
  {
    'place': 'Mumbai',
    'totalCheque': 10000,
    'chequeData': [
      {
        'beneficiary': 'A',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 5000
      },
      {
        'beneficiary': 'B',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 3000
      },
      {
        'beneficiary': 'C',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 2000
      }
    ],
  },
  {
    'place': 'Thane',
    'totalCheque': 30000,
    'chequeData': [
      {
        'beneficiary': 'Aa',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 15000
      },
      {
        'beneficiary': 'Bb',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 9000
      },
      {
        'beneficiary': 'Cc',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 6000
      }
    ],
  },
  {
    'place': 'Pune',
    'totalCheque': 50000,
    'chequeData': [
      {
        'beneficiary': 'Aaa',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 25000
      },
      {
        'beneficiary': 'Bbb',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 15000
      },
      {
        'beneficiary': 'Ccc',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 10000
      }
    ],
  }
];



var rtgsData = [
  {
    'place': 'Mumbai',
    'totalRtgs': 20000,
    'rtgsData': [
      {
        'payee': 'A',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 10000
      },
      {
        'payee': 'B',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 6000
      },
      {
        'payee': 'C',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 4000
      }
    ]
  },
  {
    'place': 'Thane',
    'totalRtgs': 40000,
    'rtgsData': [
      {
        'payee': 'Aa',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 20000
      },
      {
        'payee': 'Bb',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 12000
      },
      {
        'payee': 'Cc',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 8000
      }
    ]
  },
  {
    'place': 'Pune',
    'totalRtgs': 60000,
    'rtgsData': [
      {
        'payee': 'Aaa',
        'desc': 'X bank',
        'sapno': 1234,
        'amount': 30000
      },
      {
        'payee': 'Bbb',
        'desc': 'Y bank',
        'sapno': 1234,
        'amount': 18000
      },
      {
        'payee': 'Ccc',
        'desc': 'Z bank',
        'sapno': 1234,
        'amount': 12000
      }
    ]
  }
];



//
