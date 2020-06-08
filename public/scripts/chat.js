let socket
socket= io.connect('http://localhost:4000')
socket.on('msg',addMsg)


function addMsg(data){
    if(data.seller==$("#sellerName").val() && data.buyer==$("#buyerName").val()){
        if(data.who=="buyer"){
            $("#chat").append(`<div class="buyer"  id="newbuyer"></div>`)
            $("#newbuyer").append(`<p class="buyername">${data.buyer} : </br> ${data.msg}</p>`)
            var chat = document.getElementById("chat");
            chat.scrollTop = chat.scrollHeight;
            
        }
        else{
            $("#chat").append(`<div class="seller" id="newseller" > </div>`)
            $("#newseller").append(` <p class="sellername">${data.seller} : </br> ${data.msg}</p>`)
            var chat = document.getElementById("chat");
            chat.scrollTop = chat.scrollHeight;
            
        }
    }
    
}

$('#buyertext').keypress(function(event){
    if(event.keyCode==13)
   {   
        let data = socketData (this.value,"buyer")
        socket.emit('msg',data)
        console.log("here")
        $('#buyersubmit').click()
    }
})

$('#sellertext').keypress( function(event){
    if(event.keyCode==13)
    {
    let data =  socketData (this.value,"seller")
      socket.emit('msg',data)
      console.log("here")

    $('#sellersubmit').click()
    }

})



function socketData (MsgData,who){
    let data= {
        seller: $("#sellerName").val(),
        buyer : $("#buyerName").val(),
        msg :MsgData,
        who: who
    }
    return data

}
