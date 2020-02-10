function preventMotion(event) {
    window.scrollTo(0, 0);
    event.preventDefault();
    event.stopPropagation();
}


function clearHUDElements() {
    controllers = [];
    texts = [];
    buttons = [];
    VirtualElements = [];
    c.clearRect(0, 0, innerWidth, innerHeight);
}


window.addEventListener('resize', function () {
    width = window.innerWidth;
    height = window.innerHeight;
    init();
});


function getSmallestScreenDimention() {
    return width > height ? height : width
}


function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    controllers.forEach(function (ele) {
        ele.draw();
    });

    texts.forEach(function (ele) {
        ele.draw();
    });

    buttons.forEach(function (ele) {
        ele.draw();
    });

    VirtualElements.forEach(function (ele) {
        ele.draw();
    });
}


// FROM: https://developers.google.com/web/fundamentals/native-hardware/fullscreen
function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
    init();
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}