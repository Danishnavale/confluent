// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for login page of mahavitaran

if (checkData('user')) {
  deleteData('user');
};


function checkBoxVal (elem) {
  $('.typeInput').prop('checked', false);
  elem.checked = true;
}


$(document).ready(function () {

  $('#submit').click(function () {

    var email = $('#email').val().trim();
    var password = $('#password').val().trim();
    // var type;
    //
    // if ($('#checker').is(":checked")) {
    //   type = 'checker';
    // } else if ($('#maker').is(":checked")) {
    //   type = 'maker';
    // } else {
    //   type = '';
    // }

    if (email && password) {

      // if () {
      $('#exampleModal2').modal('show');
      // $('#exampleModal2').modal('hide');

      login(email, password);
        // console.log('clicked');
        // Nav.assign('home-L1.html')
      // } else {
      //   alert('Error: Please enter correct email');
      // }

    } else {
      alert('Error: Please fill all the details');
    }

  });

});

$('#exampleModal2').on('hidden.bs.modal', function (e) {
  // do something...
  $('#exampleModal2 .modal-body .container').html(`
  <div id="loading"></div>
  <h3>Loading... Please wait</h3>
  `);

});



$('#emailReset').keyup(function () {
  $('#resetPassword').attr('disabled', '');
});


$('#checkEmail').click(function () {
  // alert('hi')
  if ($('#emailReset').val().trim()) {
    $('#resetPassword').removeAttr('disabled');
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

 $('#registergobtn').click(function () {

   Nav.assign('register.html');

});



//
