getData()

function getData()
{
    $.ajax({
        url: 'http://localhost:3000/menu',
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++)
            {
                menu(data[i])
            }
            $("#menu li").click(function(){
                var number = $(this).attr("id");
                gallery(number)
            })
        }
    })
}

function gallery(number)
{
    $.ajax({
        url: 'food/' + number,
        type : 'GET',
        success:function(data){
                menuPicture(data)
                
            }
        })
}

function menu(data)
{   
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); // <ul>밑에 jquery로 <li>자식생성
}


function menuPicture(data)
{
        $("#picture").html(`<img src = "image/${data[0].filename}" width = "350px" height = "250px">`)
        for(var i = 1; i < data.length; i++){
        $("#picture").append(`<img src = "image/${data[i].filename}" width = "350px" height = "250px">`) 
    }
}

// $("#picture").append(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)