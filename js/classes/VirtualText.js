class VirtualText extends VirtualElement {
    constructor(elementId, xPosition, yPosition, text, textColour, textAlign, textFont, size) {
        super(elementId, xPosition, yPosition);
        this.text = text;
        this.textAlign = textAlign;
        this.textColour = textColour;
        this.fillFont = size + 'px ' + textFont
    }

    draw() {
        c.font = this.fillFont;
        c.fillStyle = this.textColour;
        c.textAlign = this.textAlign;
        c.fillText(this.text, this.xPosition, this.yPosition);
    }
}