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
            foodPicture(data)
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
            })
        }
    })
}

function gallery(number) {
    $.ajax({
        url: 'food/' + number,
        type : 'GET',
        success:function(data){
                foodPicture(data)
        }
    })
}

function list() {
    $.ajax({
        url: 'food',
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++) {
                buyList(data[i])
            }
        }
    })
}

function buyList(data)
{
    if(data.id == 1){
    $("#moniter").append(`<table border = "2">
                <thead>
                    <tr>
                        <th class = "menusize">${data.name}</th>
                        <th class = "menusize">${data.price}</th>
                        <th class = "menusize">${number}</th>
                    </tr>
                </thead>
                </table`)
    }
}

function menu(data) {   // <ul>밑에 jquery로 <li>자식생성 : 메뉴이름
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); 
}

function foodPicture(data) {
    $("#picture").html('')
    number = 0;
    for(var i = 0; i < data.length; i++) {
        $("#picture").append(
        `<div>
            <img src = "image/${data[i].filename}" width = "400px" height = "250px">
            <div class = "price"><p>${data[i].name} ${data[i].price}원</p></div>
                <div class = "all">
                    <input type = "button" class = "plus" value = "+">
                    <input type ="text" class = "count" value = ${number}>
                    <input type = "button" class = "minus" value = "-">
                </div>
        </div>`)
    }// <i class="far fa-plus-square fa-3x a"></i><i class="far fa-minus-square fa-3x b"></i>
    $('.plus').click(function(){
        $(this).next().val(number += 1)
        list()
    })
    $(".minus").click(function(){
        $(this).prev().val(number -= 1)
    })
}