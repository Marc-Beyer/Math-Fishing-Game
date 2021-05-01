class GameManager{
    
    lastTimeStamp = 0;
    gameObjectContainer = [];
    _isActive = true;

    /**
     * Starts the gameloop
     */
    constructor(){
        this.startGameloop();
    }

    get isActive() {
        return this._isActive;
    }
    set isActive(boolean) {
        this._isActive = boolean;
        if(this._isActive) this.startGameloop();
    }

    startGameloop(){
        window.requestAnimationFrame((timestamp)=>{
            this.lastTimeStamp = timestamp;
            this.update(timestamp);
        });
    }

    /**
     * Call the gameloop and request the AnimationFrame for update.
     */
    callGameloop(){
        window.requestAnimationFrame((timestamp)=>{this.update(timestamp)});
    }

    /**
     * Is called every Frame.
     * @param {number} timestamp the current time
     */
    update(timestamp){
        // Calculate the frameTime
        let deltaTime = timestamp - this.lastTimeStamp;
        this.lastTimeStamp = timestamp;

        this.callUpdateOnAllGameObjects(deltaTime);

        // Recall loop
        if(this.isActive) this.callGameloop();
    }

    /**
     * Invoke the update function on all GameObjects of the gameObjectContainer
     * @param {number} deltaTime the time passed since last update call
     */
    callUpdateOnAllGameObjects(deltaTime){
        for (const gameObject of this.gameObjectContainer) {
            if(gameObject.isActive) gameObject.update(deltaTime);
        }
    }
}



/*

root.style.setProperty("--background-gradient", "linear-gradient(0deg, rgba(9,9,121," + this.backgroundAlpha + "), rgba(1,212,255," + this.backgroundAlpha + "))");
this.backgroundAlpha -= deltaTime * .00001;


if(fish.isSwimmingRight){
                fish.style.left = fish.pos + "px";
                fish.pos += fish.speed * deltaTime;
                if(fish.pos > 2000){
                    fish.isSwimmingRight = false;
                    fish.style.transform = "scaleX(1)";
                }
            }else{
                fish.style.left = fish.pos + "px";
                fish.pos -= fish.speed * deltaTime;
                if(fish.pos < -100){
                    fish.isSwimmingRight = true;
                    fish.style.transform = "scaleX(-1)";
                }
            }
*/