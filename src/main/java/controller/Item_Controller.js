import {item} from "../model/Item_Model.js";
import {customer} from "../model/Customer_Model";

var btnSaveItem = $("#btnSaveItem");
var btnUpdateItem = $("#btnUpdateItem");
var btnRemoveItem = $("#btnRemoveItem");
var btnGetAllItem = $("#btnGetAllItem");


// itemGetAll();

$("#itemCodeTxt, #itemDescriptionTxt, #itemQtyOnHandTxt, #itemUnitPriceTxt").keydown(function (e){
    if(e.key == "Tab"){
        e.preventDefault();
    }
});

// $("#itemCodeTxt").keyup(function (e){
//     if(regexItemCode.test($("#itemCodeTxt").val())){
//         $("#itemCodeTxt").css("border-color",  "transparent");
//     }else{
//         $("#itemCodeTxt").css("border-color",  "red");
//     }
// });
//
//
// $("#itemCodeTxt").keydown(function (e){
//     if(e.keyCode == 13 && regexItemCode.test($("#itemCodeTxt").val())) {
//         $("#itemNameTxt").focus();
//     }
// });
//
// $("#itemNameTxt").keyup(function (e){
//     if(regexItemName.test($("#itemNameTxt").val())){
//         $("#itemNameTxt").css("border-color",  "transparent");
//     }else{
//         $("#itemNameTxt").css("border-color",  "red");
//     }
// });
//
// $("#itemNameTxt").keydown(function (e){
//     if(e.keyCode == 13 && regexItemName.test($("#itemNameTxt").val())){
//         $("#unitePriceTxt").focus();
//     }
// });
//
// $("#unitePriceTxt").keyup(function (e){
//     if(regexItemUnitePrice.test($("#unitePriceTxt").val())){
//         $("#unitePriceTxt").css("border-color",  "transparent");
//     }else{
//         $("#unitePriceTxt").css("border-color",  "red");
//     }
// });
//
// $("#unitePriceTxt").keydown(function (e){
//     if(e.keyCode == 13 && regexItemUnitePrice.test($("#unitePriceTxt").val())){
//         $("#itemQtyTxt").focus();
//     }
// });
//
// $("#itemQtyTxt").keyup(function (e){
//     if(regexItemQty.test($("#itemQtyTxt").val())){
//         $("#itemQtyTxt").css("border-color",  "transparent");
//     }else{
//         $("#itemQtyTxt").css("border-color",  "red");
//     }
// });
//
//
// $("#itemQtyTxt").keydown(function (e){
//     if(e.keyCode == 13 && regexItemQty.test($("#itemQtyTxt").val())){
//         itemSave();
//     }
// });



