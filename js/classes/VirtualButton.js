class VirtualButton extends VirtualElement {

    constructor(elementId, xPosition, yPosition, hidden, relative, radius, text) {
        super(elementId, xPosition, yPosition, hidden, relative);

        this.radius = radius;
        this.text = text;
        this.pressed = false;

        this.calculatePositions();
    }

    press() {
        this.pressed = true;
        alert('pressed')
        socket.emit('VirtualButtonUpdate', {
            'id': this.elementId,
            "event": "press"
        });
        this.draw();
    }


    release() {
        this.pressed = false;
        socket.emit('VirtualButtonUpdate', {
            'id': this.elementId,
            "event": "release"
        });
        this.draw();
    }

    draw() {
        if (!this.hidden) {
            // Draw circle
            c.beginPath();
            c.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
            c.strokeStyle = "#b0b0b0";
            c.lineWidth = 30;
            c.stroke();

            if (!this.pressed) {
                c.fillStyle = "#616161";
            } else {
                c.fillStyle = "#cccccc";
            }

            c.fill();

            c.font = '40px Arial';
            c.fillStyle = 'white';
            c.textAlign = 'center';
            c.fillText(this.text, this.xPosition, this.yPosition);
        }
    }

};