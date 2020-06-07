let socket
socket= io.connect('http://localhost:4000')
socket.on('msg',addMsg)


function addMsg(data){
    if(data.seller==$("#sellerName").val() && data.buyer==$("#buyerName").val()){
        $("#chat").append(`<p class="${data.who}">${data.msg} </p>`)
    }
    
}

$('#buyertext').keypress(function(event){
    if(event.keyCode==13)
   {   
        let data = socketData (this.value,"buyer")
        socket.emit('msg',data)
        $('#buyersubmit').click()
    }
})

$('#sellertext').keypress( function(event){
    if(event.keyCode==13)
    {
    let data =  socketData (this.value,"seller")
      socket.emit('msg',data)
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
