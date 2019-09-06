// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Register page of mahavitaran

// setData('isUniqueUsername', JSON.stringify({'isUnique': false}))

var isUniqueUsername = false,
    isUniqueEmail = false,
    isValidPassword = false;

$('.dropdown-item').click(function () {
  var val = $(this).html();
  $(this).parent().prev().html(val);
});



$('#username').focusout(function () {

  $('#submit').attr('disabled', '');

  if ($(this).val().trim()) {
    isUniqueUsername = true;
  } else {
    isUniqueUsername = false;
  }

  if (isUniqueUsername && isUniqueEmail && isValidPassword) {
    $('#submit').removeAttr('disabled');
  }

  // $.ajax({
  //     url: 'http://127.0.0.1/', //url to server
  //     type: 'POST',
  //     //Ajax events
  //     success: function(data) {
  //       if (data.unique) {
  //         $('#submit').removeAttr('disabled');
  //       } else {
  //         $('#submit').attr('disabled', '');
  //       }
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       //
  //     },
  //     data: data,
  // });


});


$('#password').keyup(function () {
  isValidPassword = false;

  if (checkPassword($(this).val().trim())) {
    isValidPassword = true;
    console.log(true);
    $('#passwordHelp').addClass('d-none');
  } else {
    isValidPassword = false;
    $('#passwordHelp').removeClass('d-none');
  }

  if (isValidPassword && isUniqueEmail && isUniqueUsername) {
    $('#submit').removeAttr('disabled');
  } else {
    $('#submit').attr('disabled', '');
  }
});


$('#email').focusout(function () {

  $('#submit').attr('disabled', '');

  if ($(this).val().trim()) {
    isUniqueEmail = true;
  } else {
    isUniqueEmail = false;
  }

  if (isUniqueUsername && isUniqueEmail && isValidPassword) {
    $('#submit').removeAttr('disabled');
  }

  // $.ajax({
  //     url: 'http://127.0.0.1/', //url to server
  //     type: 'POST',
  //     //Ajax events
  //     success: function(data) {
  //       if (data.unique) {
  //         $('#submit').removeAttr('disabled');
  //       } else {
  //         $('#submit').attr('disabled', '');
  //       }
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //       //
  //     },
  //     data: data,
  // });


});




$('#submit').click(function () {
  var fname = $('#fname').val().trim(),
      lname = $('#lname').val().trim(),
      username = $('#username').val().trim(),
      email = $('#email').val().trim(),
      password = $('#password').val().trim(),
      level = '',
      branch = '';

  if ($('#level').html().trim() != 'Select Level') {
    level = $('#level').html().trim();
  }
  if ($('#branch').html().trim() != 'Select Branch') {
    branch = $('#branch').html().trim();
  }

  if (fname && lname && username && email && password && level && branch) {
    if (checkEmail(email)) {
      register(fname, lname, username, email, password, level, branch);
      // alert('Success: You have been registered');
    } else {
      // alert('Error: Please enter correct email');
    }
  } else {
    alert('Error: Please fill up all the details');
  }

});


$('#goLogin').click(function () {
  Nav.assign('index.html');
});



//
