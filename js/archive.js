
        // Old Code
        // function createController(x, y, radius) {
        //     c.beginPath();
        //     c.arc(x, y, radius, 0, Math.PI * 2, false)
        //     c.strokeStyle = 'rgba(255,255,255,0.75)';
        //     c.fillStyle = 'rgba(255,255,255,0.75)';
        //     c.fill();
        //     c.stroke();
        //     controllers.push({
        //         centre: {
        //             x: x,
        //             y: y
        //         },
        //         radius: radius
        //     });
        // }

        // createController((width / 2), (height / 2), 200)


        ///////// LEGACY FUNCTION //////////

        // function Text(elementId, xPosition, yPosition, text, colour, textAlign, font, size) {
        //     this.elementId = elementId;
        //     this.xPosition = xPosition;
        //     this.yPosition = yPosition;
        //     this.text = text;
        //     this.textAlign = textAlign;
        //     this.colour = colour;
        //     this.fillFont = size + 'px ' + font

        //     this.draw = function () {
        //         c.font = "30px Comic Sans MS";
        //         c.fillStyle = this.colour;
        //         c.textAlign = this.textAlign;
        //         c.fillText(this.text, canvas.width / 2, canvas.height / 2);
        //     }
        // }



        ///////// LEGACY FUNCTION //////////


        // Virtual Controller Class
        // function VirtualController(elementId, xPosition, yPosition, radius, pointerRadius, vertical, horizonal) {
        //     this.elementId = elementId;
        //     this.xPosition = xPosition;
        //     this.yPosition = yPosition;
        //     this.radius = radius;
        //     this.pointerRadius = pointerRadius;
        //     this.vertical = vertical;
        //     this.horizonal = horizonal;
        //     this.xPointer = xPosition;
        //     this.yPointer = yPosition;

        //     this.xRelPointer = (this.xPointer - this.xPosition) / this.radius;
        //     this.yRelPointer = (this.yPointer - this.yPosition) / this.radius;

        //     this.isTouched = false;
        //     this.socketEmitter = null;

        //     this.startIntervalEmitter = () => {
        //         this.socketEmitter = setInterval(() => {
        //             this.emitCurrentPointer();
        //         }, 30);
        //     }

        //     this.stopIntervalEmitter = () => {
        //         clearInterval(this.socketEmitter);
        //     }

        //     this.stopEmitter = () => {
        //         this.stopIntervalEmitter();
        //         clearInterval(this.socketEmitter);
        //         this.emit(this.elementId, 0, 0);
        //     }

        //     this.emitCurrentPointer = () => {
        //         this.emit(this.elementId, this.xRelPointer, this.yRelPointer);
        //     }

        //     this.emit = (elementId, xRelPointer, yRelPointer) => {
        //         // Socket.io
        //         socket.emit('VirtualControllerUpdate', {
        //             'id': elementId,
        //             'xRelPointer': xRelPointer,
        //             'yRelPointer': yRelPointer
        //         });
        //     }

        //     this.draw = function () {
        //         this.drawController();
        //         this.drawPointer();
        //     }

        //     this.drawController = function () {
        //         c.beginPath();
        //         c.arc(this.xPosition, this.yPosition, this.radius, 0, Math.PI * 2, false)
        //         c.strokeStyle = 'rgba(255,255,255,0.75)';
        //         c.fillStyle = 'rgba(255,255,255,0.75)';
        //         c.fill();
        //         c.stroke();
        //     }

        //     this.drawPointer = function () {
        //         c.beginPath();
        //         c.arc(this.xPointer, this.yPointer, this.pointerRadius, 0, Math.PI * 2, false)
        //         c.strokeStyle = 'rgba(25,25,25,1)';
        //         c.fillStyle = 'rgb(0,0,0)';
        //         c.fill();
        //         c.stroke();
        //     }

        //     this.updatePointerData = function (xTouch, yTouch) {

        //         // If touch is inside a controller
        //         if (Math.pow(xTouch - this.xPosition, 2) + Math.pow(yTouch - this.yPosition, 2) < Math.pow(this.radius, 2)) {
        //             this.xPointer = xTouch;
        //             this.yPointer = yTouch;
        //         } else {
        //             // Detect where the pointer should be IF NOT inside the circle
        //             var secondAnswer = Math.sqrt(Math.pow(xTouch - this.xPosition, 2) + Math.pow(yTouch - this.yPosition, 2));
        //             this.xPointer = (this.xPosition) + this.radius * ((xTouch - this.xPosition) / secondAnswer);
        //             this.yPointer = (this.yPosition) + this.radius * ((yTouch - this.yPosition) / secondAnswer);
        //         }

        //         this.xRelPointer = (this.xPointer - this.xPosition) / this.radius;
        //         this.yRelPointer = (this.yPointer - this.yPosition) / this.radius;
        //         // alert(this.xRelPointer);

        //         // FIXME: Old latency testing.
        //         // var date = new Date();
        //         // socket.emit('Time', date);

        //         this.drawPointer();
        //     }

        //     this.resetPointerData = function () {
        //         this.updatePointerData(this.xPosition, this.yPosition);
        //     }

        // }






//         // touchstart Touch Event
//         canvas.addEventListener('touchstart', function (event) {

// // Flags "controller" to false, unless touch is inside controller
// controller = false;

// // Check to see if pointer is inside ANY of the virtual controller ranges
// for (var index = 0; index < controllers.length; index++) {
//     // (point_x - center_circle_x)^2 + (point_y - center_circle_y)^2 < circle_radius^2
//     // Algorithm from: https://stackoverflow.com/questions/481144/equation-for-testing-if-a-point-is-inside-a-circle

//     // If touch is inside a controller, flag item in touch array
//     if (Math.pow(event.changedTouches[0].pageX - controllers[index].xPosition, 2) + Math.pow(event.changedTouches[0].pageY - controllers[index].yPosition, 2) < Math.pow(controllers[index].radius, 2)) {
//         controller = controllers[index];
//         controller.startIntervalEmitter();
//         // Controllers shouldn't overlap, therefor touch can be in ONLY ONE controller
//         break;
//     }
// }

// touchesObject[event.changedTouches[0].identifier] = {
//     identifier: event.changedTouches[0].identifier,
//     startPosition: {
//         x: event.changedTouches[0].pageX,
//         y: event.changedTouches[0].pageY,
//         controller: controller ? controller : false
//     },
//     currentPosition: {
//         x: event.changedTouches[0].pageX,
//         y: event.changedTouches[0].pageY,
//     },
// };

// // touches.push({
// //     identifier: event.changedTouches[0].identifier,
// //     startPosition: {
// //         x: event.changedTouches[0].pageX,
// //         y: event.changedTouches[0].pageY,
// //         controller: controller ? controller : false
// //     },
// //     currentPosition: {
// //         x: event.changedTouches[0].pageX,
// //         y: event.changedTouches[0].pageY,
// //     },
// // });
// });