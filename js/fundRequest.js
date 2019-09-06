// Author: Vedant Nandoskar
// Github: https://www.github.com/Vedant1202
// Email: vedant.nandoskar@gmail.com
// Description: JS for Fund Request page of mahavitaran


$(document).ready(function () {

  if (checkData('fundRequestAmountData')) {




  var amountData = getData('fundRequestAmountData');

    if (amountData.chequeAmount) {
    	$('#chequeVal').html(amountData.chequeAmount);
    }
    if (amountData.rtgsAmount) {
	    $('#rtgsVal').html(amountData.rtgsAmount);
    }
    if (amountData.cardAmount) {
	    $('#cardVal').html(amountData.cardAmount);
    }
  }

});


$('#logout').click(function () {
  Nav.assign('index.html');
});


$('#goBack').click(function () {
  Nav.back();
});


// $(document).ready(function(){
//   $('.excel-input').change(function(e){
//     var elem = $(this).next()[0];
//     var btn = $(this).parent().next().children()[0];
//       if (e.target.files.length) {
//         var fileName = e.target.files[0].name;
//         // alert('The file "' + fileName +  '" has been selected.');
//
//         elem.innerHTML = fileName;
//         btn.removeAttribute('disabled');
//       } else {
//         btn.setAttribute('disabled', '');
//         elem.innerHTML = 'Choose File'
//       }
//   });
// });



