class VirtualText extends VirtualElement {
    
    constructor(elementId, xPosition, yPosition, hidden, relative, text, textColour, textAlign, textFont, size) {
        super(elementId, xPosition, yPosition, hidden, relative);
        this.text = text;
        this.textAlign = textAlign;

        // Old
        // this.textColour = textColour;

        // New
        this.textColour = 'rgba(' + textColour.red + ', ' + textColour.green + ', ' + textColour.blue + ', ' + textColour.alpha + ')'

        this.fillFont = size + 'px ' + textFont
        
        this.calculatePositions();

    }
    
    draw() {
        if (!this.hidden) {
            c.font = this.fillFont;
            c.fillStyle = this.textColour;
            c.textAlign = this.textAlign;
            c.fillText(this.text, this.xPosition, this.yPosition);
        }

    }
};