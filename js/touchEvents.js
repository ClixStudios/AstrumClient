//////////////////////////////////////////////////////////
////////////////////// TOUCH EVENTS //////////////////////
//////////////////////////////////////////////////////////

// touchstart Touch Event
canvas.addEventListener('touchstart', function (event) {

    // Flags "controller" to false, unless touch is inside controller
    controller = false;
    button = false;


    VirtualElements.forEach(VirtualElement => {
        // Need to detect if a 

        if (Math.pow(event.changedTouches[0].pageX - VirtualElement.xPosition, 2) + Math.pow(event.changedTouches[0].pageY - VirtualElement.yPosition, 2) < Math.pow(VirtualElement.radius, 2)) {

            // FIXME: Possible break here! I haven't had time to test this!!!

            VirtualElement.press();
            // Add the button to array of touches (for use later - onLetGo);

            touchesObject[event.changedTouches[0].identifier] = {
                identifier: event.changedTouches[0].identifier,
                startPosition: {
                    x: event.changedTouches[0].pageX,
                    y: event.changedTouches[0].pageY,
                    // button: false,
                    // controller: VirtualElement,
                    button: VirtualElement.text ? VirtualElement : false,
                    controller: VirtualElement.pointerRadius ? VirtualElement : false,
                },
                currentPosition: {
                    x: event.changedTouches[0].pageX,
                    y: event.changedTouches[0].pageY,
                },
            };


            // // Check if Controller
            // if (VirtualElement.pointerRadius) {
                
            //     // It is a controller, therefore control it. Start the emitter to emit update events every (???ms)
            //     VirtualElement.startIntervalEmitter();
                
            //     // Add the button to array of touches (for use later - onLetGo)
            //     touchesObject[event.changedTouches[0].identifier] = {
            //         identifier: event.changedTouches[0].identifier,
            //         startPosition: {
            //             x: event.changedTouches[0].pageX,
            //             y: event.changedTouches[0].pageY,
            //             controller: VirtualElement,
            //             button: false,
            //         },
            //         currentPosition: {
            //             x: event.changedTouches[0].pageX,
            //             y: event.changedTouches[0].pageY,
            //         },
            //     };
            // } else if (VirtualElement.text) {

            //     // It is a button, therefore press it.
            //     VirtualElement.press();

            //     // Add the button to array of touches (for use later - onLetGo)
            //     touchesObject[event.changedTouches[0].identifier] = {
            //         identifier: event.changedTouches[0].identifier,
            //         startPosition: {
            //             x: event.changedTouches[0].pageX,
            //             y: event.changedTouches[0].pageY,
            //             controller: false,
            //             button: VirtualElement
            //         },
            //         currentPosition: {
            //             x: event.changedTouches[0].pageX,
            //             y: event.changedTouches[0].pageY,
            //         },
            //     };
            // }
        }
    });





    // VirtualElements.forEach(function (VirtualElement) {
    //     try {
    //         if (VirtualElement.pointerRadius) {


    //             // Check to see if pointer is inside ANY of the virtual controller ranges
    //             for (var index = 0; index < controllers.length; index++) {

    //                 console.log('Is Controller');
    //                 // If touch is inside a controller, flag item in touch array
    //                 if (Math.pow(event.changedTouches[0].pageX - controllers[index].xPosition, 2) + Math.pow(event.changedTouches[0].pageY - controllers[index].yPosition, 2) < Math.pow(controllers[index].radius, 2)) {
    //                     controller = controllers[index];
    //                     controller.startIntervalEmitter();
    //                     // Controllers shouldn't overlap, therefor touch can be in ONLY ONE controller
    //                     break;
    //                 }
    //             }

    //         } else if (VirtualElement.pressed) {


    //             for (var index = 0; index < buttons.length; index++) {
    //                 if (Math.pow(event.changedTouches[0].pageX - buttons[index].xPosition, 2) + Math.pow(event.changedTouches[0].pageY - buttons[index].yPosition, 2) < Math.pow(buttons[index].radius, 2)) {
    //                     console.log('Is Button');
    //                     button = buttons[index];
    //                     button.press();
    //                     // alert(JSON.stringify(button));
    //                     // Buttons shouldn't overlap, therefor touch can be in ONLY ONE button
    //                     break;
    //                 }
    //             }

    //         } else {
    //             // console.error('Unknown HUD Element touched.')
    //         }
    //     } catch (error) {
    //         // console.log(error)
    //     }
    // });


    // // Algorithm from: https://stackoverflow.com/questions/481144/equation-for-testing-if-a-point-is-inside-a-circle
    // // (point_x - center_circle_x)^2 + (point_y - center_circle_y)^2 < circle_radius^2

    // // Add the current touch to the touch events array (for use later - onLetGo)
    // touchesObject[event.changedTouches[0].identifier] = {
    //     identifier: event.changedTouches[0].identifier,
    //     startPosition: {
    //         x: event.changedTouches[0].pageX,
    //         y: event.changedTouches[0].pageY,
    //         controller: controller ? controller : false,
    //         button: button ? button : false
    //     },
    //     currentPosition: {
    //         x: event.changedTouches[0].pageX,
    //         y: event.changedTouches[0].pageY,
    //     },
    // };


});

// touchmove Touch Event
canvas.addEventListener('touchmove', function (event) {

    // controllers[0].updatePointerData(event.changedTouches[0].pageX, event.changedTouches[0].pageY)

    for (var changeIndex = 0; changeIndex < event.changedTouches.length; changeIndex++) {

        // var touch = touches.find(touch => touch.identifier === event.changedTouches[changeIndex].identifier);

        // IF the touch was initiated INSIDE a controller, update said controllers pointer (which socket-updates server)
        if (touchesObject[event.changedTouches[changeIndex].identifier].startPosition.controller) {
            touchesObject[event.changedTouches[changeIndex].identifier].startPosition.controller.updatePointerData(event.changedTouches[changeIndex].pageX, event.changedTouches[changeIndex].pageY)
        }

    }



    // console.log(event.changedTouches.length);

    // // Go through all changed touches to update 
    // for (var changeIndex = 0; changeIndex < event.changedTouches.length; changeIndex++) {
    //     // For each touch, find index in array from touch identifier
    //     var touchArrayIndex = touches.findIndex(touch => touch.identifier === event.changedTouches[changeIndex].identifier);

    //     // Once found, update known data in touches array
    //     touches[touchArrayIndex].currentPosition.x = event.changedTouches[changeIndex].pageX;
    //     touches[touchArrayIndex].currentPosition.y = event.changedTouches[changeIndex].pageY;

    //     // Find if touch started INSIDE controller
    //     // if (event.changedTouches[changeIndex].startPosition.insideController) {
    //     // TODO: 
    //     // UPDATE THE CONTROLLER POINT AND POST CONTENT TO WEBSOCKETS
    //     // }
    // }
    // Outline:
    // Go through ALL changed touches to see if ANY started INSIDE a virtual controller
});

// touchend Touch Event
canvas.addEventListener('touchend', function (event) {
    // touches = touches.filter(touch => touch.identifier !== event.changedTouches[0].identifier);


    if (touchesObject[event.changedTouches[0].identifier].startPosition.button) {
        // BUTTON
        touchesObject[event.changedTouches[0].identifier].startPosition.button.release();

    } else if (touchesObject[event.changedTouches[0].identifier].startPosition.controller) {
        // CONTROLLER
        touchesObject[event.changedTouches[0].identifier].startPosition.controller.resetPointerData();
        touchesObject[event.changedTouches[0].identifier].startPosition.controller.stopEmitter();
    }

    delete touchesObject[event.changedTouches[0].identifier];
});