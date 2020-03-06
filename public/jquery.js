getdata()
gallery()
function getdata()
{
    $.ajax({
        url: 'http://localhost:3001/menu',
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++)
            {
                menu(data[i])
            }
        }
    })
}

function gallery()
{
    $.ajax({
        url: 'http://localhost:3001/food',
        type : 'GET',
        success:function(data){
            for(var i = 0; i < data.length; i++)
            {
                    menupicture(data[i])
            }
        }
    })
}

function menu(data)
{   
    $("#menu").append(`<li id="${data.id}">${data.name}</li>`); // <ul>밑에 jquery로 <li>자식생성
}


function menupicture(data)
{
    $('#menu li').click(function()
    {
       var foodid = $(this).attr('id')
       if(data.menu == foodid)
        {
            var a = $("#picture").html(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)
            $("#picture").append(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)
            $("#picture").append(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)
        }
    })
}

// $("#picture").append(`<img src = "MenuList%20Picture/${data.filename}" width = "350px" height = "250px">`)