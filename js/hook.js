class Hook extends GameObject{

    anchorPointX = 0;
    anchorPointMoveingSpeed = 0.01;
    anchorPointMaxSmoothSpeed = 1;
    hookSmoothingVelocityX = 0.01;
    curHookVelocityX = 0;
    nrOfFishCaught = 0;

    constructor(posX, posY, width, height, name = "Hook"){
        super(posX, posY, width, height, name);
    }

    
    /**
     * Getter and Setter Overritten
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
        this.anchorPointX = INPUT.mousePosition.x;

        this.positionY = Math.clamp(this.positionY + INPUT.mouseScroll * deltaTime, 10, Environment.height - this.height - 10);

        this.smoothAnchorPoint(deltaTime);

        Math.getQuestion();
    }

    smoothAnchorPoint(deltaTime) {
        let threshold = 10;

        for(let gameObject of GAME_MANAGER.gameObjectContainer){
            if(gameObject.isCollidingWith(this.positionX, this.positionY, this.width, this.height)){
                if(gameObject instanceof Fish){
                    this.append(gameObject);
                    gameObject.isActive = false;
                    gameObject.isCollisionActive = false;
                    gameObject.style.top = "unset";
                    gameObject.style.left = 0;
                    gameObject.style.bottom = 0;
                    gameObject.style.zIndex = this.nrOfFishCaught++;

                    if(Fish.prototype.isSinking){
                        Fish.prototype.sinkSpeed = 0.1;
                        Fish.prototype.isSinking = false;
                        Fish.prototype.isSRising = true;
                    }
                }
            }
        }

        /*
        let difference = this.anchorPointX - this.positionX + this.width/2;
        console.log(difference);
        if(difference < -threshold || difference > threshold){
            this.curHookVelocityX += this.hookSmoothingVelocityX * difference * deltaTime;
            this.anchorPointLinedUpOnceBefore = false;
        } else if(!this.anchorPointLinedUpOnceBefore) {
            this.anchorPointLinedUpOnceBefore = true;
            this.curHookVelocityX /= 1.5;
        }

        this.positionX = this.positionX + this.curHookVelocityX;

        */
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

        //transform.position = new Vector3(transform.position.x + this.curHookVelocityX * deltaTime, yOffset + Mathf.Abs(this.anchorPointX - transform.position.x) * heightFactor, 0);
        //let difference = this.anchorPointX - this.positionX + this.width/2;
        this.positionX += this.curHookVelocityX;

        //line.SetPosition(0, new Vector3(transform.position.x, transform.position.y + 0.37f, 0));
        
    }
}