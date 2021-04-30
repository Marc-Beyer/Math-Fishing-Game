class Fish extends GameObject{

    swimSpeed = 0;
    swimDirection = -1;

    constructor(posX, posY, width, height, name = "Fish"){
        super(posX, posY, width, height, name);

        this.randomizeFish();
        this.isCollisionActive = true;
    }

    randomizeFish(){
        this.swimSpeed = Math.random() * 0.05 + 0.01;
        if(Math.random() >= 0.5){
            this.swimDirection = -1;
            this.style.transform = "scaleX(1)";
        }else{
            this.swimDirection = 1;
            this.style.transform = "scaleX(-1)";
        }

        if(Fish.prototype.isSinking){
            this.positionY = Environment.height + Math.random() * Environment.height;
        }else{
            this.positionY = -this.height - Math.random() * Environment.height;
        }
        this.positionX = Math.random() * Environment.width;

        let rdmNr = Math.randomInt(FISH_DICTIONARY.length - 1);
        
        this.img.src = FISH_DICTIONARY[rdmNr].src;
        this.width = FISH_DICTIONARY[rdmNr].width;
        this.height = FISH_DICTIONARY[rdmNr].height;

    }

    createDOMElement(){
        this.img = document.createElement("img");
        this.append(this.img);
    }

    update(deltaTime){
        //transform.position += new Vector3(SwimSpeed * SwimDirection, -sinkSpeed + additionalSinkSpeed, 0) * Time.deltaTime;
        let isGettingOutOfScreenAtSides = this.positionX > Environment.width + 20 || this.positionX < - this.width - 20;
        if (isGettingOutOfScreenAtSides) {
            this.swimDirection *= -1;
            this.style.transform = "scaleX(" + (-this.swimDirection) + ")";
        }
        this.positionX += this.swimSpeed * this.swimDirection * deltaTime;
        this.positionY += Fish.prototype.sinkSpeed * deltaTime;

        let isGettingOutOfScreenAtTop = Fish.prototype.isSinking && this.positionY < - this.height - 20;
        if (isGettingOutOfScreenAtTop) {
            this.randomizeFish();
        }

        let isGettingOutOfScreenAtBottom = Fish.prototype.isSRising && this.positionY > Environment.height;
        if (isGettingOutOfScreenAtBottom) {
            this.randomizeFish();
        }
    }
}

Fish.prototype.sinkSpeed = -0.03;
Fish.prototype.isSinking = true;
Fish.prototype.isSRising = false;