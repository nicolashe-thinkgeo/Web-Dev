function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>>').html('<i>'+message+'</i>');
}

function processUserInput(chatApp,socket){
    var message =$('#send-message').val();
    var systemMessage;

    if(message.charAt(0)=='/'){
        systemMessage=chatApp.processCommand(message);
        if(systemMessage){
            $('#messges').append(divEscapedContentElement(message));
        }
    }else{
        chatApp.sendMessage($('#room').text(),message);
        $('#messages').append(divEscapedContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function(){
    var chatApp = new Chart(socket);
    socket.on('nameResult',function(result){
        var message;

        if(result.message){
            message = 'You are now known as ' + result.name + '.';
        }else {
            message = result.message;
        }
        $('#message').append(divSystemContentElement(message));
    });

    socket.on('joinResult',function(result){
        $('room').text(result.room);
        $('message').append(divSystemContentElement('Room changed.'));
    });

    socket.on('message',function(message){
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    socket.on('rooms', function () {
            $('#room-list').empty();

            for (var room in rooms) {
                if (room != '') {
                    $('#room-list').append(divEscapedContentElement(room));
                }
            }

            $('#room-list div').click()(function () {
                chatApp.processCommand('/join' + $(this).text());
                $('#send-message').focus();
            });
        });

    setInterval(function(){
        socket.emit('rooms');
    },1000);

    $('#send-message').focus();

    $('#send-form').submit(function(){
        processUserInput(charApp,socket);
        return false;
    });
});