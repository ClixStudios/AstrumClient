class VirtualText extends VirtualElement {
    constructor(elementId, xPosition, yPosition, text, textColour, textAlign, textFont, size) {
        super(elementId, xPosition, yPosition);
        this.text = text;
        this.textAlign = textAlign;


        // Old
        // this.textColour = textColour;

        // New
        this.textColour = 'rgba(' + textColour.red + ', ' + textColour.green + ', ' + textColour.blue + ', ' + textColour.alpha + ')'

        console.log(this.textColour)

        this.fillFont = size + 'px ' + textFont
    }

    draw() {
        c.font = this.fillFont;
        c.fillStyle = this.textColour;
        c.textAlign = this.textAlign;
        c.fillText(this.text, this.xPosition, this.yPosition);
    }
}