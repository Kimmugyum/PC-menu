getData()

$("#search").click(function() {

    var name = $("#menuname").val()
    search(name)
})

function search(name) {   
    $.ajax({
        url: 'foodpicture/' + name,
        type : 'GET',
        success:function(data) {
            menuSearch(data)
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
                menuPicture(data)     
        }
    })
}

function menu(data) {   
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); // <ul>밑에 jquery로 <li>자식생성
}


function menuPicture(data)
{
    $("#picture").html('')
    for(var i = 0; i < data.length; i++) {
        $("#picture").append(
        `<div>
            <img src = "image/${data[i].filename}" width = "400px" height = "250px">
            <div class = "price">${data[i].name} ${data[i].price}원</div>
                <div class = "all">
                    <i class="far fa-plus-square fa-3x"></i>
                    <input type ="text" class = "count" value = "0개">
                    <i class="far fa-minus-square fa-3x"></i>
                </div>
        </div>`)
    }
}

function menuSearch(data)
{
    $("#picture").html('')
    for(var i = 0; i < data.length; i++) {
        $("#picture").append(
        `<div>
            <img src = "image/${data[i].filename}" width = "400px" height = "250px">
            <div class = "price">${data[i].name} ${data[i].price}원</div>
            <div class = "all">
                <i class="far fa-plus-square fa-3x"></i>
                <input type ="text" class = "count" value = "0개">
                <i class="far fa-minus-square fa-3x"></i>
            </div>
        </div>`)
    }
}