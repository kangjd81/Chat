var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (greeting) {
            console.log("greeting " + greeting);
            showMessage(JSON.parse(greeting.body).message);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    var send_message = {
        "user" : "kang",
        "message" : $("#name").val()
    }
    stompClient.send("/app/message", {}, JSON.stringify(send_message));
}

function showMessage(message) {
    console.log("aaaaa:" + message);
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });

    console.log("call history");

    // 이전 대화 내용 불러오기
    /*
    Fetch("/history", {
        method: "GET"
    }).then((response) => {
        this.setState({ messages: response.body });
    });
    */
});

