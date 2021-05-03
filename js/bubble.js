class Bubble extends GameObject{

    risingSpeed = 0;
    
    constructor(posX, posY, width, height, name = "Fish"){
        super(posX, posY, width, height, name);

        this.randomizeBubble();
    }

    createDOMElement(){
        this.img = document.createElement("img");
        this.append(this.img);
    }

    randomizeBubble(){
        this.risingSpeed = Math.random() * 0.03 + 0.01;

        if(Fish.prototype.isSinking || !Fish.prototype.isSRising){
            this.positionY = Environment.height + Math.random() * Environment.height;
        }else{
            this.positionY = -this.height - Math.random() * Environment.height;
        }
        this.positionX = Math.random() * Environment.width;

        let rdmNr = Math.randomInt(BUBBLE_DICTIONARY.length - 1);
        
        this.img.src = BUBBLE_DICTIONARY[rdmNr].src;
        this.width = BUBBLE_DICTIONARY[rdmNr].width;
        this.height = BUBBLE_DICTIONARY[rdmNr].height;
    }

    update(deltaTime){
        
        this.positionY += (Fish.prototype.sinkSpeed - this.risingSpeed) * deltaTime;

        let isGettingOutOfScreenAtTop = (Fish.prototype.isSinking || !Fish.prototype.isSRising) && this.positionY < - this.height - 20;
        if (isGettingOutOfScreenAtTop) {
            this.randomizeBubble();
        }

        let isGettingOutOfScreenAtBottom = Fish.prototype.isSRising && this.positionY > Environment.height;
        if (isGettingOutOfScreenAtBottom) {
            this.randomizeBubble();
        }
    }
}