$(document).ready(function () {
  $('#exampleModal2 h3').html('Loading');
  $('#exampleModal2').modal('show');


  $.ajax({
      url: url + 'api/maker/paymentsentries', //url to server
      type: 'GET',
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", getData('user').tokenType + ' ' + getData('user').accessToken);
      },
      //Ajax events
      success: function(data) {

        for (var i = 0; i < data.length; i++) {
          var ben = data[i];
          $('.table-div .table tbody').append(`
            <tr>
              <td>${ben.beneficiaryName}</td>
              <!-- <td>${ben.beneficiaryUid}</td> -->
              <td>${ben.paymentDescription}</td>
              <td>${ben.beneficiaryBankAccountNumber}</td>
              <td>${ben.beneficiaryBankIfsc}</td>
              <td>${ben.sapDocumentNumber}</td>
              <td>${ben.amountForTransfer}</td>
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

  getBeneficiaryList('bens');
  // var benList = getBeneficiaryList();
  // for (var i = 0; i < benList.length; i++) {
  //   ben = benList[i];
  //   $('#bens').append(`<option value="${ben.beneName} (id: ${ben.beneUid})">`);
  // }


});



$('#submit').click(function () {

  var uid = $('#uid').val().split(':')[1].split(')')[0].trim(),
      desc = $('#desc').val().trim(),
      msg = $('#msg').val().trim(),
      sap = $('#sap').val().trim(),
      prior = $('#prior').val().trim(),
      amount = $('#amount').val().trim(),
      type = $('#type').val().trim();


  if (amount && uid && desc && prior && msg && sap && type) {

  // if (amount!==null && amount.length && uid!==null && uid.length && desc!==null && prior && msg && sap!==null && sap.length && type!==null) {


    $('#exampleModal2 h3').html('Sending Request... Please Wait');
    $('#exampleModal2').modal('show');

    var data = [{
      'amountForTransfer': amount,
      'beneficiaryUid': uid,
      'paymentDescription': desc,
      'priority': prior,
      'remitterToBeneMessage': msg,
      'sapDocumentNumber': sap,
      'transferType': type,
    }];

    data = JSON.stringify(data);
    console.log(data);

    // console.log(data);
    // var authorizationToken = getData('user').tokenType + getData('user').accessToken;

    $.ajax({
        url: url + 'api/maker/paymentsentries', //url to server
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
          // alert('Done');
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
    alert('Please fill all the fields');
  }



});



$('#exampleModal2').on('hidden.bs.modal', function (e) {
  // do something...
  $('#exampleModal2 .modal-body .container').html(`
  <div id="loading"></div>
  <h3></h3>
  `);

});


// ==================================================================================
//
//                                  TABULATOR CONFIG
//
// ==================================================================================


//================================= FOR CHEQUE ======================================
//===================================================================================

var tableCheque;
// get upload bt
var viewCheque = document.getElementById("viewBtnCheque");


viewCheque.onclick = function() {

    //Reference the chequeFile element.
    var chequeFile = document.getElementById("chequeFile");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(chequeFile.value.toLowerCase())) {
        if (typeof(FileReader) != "undefined") {
            var readerCheque = new FileReader();

            //For Browsers other than IE.
            if (readerCheque.readAsBinaryString) {
                readerCheque.onload = function (e) {
                    ProcessExcel(e.target.result, '#chequeTable');
                };
                readerCheque.readAsBinaryString(chequeFile.files[0]);
            } else {
                //For IE Browser.
                readerCheque.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data, '#chequeTable');
                };
                readerCheque.readAsArrayBuffer(chequeFile.files[0]);
            }
        } else {
            $('#viewBtnCheque').attr('disabled', '');
            alert("This browser does not support HTML5.");
        }
    } else {
        $('#viewBtnCheque').attr('disabled', '');
        alert("Please upload a valid Excel file.");
    }
};


// code to send data to database starts here

var sendBtn = document.getElementById("sendCheque");

sendBtn.onclick = function(){
    // table.getData() needs js/tabulator-master/dist/js/tabulator.min.js
var data = JSON.stringify(tableCheque.getData());
console.log(data);
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      alert("success");
    }
  };
  xhttp.open("POST", "http://localhost:8080/RtgsTableapi/rtgsRequestentries", true);
  xhttp.send(data);
}




//================================= FOR RTGS ======================================
//===================================================================================


var tableRtgs;
// get upload bt
var viewRtgs = document.getElementById("viewBtnRtgs");


viewRtgs.onclick = function() {

    //Reference the rtgsFile element.
    var rtgsFile = document.getElementById("rtgsFile");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(rtgsFile.value.toLowerCase())) {
        if (typeof(FileReader) != "undefined") {
            var readerRtgs = new FileReader();

            //For Browsers other than IE.
            if (readerRtgs.readAsBinaryString) {
                readerRtgs.onload = function (e) {
                    ProcessExcel(e.target.result, '#rtgsTable');
                };
                readerRtgs.readAsBinaryString(rtgsFile.files[0]);
            } else {
                //For IE Browser.
                readerRtgs.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data, '#rtgsTable');
                };
                readerRtgs.readAsArrayBuffer(rtgsFile.files[0]);
            }
        } else {
            $('#viewBtnRtgs').attr('disabled', '');
            alert("This browser does not support HTML5");
        }
    } else {
        $('#viewBtnRtgs').attr('disabled', '');
        alert("Please upload a valid Excel file.");
    }
};


// code to send data to database starts here

var sendRtgs = document.getElementById("sendRtgs");

sendRtgs.onclick = function(){
    // table.getData() needs js/tabulator-master/dist/js/tabulator.min.js
var data = JSON.stringify(tableRtgs.getData());
console.log(data);
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      alert("success");
    }
  };
  xhttp.open("POST", "http://localhost:8080/RtgsTableapi/rtgsRequestentries", true);
  xhttp.send(data);
}




// ===================================================================================
//                                  PROCESS EXCEL FUNCTION
// ===================================================================================



function ProcessExcel(data, divId) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    // console.log(workbook);

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    // console.log(excelRows);

    //table javascript starts here
    // icons definations for table <i class="far fa-save"></i>

    //custom formatter definition delete
    var deleteIcon = function(cell, formatterParams, onRendered){ //plain text value
        return "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    };

    var tableCheque = new Tabulator(divId, {
          height:"355px",
          responsiveLayout:"hide",
          data:excelRows,
          selectable:true,
          pagination:"local",
          paginationSize:10,
          initialSort:[
              {column:"priority", dir:"asc"}, //sort by this first
          ],

          columns:[
          {formatter:"rownum", align:"center", width:40},
          {title:"Priority", field:"priority",validator:"required"},
          {title:"Name", field:"name",editor:"input",validator:"string"},
          {title:"amount", field:"amount",editor:"input",validator:"numeric"},
          {title:"account", field:"account",validator:"required"},
          {title:"IFSC", field:"ifsc",editor:"input"},
          {formatter:deleteIcon, width:40, align:"center", cellClick:function(e, cell){
                                        var row = cell.getRow();
                                        row.delete();
                                            },tooltip:"delete record"},
        ],
    });
};
















//
