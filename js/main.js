// /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

// Set to true if desktop is allowed
if (true) {
    // Is a MOBILE device!
    // controllers.push(new VirtualController((width / 2), (height / 4), 300, 50, true, true));
    // controllers.push(new VirtualController((width / 2), (height / 4) * 3, 300, 50, true, true));

    socket.on('connect', (data) => {

        // setCookie('astrumId', socket.id, 7);

        // sets the cookie cookie1
        // document.cookie =
        // 'astrumId=test; expires=Fri, 19 Jun 2020 20:47:11 UTC; path=/'
    })

    socket.on('ForceRefresh', (data) => {
        VirtualElements.push(new VirtualText('99', width * 0.5, height * 0.5, 'Refreshing device...', { red: 255, green: 255, blue: 255, alpha: 1 }, 'center', 'Arial', '50'))
        location.reload();
    });

    socket.on('NewHUDLayout', (data) => {

        // Clear old layout
        clearHUDElements();

        data.HUDElements.forEach(element => {
            switch (element.type) {
                case 'Analogue':

                    VirtualElements.push(new VirtualAnalogue(element.id, element.xPosition, element.yPosition, element.hidden, element.relative, element.radius, element.pointerRadius, true, true));
                    // if (element.relative) {
                    //     VirtualElements.push(new VirtualAnalogue(element.id, width * element.xPosition, height * element.yPosition, element.hidden, element.relative, element.radius, element.pointerRadius, true, true));
                    // } else {
                    // }
                    break;

                case 'Text':

                    VirtualElements.push(new VirtualText(element.id, element.xPosition, element.yPosition, element.hidden, element.relative, element.text, element.textColour, element.textAlign, element.textFont, element.textSize))
                    //     if (element.relative) {
                    //     VirtualElements.push(new VirtualText(element.id, width * element.xPosition, height * element.yPosition, element.hidden, element.relative, element.text, element.textColour, element.textAlign, element.textFont, element.textSize))
                    // } else {
                    // }
                    break;

                case 'Button':
                    
                    VirtualElements.push(new VirtualButton(element.id, element.xPosition, element.yPosition, element.hidden, element.relative, element.radius, element.text))
                    // if (element.relative) {
                    //     VirtualElements.push(new VirtualButton(element.id, width * element.xPosition, height * element.yPosition, element.hidden, element.relative, element.radius, element.text))
                    // } else {
                    // }
                    break;

                case 'Image':
                    var arrayBufferView = new Uint8ClampedArray(element.image);
                    var blob = new Blob([arrayBufferView], { type: "image/png" });
                    createImageBitmap(blob).then(image => {
                        VirtualElements.push(new VirtualImage(element.id, element.xPosition, element.yPosition, element.hidden, element.relative, element.horizonalAlignment, element.verticalAlignment, image))

                        // if (element.relative) {
                        //     VirtualElements.push(new VirtualImage(element.id, width * element.xPosition, height * element.yPosition, element.hidden, element.relative, element.horizonalAlignment, element.verticalAlignment, image))
                        // } else {
                        //     VirtualElements.push(new VirtualImage(element.id, element.xPosition, element.yPosition, element.hidden, element.relative, element.horizonalAlignment, element.verticalAlignment, image))
                        // }
                    });
                    break;

                default:
                    console.error('Recieved an unknown HUD element.')
                    break;
            }
        });
    });


    socket.on('image', data => {

        var arrayBufferView = new Uint8ClampedArray(data);
        var blob = new Blob([arrayBufferView], { type: "image/png" });
        createImageBitmap(blob).then(image => {
            VirtualElements.push(new VirtualImage(56, 2, 2, image));
        });

    });

    socket.on('Vibrate', data => {
        window.navigator.vibrate(data.vibrations);

        // alert(JSON.stringify(data));
    });

    socket.on('Speak', data => {
        var utterance = new SpeechSynthesisUtterance(data.text);
        synth.speak(utterance);
    });

    socket.on('UpdateHUDElement', data => {
        // data =
        // HUD Element ID
    });

    socket.on('ServerDisconnected', data => {
        clearHUDElements();
    });
    animate();


    //startSimulation and pauseSimulation defined elsewhere
    function handleVisibilityChange() {
        if (document.hidden) {
            alert('Because the browser lost focus, you have lost control of the current game. Refresh to join again.');
        } else {
        }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange, false);



} else {
    alert('This is not a mobile device :(');
    window.location.replace("../");
}