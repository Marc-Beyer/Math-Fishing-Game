/**
 * Fish-gameObject
 */
class Fish extends GameObject{

    // Speed the fish moves left to right
    swimSpeed = 0;

    // Should the fish change the direction if it is out of the screen
    changeSwimDirWhenOffscreen = true;

    // The current direction(left/right) the fish is moving
    _swimDirection = -1;

    /**
     * Create a fish-gmeObject
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} width 
     * @param {number} height 
     * @param {string} name 
     */
    constructor(posX, posY, width, height, name = "Fish"){
        super(posX, posY, width, height, name);

        this.randomizeFish();
        this.isCollisionActive = true;
    }

    // Getter and setter for swimDirection
    get swimDirection() {
        return this._swimDirection;
    }
    set swimDirection(number) {
        this._swimDirection = number;
        this.style.transform = "scaleX(" + (-this.swimDirection) + ")";
        this.text.style.transform = "scaleX(" + (-this.swimDirection) + ")";
    }

    /**
     * Reuse the fish-GameObject
     * Set new values and move to the other side of the screen
     */
    randomizeFish(){
        this.swimSpeed = Math.random() * 0.05 + 0.01;
        if(Math.random() >= 0.5){
            this.swimDirection = -1;
        }else{
            this.swimDirection = 1;
        }

        if(Fish.prototype.isSinking){
            this.positionY = Environment.height + Math.random() * Environment.height * 2;
        }else{
            this.positionY = -this.height - Math.random() * Environment.height * 2;
        }
        this.positionX = Math.random() * Environment.width;

        let rdmNr = Math.randomInt(FISH_DICTIONARY.length - 1);
        
        this.img.src = FISH_DICTIONARY[rdmNr].src;
        this.img.alt = "fish";
        this.width = FISH_DICTIONARY[rdmNr].width;
        this.height = FISH_DICTIONARY[rdmNr].height;
        
        if(Fish.prototype.curNrTillCorrectAnswer > 0){
            this.number = Math.randomInt(100);
        }else{
            Fish.prototype.curNrTillCorrectAnswer = Fish.prototype.nrTillCorrectAnswer;
            this.number = FishingController.prototype.answer;
        }
        this.text.textContent = this.number;
        Fish.prototype.curNrTillCorrectAnswer--;

        this.isCollisionActive = true;
    }

    /**
     * Is called in the constructor
     * Create your DOMElements here
     * @override
     */
    createDOMElement(){
        this.img = document.createElement("img");
        this.text = document.createElement("p");
        this.text.style.position = "absolute";
        this.text.style.top = "-1rem";
        this.append(this.text);
        this.append(this.img);
    }
    
    /**
     * Is called every frame
     * @param {number} deltaTime the time passed since last frame. 
     * @override
     */
    update(deltaTime){
        //transform.position += new Vector3(SwimSpeed * SwimDirection, -sinkSpeed + additionalSinkSpeed, 0) * Time.deltaTime;
        let isGettingOutOfScreenAtSides = this.positionX > Environment.width + 20 || this.positionX < - this.width - 20;
        if (isGettingOutOfScreenAtSides) {
            if(this.changeSwimDirWhenOffscreen){
                this.swimDirection *= -1;
            }else{
                this.swimSpeed = 0;
                return;
            }
        }
        this.positionX += this.swimSpeed * this.swimDirection * deltaTime;
        this.positionY += Fish.prototype.sinkSpeed * deltaTime;

        let isGettingOutOfScreenAtTop = Fish.prototype.isSinking && this.positionY < - this.height - 20;
        if (isGettingOutOfScreenAtTop) {
            this.randomizeFish();
        }

        let isGettingOutOfScreenAtBottom = Fish.prototype.isRising && this.positionY > Environment.height;
        if (isGettingOutOfScreenAtBottom) {
            this.randomizeFish();
        }
    }
}

// "Static" variables
Fish.prototype.sinkSpeed = -0.02;
Fish.prototype.isSinking = true;
Fish.prototype.isRising = false;

Fish.prototype.curNrTillCorrectAnswer = 5;
Fish.prototype.nrTillCorrectAnswer = 7;