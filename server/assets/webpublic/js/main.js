function sendCommand(commandID, params = {}, cb = () => { }) {
    let queryString = $.param(params);
    let url = baseURL + '/' + commandID + '?' + queryString;
    $.post(url, function (data) {
        console.log(data);
        if (data.error) return cb(data.error, undefined)
        else return cb(false, data.message);
    });
}

function showNotification(backgroundColor, text) {
    Snackbar.show({ text, backgroundColor, pos: 'top-right', showAction: false });
}

function updateButton(element, commandID, additionalParams = {}) {
    $(element).addClass('loading');
    sendCommand(commandID, additionalParams, (error, message) => {
        // ok, yes, i'm adding 'fake' delay, it just makes the front end nicer, okay!?
        if (error) {
            setTimeout(() => {
                showNotification('#ff0000', error)
                $(element).removeClass('loading')
            }, 300)
        } else {
            setTimeout(() => {
                showNotification('#00ff41', message);
                $(element).removeClass('loading');
                if (message === 'Requested') setTimeout(() => { window.location = window.location }, 200)
            }, 300)
        }
    });
}

// Typewriter welcome text simulator
$(document).ready(function() {
    var welcomeMsg = "Welcome to OsamaAli Command Center...";
    var speed = 80;
    var i = 0;
    var target = document.getElementById("welcome-msg");
    
    if (target) {
        function typeWriter() {
            if (i < welcomeMsg.length) {
                target.innerHTML += welcomeMsg.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        // Small delay before typewriter starts
        setTimeout(typeWriter, 500);
    }
});