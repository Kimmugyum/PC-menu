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

function gallery(number) {
    $.ajax({
        url: 'food/' + number,
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++){
                foodPicture(data[i])
            }
        }
    })
}

function menu(data) {   // <ul>밑에 jquery로 <li>자식생성 : 메뉴이름
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); 
}

function foodPicture(data) {
    console.log(data)
        $("#picture").append(
        `<div>
            <img src = "image/${data.filename}"} width = "400px" height = "250px">
            <div class = "price"><p>${data.name} ${data.price}원</p></div>
                <div class = "all" id = "${data.id}">
                    <input type = "button" class = "plus" value = "+">
                    <input type ="text" class = "count" value = 0>
                    <input type = "button" class = "minus" value = "-">
                </div>
        </div>`)
    $('.plus').click(function(){
        var number = $(this).next().val()
        var changeNumber = parseInt(number)
        $(this).next().val(changeNumber += 1)
        $("#moniter").append(`
                    <tr>
                        <td class = "menusize">${data.name}</td>
                        <td class = "menusize">${data.price}</td>
                        <td class = "menusize">${changeNumber}</td>
                    </tr>    
        `)
    })
    $(".minus").click(function(){
        var number = $(this).prev().val()
        console.log(number)
        if(number > 0){
            var changeNumber = parseInt(number)
            $(this).prev().val(changeNumber -= 1)
        }
    })
}