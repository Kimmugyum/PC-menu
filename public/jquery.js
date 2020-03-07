getdata()

function getdata()
{
    $.ajax({
        url: 'http://localhost:3000/menu',
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++)
            {
                menu(data[i])
            }
        }
    })
}
function gallery(number)
{

    var a = '/food/'
    $.ajax({
        url: a + number,
        type : 'GET',
        success:function(data){
                menupicture(data)
            }
        })
}

function menu(data)
{   
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); // <ul>밑에 jquery로 <li>자식생성
    $("#menu li").click(function(){
        var number = $(this).attr("id");
        gallery(number)
    })
}


function menupicture(data)
{
        $("#picture").html(`<img src = "image/${data[0].filename}" width = "350px" height = "250px">`) 
        $("#picture").append(`<img src = "image/${data[1].filename}" width = "350px" height = "250px">`) 
        $("#picture").append(`<img src = "image/${data[2].filename}" width = "350px" height = "250px">`) 
}

// $("#picture").append(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)