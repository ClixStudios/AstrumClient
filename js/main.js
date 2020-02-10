// /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// Set to true if desktop is allowed
if (true) {
    // Is a MOBILE device!
    // controllers.push(new VirtualController((width / 2), (height / 4), 300, 50, true, true));
    // controllers.push(new VirtualController((width / 2), (height / 4) * 3, 300, 50, true, true));

    socket.on('connect', (data) => {
        console.log(socket.id);

        setCookie('astrumId', socket.id, 7);

        // sets the cookie cookie1
        // document.cookie =
        // 'astrumId=test; expires=Fri, 19 Jun 2020 20:47:11 UTC; path=/'
    })

    socket.on('ForceRefresh', (data) => {
        VirtualElements.push(new VirtualText('99', width * 0.5, height * 0.5, 'Please refresh your device.', 'white', 'center', 'Arial', '50'))
        location.reload();
    });

    socket.on('NewHUDLayout', (data) => {
        clearHUDElements();

        data.HUDElements.forEach(element => {
            switch (element.type) {
                case 'Analogue':
                    if (element.relative) {
                        VirtualElements.push(new VirtualController(element.id, width * element.xPosition, height * element.yPosition, element.radius, element.pointerRadius, true, true));
                    } else {
                        VirtualElements.push(new VirtualController(element.id, element.xPosition, element.yPosition, element.radius, element.pointerRadius, true, true));
                    }
                    break;
                case 'Text':
                    if (element.relative) {
                        VirtualElements.push(new VirtualText(element.id, width * element.xPosition, height * element.yPosition, element.text, element.textColour, element.textAlign, element.textFont, element.textSize))
                    } else {
                        VirtualElements.push(new VirtualText(element.id, element.xPosition, element.yPosition, element.text, element.textColour, element.textAlign, element.textFont, element.textSize))
                    }
                    break;
                case 'Button':
                    if (element.relative) {
                        VirtualElements.push(new VirtualButton(element.id, width * element.xPosition, height * element.yPosition, element.radius, element.text))
                    } else {
                        VirtualElements.push(new VirtualButton(element.id, element.xPosition, element.yPosition, element.radius, element.text))
                    }
                    break;
                default:
                    console.error('Recieved an unknown HUD element.')
                    break;
            }
        });
    });

    socket.on('Vibrate', data => {
        window.navigator.vibrate(data.vibrations);
        // alert(JSON.stringify(data));
    });

    socket.on('Speak', data => {
        var utterThis = new SpeechSynthesisUtterance(data.text);
        synth.speak(utterThis);
    });

    socket.on('UpdateHUDElement', data => {
        // data =
        // HUD Element ID
        // Change? More like "update"
    });

    socket.on('ServerDisconnected', data => {
        clearHUDElements();
    });
    animate();


    //startSimulation and pauseSimulation defined elsewhere
    function handleVisibilityChange() {
        if (document.hidden) {
            // socket.close();
            alert('Because the browser lost focus, you have lost control of the current game. Refresh to join again.');
        } else {
        }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange, false);



} else {
    alert('This is not a mobile device :(');
    window.location.replace("../");
}