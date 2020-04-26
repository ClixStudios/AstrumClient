class VirtualImage extends VirtualElement {

    constructor(elementId, xPosition, yPosition, hidden, relative, horizonalAlignment, verticalAlignment, image) {
        super(elementId, xPosition, yPosition, hidden, relative);

        this.horizonalAlignment = horizonalAlignment;
        this.verticalAlignment = verticalAlignment;
        this.image = image;

        
        this.calculatePositions();
    }

    draw() {
        if (!this.hidden) {
            // Draw image
            c.drawImage(this.image, this.xPosition, this.yPosition);
        }
    }

    calculatePositions() {
        switch (this.horizonalAlignment) {
            case 'center':
                this.xPosition = this.xPosition - (this.image.width / 2);
                break;
            case 'right':
                this.xPosition = this.xPosition - this.image.width;
                break;
            default:
                break;
        }
        switch (this.verticalAlignment) {
            case 'middle':
                this.yPosition = this.yPosition - (this.image.height / 2);
                break;
            case 'bottom':
                this.yPosition = this.yPosition - this.image.height;
                break;
            default:
                break;
        }
    }
};