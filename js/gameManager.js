class GameManager{
    
    lastTimeStamp = 0;
    gameObjectContainer = [];
    _isActive = true;

    /**
     * Starts the GameLoop
     */
    constructor(){
        this.startGameLoop();
    }

    get isActive() {
        return this._isActive;
    }
    set isActive(boolean) {
        this._isActive = boolean;
        if(this._isActive) this.startGameLoop();
    }

    startGameLoop(){
        window.requestAnimationFrame((timestamp)=>{
            this.lastTimeStamp = timestamp;
            this.update(timestamp);
        });
    }

    /**
     * Call the GameLoop and request the AnimationFrame for update.
     */
    callGameLoop(){
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
        if(this.isActive) this.callGameLoop();
    }
    
    /**
     * Creates an GameObject, adds it to the gameObjectContainer of the GAME_MANAGER
     * and appends it to the gameFrame
     * @param {GameObject} gameObject
     */
    instantiateGameObject(gameObject){
        this.gameObjectContainer.push(gameObject);
        GAME_FRAME.append(gameObject);
        return gameObject;
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

    /**
     * Removes all GameObjects from the DOM and the gameObjectContainer
     */
    removeAllGameObjects(){
        for (const gameObject of this.gameObjectContainer) {
            gameObject.remove();
        }
        this.gameObjectContainer = [];
    }

    /**
     * Set the Environment.offset.x and update the x-positions of all GameObjects 
     */
    set camPosX(number){
        Environment.offset.x = number;
        // Update x-positions of all GameObjects
        for (const gameObject of this.gameObjectContainer) {
            gameObject.positionX = gameObject.positionX;
        }
    }
    get camPosX(){
        return Environment.offset.x;
    }

    /**
     * Set the Environment.offset.y and update the y-positions of all GameObjects 
     */
    set camPosY(number){
        Environment.offset.y = number;
        // Update y-positions of all GameObjects
        for (const gameObject of this.gameObjectContainer) {
            gameObject.positionY = gameObject.positionY;
        }
    }
    get camPosY(){
        return Environment.offset.y;
    }
}