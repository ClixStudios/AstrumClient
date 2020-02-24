
class VirtualImage extends VirtualElement {

    constructor(elementId, xPosition, yPosition, image){
        super(elementId, xPosition, yPosition);
        this.image = image;

    }

    draw() {
        // Draw image
        c.drawImage(this.image, this.xPosition, this.yPosition);
    }
}

// "data:image/png;base64," + yourByteArrayAsBase64;