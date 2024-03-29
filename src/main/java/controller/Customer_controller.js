import {customer} from "../model/Customer_Model.js";

var btnSave = $("#savecustomer");
var btnRemove = $("#deletecustomer");
var btnGetAll = $("#getcustomer");
var btnUpdate = $("#updatecustomer");

// getAll();


$("#customerIdText, #customerNameText, #customerAddressText #customerSalaryText").keydown(function (e){
    if(e.key == "Tab"){
        e.preventDefault();
    }
});


// $("#customerIdText").keyup(function (e){
//     if(regexId.test($("#customerIdText").val())){
//         $("#customerIdText").css("border-color",  "transparent");
//     }else{
//         $("#customerIdText").css("border-color",  "red");
//     }
// });
//
//
// $("#customerIdText").keydown(function (e){
//     if(e.keyCode == 13 && regexId.test($("#customerIdText").val())) {
//         $("#customerNameText").focus();
//     }
// });
//
//
//
// $("#customerNameText").keyup(function (e){
//     if(regexName.test($("#customerNameText").val())){
//         $("#customerNameText").css("border-color",  "transparent");
//     }else{
//         $("#customerNameText").css("border-color",  "red");
//     }
// });
//
// $("#customerNameText").keydown(function (e){
//     if(e.keyCode == 13 && regexName.test($("#customerNameText").val())){
//         $("#customerTelText").focus();
//     }
// });
//
// $("#customerAddressText").keyup(function (e){
//     if(regexAddress.test($("#customerAddressText").val())){
//         $("#customerAddressText").css("border-color",  "transparent");
//     }else{
//         $("#customerAddressText").css("border-color",  "red");
//     }
// });
//
// $("#customerAddressText").keydown(function (e){
//     if(e.keyCode == 13 && regexAddress.test($("#customerAddressText").val())){
//         save();
//     }
// });
//
//
//
//
// $("#customerSalaryText").keyup(function (e){
//     if(regexSalary.test($("#customerSalaryText").val())){
//         $("#customerSalaryText").css("border-color",  "transparent");
//     }else{
//         $("#customerSalaryText").css("border-color",  "red");
//     }
// });
//
// $("#customerSalaryText").keydown(function (e){
//     if(e.keyCode == 13 && regexSalary.test($("#customerSalaryText").val())){
//         $("#customerSalaryText").focus();
//     }
// });
//

function save(){

    // if(regexId.test($("#customerIdText").val()) && regexName.test($("#customerNameText").val()) && regexAddress.test($("#customerAddress").val()) && regexSalary.test($("#customerSalaryText").val())){
    //     var is = false;
    //
    //     for(let i = 0; i < CustomerDetails.length; i++){
    //         if(CustomerDetails[i].cid == $("#customerIdText").val()){
    //             is = true;
    //         }
    //     }
    //
    //     if(is == false){
    //
    //         var tblBody = $("#tblBody");
    //
    //         var id = $("#customerIdText").val();
    //         var name = $("#customerNameText").val();
    //         var address = $("#customerAddressText").val();
    //         var salary = $("#customerSalaryText").val();
    //
    //         customer = {
    //             cid : id,
    //             cname : name,
    //             caddress : address,
    //             csalary : salary
    //         }
    //
    //         CustomerDetails.push(customer);
    //
    //         let tr=$('<tr> <td>'+CustomerDetails[CustomerDetails.length-1].cid+'</td> <td>'+CustomerDetails[CustomerDetails.length-1].cname+'</td> <td>'+CustomerDetails[CustomerDetails.length-1].caddress+'</td> <td>'+CustomerDetails[CustomerDetails.length-1].csalary+'</td></tr>');
    //         $("#tblBody").append(tr);
    //
    //     }else{
    //         alert("Customer ID Already Used")
    //     }
    // }
    let newCustomer = Object.assign({}, customer);
    newCustomer.id = $("#customerIdText").val();
    newCustomer.name = $("#customerNameText").val();
    newCustomer.address = $("#customerAddressText").val();
    console.log(newCustomer)
    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newCustomer),
        success: function (resp, status, xhr) {
            if (xhr.status === 200) {
                alert(resp)
                getAll();
            }
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });



    $("#tblBody>tr").click(function (e){

        $("#customerIdText").val($(this).children().eq(0).text());
        $("#customerNameText").val($(this).children().eq(1).text());
        $("#customerAddress").val($(this).children().eq(2).text());
        $("#customerSalaryText").val($(this).children().eq(3).text());

    });

}


