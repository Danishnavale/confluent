// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: controller for login page of mahavitaran




function login(email, password) {


  var data = {
    'password'           : password,
    'usernameOrEmail'    : email,
  };

  $.ajax({
      url: url + 'api/auth/signin', //url to server
      type: 'POST',
      //Ajax events
      success: function(data) {
        // console.log(data);
        $('#exampleModal2').modal('hide');

        setData('user', JSON.stringify(data));
      		if(data.userRole==='ROLE_L1'){
            Nav.assign('home-L1.html');
      		}else if(data.userRole==='ROLE_L2'){
      			Nav.assign('home-L2.html');
      		}else if(data.userRole==='ROLE_L3'){
      			Nav.assign('home-L3.html');
      		}else if(data.userRole==='ROLE_ADMIN'){
      			Nav.assign('home-ho.html');
      		}

      },
      error: function(jqXHR, textStatus, errorThrown) {
        // $('#exampleModal2').modal('toggle');
        // console.log(jqXHR + textStatus + errorThrown);
        setTimeout(function () {
          $('#exampleModal2 .modal-body .container').html('Wrong Username or Password');
        }, 1000);
      },
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
  });

}













//
