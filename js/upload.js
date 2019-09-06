//var modal = document.getElementById("myModal");
var table;
// get upload bt
var uploadb = document.getElementById("uploadbt");


uploadb.onclick = function() {

    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
console.log(workbook);

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows);

   //table javascript starts here
// icons definations for table <i class="far fa-save"></i>

    //custom formatter definition delete
var deleteIcon = function(cell, formatterParams, onRendered){ //plain text value
    return "<i class='fas fa-trash-alt'></i>";
};

                    table = new Tabulator("#example-table", {
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
                {title:"IFSC", field:"ifsc",editor:"input",cellMouseLeave:function(e, cell){

                                    //e - the event object
                                    //cell - cell component
                                    var row = cell.getRow();

                                        var ifsc_cell = cell.getValue();
                                var ifsc_link = 'https://ifsc.razorpay.com/' + ifsc_cell;

                                var xhttp;
                                if (window.XMLHttpRequest) {
                                // code for modern browsers
                                xhttp = new XMLHttpRequest();
                                } else {
                                // code for old IE browsers
                                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    row.getElement().style.backgroundColor = "#A6A6DF";
                                }
                                };
                                console.log(ifsc_link);
                                xhttp.open("GET", ifsc_link, true);
                                xhttp.send();

                                    },},
                {formatter:deleteIcon, width:40, align:"center", cellClick:function(e, cell){
                                        var row = cell.getRow();
                                        row.delete();
                                            },tooltip:"delete record"},
                ],
                });



};

// document.getElementById('approve-all').addEventListenerr('change', (event) => {
//     if (event.target.checked) {
//       console.log('checked')
//     } else {
//       console.log('not checked')
//     }
//   })



// code to send data to database starts here

var sendbt = document.getElementById("sendBT");

sendBT.onclick = function(){
    // table.getData() needs js/tabulator-master/dist/js/tabulator.min.js
var data = JSON.stringify(table.getData());
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
