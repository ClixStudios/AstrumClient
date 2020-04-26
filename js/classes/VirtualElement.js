class VirtualElement {
    constructor(elementId, xPosition, yPosition, hidden, relative) {
        this.elementId = elementId;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xPositionInitial = xPosition;
        this.yPositionInitial = yPosition;
        this.hidden = hidden;
        this.relative = relative;
    }

    draw() {
        // Draw Function - to be overwritten by inherited object classes
    }

    calculatePositions() {
        // Calculate the x and y position (used for init and IF window size change) - to be overwritten by inherited object classes
        if (this.relative) {
            this.xPosition = width * this.xPositionInitial;
            this.yPosition = height * this.yPositionInitial;
        } else {
            this.xPosition = this.xPositionInitial;
            this.yPosition = this.yPositionInitial;
        }
    }
};