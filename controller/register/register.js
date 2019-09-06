// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: controller for register page of mahavitaran



function register(fname, lname, uname, email, password, level, branch) {
  var data = {
    'name' : fname + ' ' + lname,
    // 'lname' : lname,
    'email' : email,
    'username': uname,
    'password' : password,
    'role' : level,
    'branch' : branch
  };

  console.log(data);

  $.ajax({
      url: url + 'api/auth/signup', //url to server
      type: 'POST',
      //Ajax events
      success: function(data) {
        console.log(data);
		    alert('user created successfully');
      },
      error: function(xhr, status, error) {
        // console.log(jqXHR + textStatus + errorThrown);
        var err = JSON.parse(xhr.responseText);
        alert('try different username or email')
      },
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
  });

}






//
