class Hook extends GameObject{

    anchorPointX = 0;
    anchorPointMoveingSpeed = 0.01;
    anchorPointMaxSmoothSpeed = 1;
    hookSmoothingVelocityX = 0.01;
    curHookVelocityX = 0;

    isYPositionControlledByScript = true;
    nextYPosition = Environment.height/2;
    lastYPosition = 0;
    yPositionAnimationFactor = 0.001;
    curYPositionAnimationState = 0;

    nrOfFishCaught = 0;
    FishingController;

    constructor(posX, posY, width, height, name = "Hook"){
        super(posX, posY, width, height, name);
    }

    
    /**
     * Getter and Setter Overwritten
     */
    get positionX() {
        return this._positionX;
    }
    set positionX(number) {
        this._positionX = Math.clamp(number, -this.width, Environment.width);
        this.style.left = this._positionX * Environment.scale.x + "px";
    }

    createDOMElement(){
        let img = document.createElement("img");
        img.src = "./assets/textures/hook-16x16.png";
        this.append(img);
        
        // Create the line GameObject
        let line = new Line(2, this);
        this.append(line);
        GAME_MANAGER.gameObjectContainer.push(line);
    }

    update(deltaTime){

        this.calcYPosition(deltaTime);

        this.smoothAnchorPoint(deltaTime);
    }

    calcYPosition(deltaTime) {
        if(this.isYPositionControlledByScript){
            this.curYPositionAnimationState += deltaTime * this.yPositionAnimationFactor;
            this.positionY = Math.lerp(this.lastYPosition, this.nextYPosition, this.curYPositionAnimationState);
            if(!Fish.prototype.isSRising && this.curYPositionAnimationState >= 1){
                this.curYPositionAnimationState = 1;
                this.isYPositionControlledByScript = false;
            }
        }else{
            this.positionY = Math.clamp(this.positionY + INPUT.mouseScroll * deltaTime, 10, Environment.height - this.height - 10);
        }
    }

    smoothAnchorPoint(deltaTime) {
        let threshold = 10;
        this.anchorPointX = INPUT.mousePosition.x;

        for(let gameObject of GAME_MANAGER.gameObjectContainer){
            if(gameObject.isCollidingWith(this.positionX, this.positionY, this.width, this.height)){
                this.handleCollision(gameObject);
            }
        }

        if (this.anchorPointX > this.positionX + this.width/2 + threshold) {
            this.curHookVelocityX += this.hookSmoothingVelocityX * deltaTime;
            this.anchorPointLinedUpOnceBefore = false;
        } else if (this.anchorPointX < this.positionX + this.width/2 - threshold) {
            this.curHookVelocityX -= this.hookSmoothingVelocityX * deltaTime;
            this.anchorPointLinedUpOnceBefore = false;
        } else if(!this.anchorPointLinedUpOnceBefore) {
            this.anchorPointLinedUpOnceBefore = true;
            this.curHookVelocityX /= 1.5;
        }

        this.positionX += this.curHookVelocityX;
    }

    handleCollision(gameObject) {
        let isFish = gameObject instanceof Fish;
        if (isFish) {
            this.handleCollisionWithAFish(gameObject);
        }
    }

    handleCollisionWithAFish(gameObject) {
        let isAnswerCorrect = FishingController.prototype.answer === gameObject.number;
        if (Fish.prototype.isSRising || isAnswerCorrect) {
            // Answer is correct or all Fish are rising
            this.append(gameObject);
            gameObject.isActive = false;
            gameObject.isCollisionActive = false;
            gameObject.style.top = "unset";
            gameObject.style.left = 0;
            gameObject.style.bottom = 0;
            let rdmFishRotation = Math.randomIntRange(20, 150);
            let fishOffset = (gameObject.width * Environment.scale.x + (gameObject.height * Environment.scale.y * rdmFishRotation * 0.005)) / 2;
            gameObject.style.transform = "rotateZ(" + rdmFishRotation + "deg) translate(" + fishOffset + "px)";
            gameObject.text.style.display = "none";

            if (Fish.prototype.isSinking || !Fish.prototype.isSRising) {
                Fish.prototype.sinkSpeed = 0.1;
                Fish.prototype.isSinking = false;
                Fish.prototype.isSRising = true;
            }
        }else{ 
            // Answer is wrong
            //gameObject.isCollisionActive = false;
            this.FishingController.wrongAnswerGiven();
            UI_MANAGER.showWrongMSG();
        }
    }
}