getData()

$("#search").click(function() { // 음식을 검색을 통해 찾기기능
    var foodname = $("#menuname").val()
    foodSearch(foodname)
})

$("#money").change(function() { 
    if(this.value == "기타") { 
        $("#inputprice").css("display", "inline")
    }
    else {
        $("#inputprice").css("display","none")
    }
})

$("#cardpayment").click(function() {
    $("#money").css("display","none")
    $("#inputprice").css("display","none")
})

$("#moneypayment").click(function() {
        $("#money").css("display", "inline")
        if($("#money option:selected").val() == "기타") {
        $("#inputprice").css("display","inline")
    }
})

function foodSearch(foodname) {   
    $.ajax({
        url: 'food/search/' + foodname,
        type : 'GET',
        success:function(data) {
            for(var i =0; i < data.length; i++){
            foodPicture(data[i])
            }
        }
    })
}

function getData() {
    $.ajax({
        url: 'menu',
        type : 'GET',
        success:function(data) {
            for(var i = 0; i < data.length; i++) {
                menu(data[i])
            }
            $("#menu li").click(function() {
                var number = $(this).attr("id");
                gallery(number)
                $("#picture").html('')
            })
        }
    })
}

var MenuList = {};

function gallery(number) {
    $.ajax({
        url: 'food/' + number,
        type : 'GET',
        success:function(data){
            MenuList = data
            for(var i = 0; i < data.length; i++){
                foodPicture(i)
            }
        }
    })
}

function menu(data) {   // <ul>밑에 jquery로 <li>자식생성 : 메뉴이름
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); 
}


function foodPicture(value) {
    var data = MenuList[value]
        $("#picture").append(
        `<div id=${value}>
            <img src = "image/${data.filename}"} width = "400px" height = "250px">
            <div class = "price"><p>${data.name} ${data.price}원</p></div>
                <div class = "all">
                    <input type = "button" class = "plus" value = "+">
                    <input type ="text" class = "count" value = 0>
                    <input type = "button" class = "minus" value = "-">
                </div>
        </div>`)
}

$(document).on('click','.plus', function(){
    var productId = $(this).parent().parent().attr("id")
    var number = $(this).next().val()
    var changeNumber = parseInt(number)
    $(this).next().val(changeNumber += 1)
    console.log(productId)
    var c = $("#moniter").children().attr("id")
    console.log(c)
    if(productId != $("#moniter").children().attr("id")){
    $("#moniter").append(`
                <tr id = ${productId}>
                    <td class = "menusize">${MenuList[productId].name}</td>
                    <td class = "menusize">${MenuList[productId].price}</td>1
                    <td class = "menusize" id = "a">${changeNumber}</td>
                </tr>
        `)
    }
    else{
    var tdNumber = $("#a").text()
    var b = parseInt(tdNumber)
    $("#a").text(b+1)
    }
})

$(document).on('click','.minus', function(){
    var number = $(this).prev().val()
    if(number > 0){
        var changeNumber = parseInt(number)
        $(this).prev().val(changeNumber -= 1)
    }
})a