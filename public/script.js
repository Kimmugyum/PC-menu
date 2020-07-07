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
    console.log(data)
        $("#picture").append(
        `<div id=${value}>
            <img src = "image/${data.filename}"} width = "400px" height = "250px">
            <div class = "price"><p>${data.name} ${data.price}원</p></div>
        </div>`)
}

$(document).on('click','.price', function(){
    var productId = $(this).parent().attr("id")
    console.log(productId)
    $("#moniter").append(`
                <tr id = ${productId}>
                    <td class = "menusize">${MenuList[productId].name}</td>
                    <td class = "menusize">${MenuList[productId].price}</td>1
                </tr>
        `)
})