function itemSave(){

    // if(regexItemCode.test($("#itemCodeTxt").val()) && regexItemName.test($("#itemNameTxt").val()) && regexItemUnitePrice.test($("#unitePriceTxt").val()) && regexItemQty.test($("#itemQtyTxt").val())){
    //     var is = false;
    //
    //     for(let i = 0; i < itemDetails.length; i++){
    //         if(itemDetails[i].itemCode == $("#itemCodeTxt").val()){
    //             is = true;
    //         }
    //     }
    //
    //     if(is == false){
    //
    //         var tblBody = $("#itemTblBody");
    //
    //         var itemCode = $("#itemCodeTxt").val();
    //         var itemName = $("#itemNameTxt").val();
    //         var unitePrice = $("#unitePriceTxt").val();
    //         var qty = $("#itemQtyTxt").val();
    //
    //         item = {
    //             itemCode : itemCode,
    //             itemName : itemName,
    //             unitePrice : unitePrice,
    //             qty : qty
    //         }
    //
    //         itemDetails.push(item);
    //
    //         let tr=$('<tr> <td>'+itemDetails[itemDetails.length-1].itemCode+'</td> <td>'+itemDetails[itemDetails.length-1].itemName+'</td> <td>'+itemDetails[itemDetails.length-1].unitePrice+'</td> <td>'+itemDetails[itemDetails.length-1].qty+'</td></tr>');
    //         $("#itemTblBody").append(tr);
    //
    //         itemClearFields();
    //
    //     }else{
    //         alert("Item Code Already Used")
    //     }
    // }

    let newItem = Object.assign({}, item);
    newItem.code = $("#itemCodeTxt").val();
    newItem.description = $("#itemDescriptionTxt").val();
    newItem.qtyOnHand = $("#itemQtyOnHandTxt").val();
    newItem.unitPrice=$("#itemUnitPriceTxt").val();
    console.log(newItem)
    $.ajax({
        url: "http://localhost:8080/POS/item",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(newItem),
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
    $("#itemTblBody>tr").click(function (e){

        $("#itemCodeTxt").val($(this).children().eq(0).text());
        $("#itemDescriptionTxt").val($(this).children().eq(1).text());
        $("#itemQtyOnHandTxt").val($(this).children().eq(3).text());
        $("#itemUnitPriceTxt").val($(this).children().eq(2).text());

    });

}


btnSaveItem.click(function(){

    itemSave();
    itemClearFields();
    itemGetAll();

});


function itemGetAll(){

//     $('#itemTblBody').empty();
//
//     for(var i = 0; i < itemDetails.length; i++){
//
//         var itemCode = itemDetails[i].itemCode;
//         var itemName = itemDetails[i].itemName;
//         var unitePrice = itemDetails[i].unitePrice;
//         var qty = itemDetails[i].qty;
//
//         let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${unitePrice }</td><td>${qty}</td></tr>`
//
//         $('#itemTblBody').append(row);
//
//     }
//     ItembindEvents();
//
// }
    $.ajax({
        url: "http://localhost:8080/POS/item",
        method: "GET",
        success: function (resp, status, xhr) {

            if (xhr.status === 200) {
                console.log(resp)
                let itemBody = $("#tblItem");
                itemBody.empty();
                for (let item of resp) {
                    itemBody.append(`
                        <tr>
                            <th scope="row">${item.code}</th>
                            <td>${item.description}</td>
                            <td>${item.qtyOnHand}</td>
                            <td>${item.unitPrice}</td>
                        </tr>`);
                }
            }
        }

    });
    bindEvents();
}



btnGetAllItem.click(function (){

    itemGetAll();

});


btnRemoveItem.click(function(event){

    var code = $("#itemCodeTxt").val();
//
//     for(var i = 0; i < itemDetails.length; i++){
//
//         if(itemDetails[i].itemCode == itemCode){
//             itemDetails.splice(i, 1);
//             itemGetAll();
//             itemClearFields();
//             break;
//         }
//
//     }
//
// });
    $.ajax({
        url: "http://localhost:8080/POS/item?code="+code,
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



btnUpdateItem.click(function(){

    let newItem = Object.assign({}, item);
    newItem.code = $("#itemCodeTxt").val();
    newItem.description = $("#itemDescriptionTxt").val();
    newItem.itemQtyOnHand = $("#itemQtyOnHandTxt").val();
    newItem.itemUnitPrice = $("#itemUnitPriceTxt").val();
    console.log(newItem)
    $.ajax({
        url: "http://localhost:8080/POS/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newItem),
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
//
//     itemGetAll();
//
// });


function itemClearFields(){
    $("#itemCodeTxt").val("");
    $("#itemDescriptionTxt").val("");
    $("#itemQtyOnHandTxt").val("");
    $("#itemUnitPriceTxt").val("");

    $("#itemCodeTxt").focus();
}


ItembindEvents();


function ItembindEvents(){
    $('#itemTblBody>tr').click(function () {
        // console.log(this);//tr -> this will return tr html element
        // console.log($(this));//jquery ob //if we want to access jQuery method we have to convert it to a jquery object
        // console.log($(this).text()); // now here it will return all the text of tr

        let itemCode = $(this).children(':nth-child(1)').text();
        let itemDescription = $(this).children(':nth-child(2)').text();
        let itemQtyOnHand = $(this).children(':nth-child(3)').text();
        let itemUnitPrice = $(this).children(':nth-child(4)').text();

        setItemTextFieldValues(itemCode,itemDescription,itemQtyOnHand,itemUnitPrice);
    });
}
//check this out.?


function setItemTextFieldValues(itemCode, itemName, unitePrice, qty) {
    $("#itemCodeTxt").val(itemCode);
    $("#itemDescriptionTxt").val(itemName);
    $("#itemQtyOnHandTxt").val(unitePrice);
    $("#itemUnitPriceTxt").val(qty);
}











