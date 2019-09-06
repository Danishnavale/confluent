// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: utility functions for frontend of mahavitaran


var url = 'https://mahadiscom.herokuapp.com/';


//Navigation functions

var Nav = /** @class */ (function() {
    function Nav() {}
    Nav.assign = function(url) {
        window.location.assign(url);
    };
    Nav.replace = function(url) {
        window.location.replace(url);
    };
    Nav.back = function () {
      window.history.back();
    };
    Nav.open = function(url) {
        window.open(url, '_blank', 'location=no');
    };
    Nav.close = function() {
        window.close();
    };
    return Nav;
}());



//Cache storage Functions

function setData(cname, cvalue) {
    window.localStorage.setItem(cname, JSON.stringify(cvalue));
}

function getData(cname) {
    return JSON.parse(JSON.parse(window.localStorage.getItem(cname)));
}

function checkData(cname) {
    var user = getData(cname);
    if (user != null) {
        return true;
    } else {
        return false;
    }
}

function deleteData(cname) {
    window.localStorage.removeItem(cname);
}

// Function to check syntax of email. Returns true if
// email has atleast one '@' and  atleast one '.' followed by some string.

function checkEmail(email) { // Pass in elements as jQuery selectors
  var re = /\S+@\S+\.\S+/;

  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}


function checkPassword(password) {
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,20}$/;

  if(password.match(decimal)) {
    return true;
  } else {
    return false;
  }
}


function getBeneficiaryList(elemId) {
  $.ajax({
      url: url + 'api/bene-record/bene/dropdown', //url to server
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {
        // return data
        for (var i = 0; i < data.length; i++) {
          ben = data[i];
          $('#' + elemId).append(`<option value="${ben.beneName} (id: ${ben.beneUid})">`);
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
}

//
