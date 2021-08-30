/**
 * A Bubble-gameObject
 */
class Bubble extends GameObject{

    // The speed of an bubble-object
    risingSpeed = 0;
    
    /**
     * Create a bubble-gameObject
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} width 
     * @param {number} height 
     * @param {string} name 
     */
    constructor(posX, posY, width, height, name = "Fish"){
        super(posX, posY, width, height, name);

        this.randomizeBubble();
    }

    /**
     * Is called in the constructor
     * Create your DOMElements here
     * @override
     */
    createDOMElement(){
        this.img = document.createElement("img");
        this.append(this.img);
    }

    /**
     * Randomize position, size, speed and texture 
     */
    randomizeBubble(){
        this.risingSpeed = Math.randomRange(Bubble.prototype.minSinkSpeed, Bubble.prototype.maxSinkSpeed);

        if(Fish.prototype.isSinking || !Fish.prototype.isRising){
            this.positionY = Environment.height + Math.random() * Environment.height;
        }else{
            this.positionY = -this.height - Math.random() * Environment.height;
        }
        this.positionX = Math.random() * Environment.width;

        let rdmNr = Math.randomInt(BUBBLE_DICTIONARY.length - 1);
        
        this.img.src = BUBBLE_DICTIONARY[rdmNr].src;
        this.img.alt = "bubble";
        this.width = BUBBLE_DICTIONARY[rdmNr].width;
        this.height = BUBBLE_DICTIONARY[rdmNr].height;
    }

    /**
     * Is called every frame
     * @param {number} deltaTime the time passed since last frame. 
     * @override
     */
    update(deltaTime){
        
        this.positionY += (Fish.prototype.sinkSpeed - this.risingSpeed) * deltaTime;

        let isGettingOutOfScreenAtTop = (Fish.prototype.isSinking || !Fish.prototype.isRising) && this.positionY < - this.height - 20;
        if (isGettingOutOfScreenAtTop) {
            this.randomizeBubble();
        }

        let isGettingOutOfScreenAtBottom = Fish.prototype.isRising && this.positionY > Environment.height;
        if (isGettingOutOfScreenAtBottom) {
            this.randomizeBubble();
        }
    }
}

// "Static" variables
Bubble.prototype.minSinkSpeed = 0.01;
Bubble.prototype.maxSinkSpeed = 0.02;