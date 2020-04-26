class VirtualAnalogue extends VirtualElement {

    constructor(elementId, xPosition, yPosition, hidden, relative, radius, pointerRadius, vertical, horizonal) {
        super(elementId, xPosition, yPosition, hidden, relative);

        this.radius = radius;
        this.pointerRadius = pointerRadius;
        this.vertical = vertical;
        this.horizonal = horizonal;
        this.xPointer = xPosition;
        this.yPointer = yPosition;
        this.xRelPointer = (this.xPointer - this.xPosition) / this.radius;
        this.yRelPointer = (this.yPointer - this.yPosition) / this.radius;
        this.isTouched = false;
        this.socketEmitter = null;

        this.calculatePositions();

        this.resetPointerData();

    }


    press() {
        this.startIntervalEmitter();
    }

    startIntervalEmitter() {
        this.socketEmitter = setInterval(() => {
            this.emitCurrentPointer();
        }, 30);
    }

    stopIntervalEmitter() {
        clearInterval(this.socketEmitter);
    }

    stopEmitter() {
        this.stopIntervalEmitter();
        clearInterval(this.socketEmitter);
        this.emit(this.elementId, 0, 0);
    }

    emitCurrentPointer() {
        this.emit(this.elementId, this.xRelPointer, this.yRelPointer);
    }

    emit(elementId, xRelPointer, yRelPointer) {
        alert('emitted')
        // Socket.io
        socket.emit('VirtualControllerUpdate', {
            'id': elementId,
            'xRelPointer': xRelPointer,
            'yRelPointer': yRelPointer
        });
    }

    draw() {
        if (!this.hidden) {
            this.drawController();
            this.drawPointer();
        }
    }

    drawController() {
        c.beginPath();
        c.arc(this.xPosition, this.yPosition, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'rgba(255,255,255,0.75)';
        c.fillStyle = 'rgba(255,255,255,0.75)';
        c.fill();
        c.stroke();
    }

    drawPointer() {
        c.beginPath();
        c.arc(this.xPointer, this.yPointer, this.pointerRadius, 0, Math.PI * 2, false)
        c.strokeStyle = 'rgba(25,25,25,1)';
        c.fillStyle = 'rgb(0,0,0)';
        c.fill();
        c.stroke();
    }

    updatePointerData(xTouch, yTouch) {

        // If touch is inside a controller
        if (Math.pow(xTouch - this.xPosition, 2) + Math.pow(yTouch - this.yPosition, 2) < Math.pow(this.radius, 2)) {
            this.xPointer = xTouch;
            this.yPointer = yTouch;
        } else {
            // Detect where the pointer should be IF NOT inside the circle
            var secondAnswer = Math.sqrt(Math.pow(xTouch - this.xPosition, 2) + Math.pow(yTouch - this.yPosition, 2));
            this.xPointer = (this.xPosition) + this.radius * ((xTouch - this.xPosition) / secondAnswer);
            this.yPointer = (this.yPosition) + this.radius * ((yTouch - this.yPosition) / secondAnswer);
        }

        this.xRelPointer = (this.xPointer - this.xPosition) / this.radius;
        this.yRelPointer = (this.yPointer - this.yPosition) / this.radius;
        // alert(this.xRelPointer);

        // Old latency testing.
        // var date = new Date();
        // socket.emit('Time', date);

        this.drawPointer();
    }

    resetPointerData() {
        this.updatePointerData(this.xPosition, this.yPosition);
    }

};