btnSave.click(function(){

    save();
    clearFields();
    getAll();

});



function getAll() {

//     $('#tblBody').empty();
//
//     for(var i = 0; i < CustomerDetails.length; i++){
//
//         var id = CustomerDetails[i].cid;
//         var name = CustomerDetails[i].cname;
//         var address = CustomerDetails[i].caddress;
//         var salary = CustomerDetails[i].csalary;
//
//         let row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td></tr>`
//
//         $('#tblBody').append(row);
//
//     }
//     bindEvents();
// }
    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "GET",
        success: function (resp, status, xhr) {

            if (xhr.status === 200) {
                console.log(resp)
                let cusBody = $("#tblCustomer");
                cusBody.empty();
                for (let customer of resp) {
                    cusBody.append(`
                        <tr>
                            <th scope="row">${customer.id}</th>
                            <td>${customer.name}</td>
                            <td>${customer.address}</td>
                        </tr>`);
                }
            }
        }

    });
    bindEvents();
}

btnGetAll.click(function (){

    getAll();

});



btnRemove.click(function(event) {

    var id = $("#customerIdText").val();

//     for(var i = 0; i < CustomerDetails.length; i++){
//
//         if(CustomerDetails[i].cid == id){
//             CustomerDetails.splice(i, 1);
//             console.log(CustomerDetails.length);
//             getAll();
//             clearFields();
//             break;
//         }
//
//     }
//
// });

    $.ajax({
        url: "http://localhost:8080/POS/customer?id="+id,
        method: "DELETE",
        success: function (resp, status, xhr) {

            if (xhr.status === 200) {
                alert(resp)
                getAll();
                 clearFields();

            }

        },
        error:function (resp){
            alert(resp);
        }

    });
});

btnUpdate.click(function(){

    // for(var i = 0; i < CustomerDetails.length; i++){
    //
    //     if(CustomerDetails[i].cid == id){
    //
    //         CustomerDetails[i].cid = id;
    //         CustomerDetails[i].cname = name;
    //         CustomerDetails[i].caddress = address;
    //         CustomerDetails[i].csalary = salary;
    //
    //
    //         getAll();
    //         clearFields();
    //
    //         break;
    //
    //     }
    //
    //     if(i == CustomerDetails.length - 1){
    //         alert("No")
    //     }
    //
    // }

    let newCustomer = Object.assign({}, customer);
    newCustomer.id = $("#customerIdText").val();
    newCustomer.name = $("#customerNameText").val();
    newCustomer.address = $("#customerAddressText").val();
    console.log(newCustomer)
    $.ajax({
        url: "http://localhost:8080/POS/customer",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newCustomer),
        success: function (resp, status, xhr) {
            if (xhr.status === 200) {
                alert(resp)
                getAll();
            }
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    });

});


function clearFields(){
    $("#customerIdText").val("");
    $("#customerNameText").val("");
    $("#customerAddressText").val("");
    $("#customerSalaryText").val("");

    $("#customerIdText").focus();
}

bindEvents();


function bindEvents(){
    $('#tblBody>tr').click(function () {
        // console.log(this);//tr -> this will return tr html element
        // console.log($(this));//jquery ob //if we want to access jQuery method we have to convert it to a jquery object
        // console.log($(this).text()); // now here it will return all the text of tr

        let id = $(this).children(':nth-child(1)').text();
        let name = $(this).children(':nth-child(2)').text();
        let address = $(this).children(':nth-child(3)').text();
        let salary = $(this).children(':nth-child(4)').text();

        setTextFieldValues(id,name,address,salary);
    });
}
//check this out.?


function setTextFieldValues(id, name, address, salary) {
    $("#customerIdText").val(id);
    $("#customerNameText").val(name);
    $("#customerAddressText").val(address);
    $("#customerSalaryText").val(salary);
}
