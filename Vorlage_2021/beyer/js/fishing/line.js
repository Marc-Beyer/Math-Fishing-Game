/**
 * Line-gameObject
 */
class Line extends GameObject{

    /**
     * Create a line-gameObject
     * @param {number} width 
     * @param {Hook} pHook 
     * @param {string} name 
     */
    constructor(width, pHook, name = "Line"){
        super(0, 0, width, 2, name);

        this.hook = pHook;
        this.anchorPointX = 0;

        this.positionX = (this.hook.width - this.width) / 2;
        this.positionY = -this.height/2;
    }

    
    /**
     * Is called in the constructor
     * Create your DOMElements here
     * @override
     */
    createDOMElement(){
        this.innetLine = document.createElement("div");
        this.configDOMElements();
        this.append(this.innetLine);

    }

    
    /**
     * Is called every frame
     * @param {number} deltaTime the time passed since last frame. 
     * @override
     */
    update(deltaTime){
        let hookAnchorX = (this.hook.positionX + (this.hook.width - this.width) / 2);
        let xDistanceBetweenAnchorAndHook = hookAnchorX - this.hook.anchorPointX;

        // Set the line to the hook position and rotate to the right angle
        this.style.transform = "rotate(" + -Math.atan( xDistanceBetweenAnchorAndHook / this.hook.positionY ) * 180/Math.PI + "deg)";
    }

    /**
     * Is called when the gameFrame is resized.
     * Resets the position and scale to update the the new Environment values
     * @override
     */
    resize(){
        super.resize();
        this.configDOMElements();

        this.positionX = (this.hook.width - this.width) / 2;
        this.positionY = -this.height/2;
    }

    /**
     * Set the height and color of the line
     */
    configDOMElements(){
        this.height = Math.sqrt( Math.pow(Environment.width, 2) + Math.pow(Environment.height, 2)) * 2;
        this.innetLine.style.background = "#000";
        this.innetLine.style.height = (this.height * Environment.scale.y / 2 + 1) + "px";
    }
}