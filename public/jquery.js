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

$(function(data)
{   
    $("#menu").append(<li id="${data.id}">${data.name}</li>);
})


// function menu(data) javscript 작업한거
// {
//     var ul = document.getElementById("menu") //첫번째
//     var li = document.createElement("li")
//     li.setAttribute("id", data.id)
//     var value = document.createTextNode(data.name)
//     li.appendChild(value)
//     ul.appendChild(li)