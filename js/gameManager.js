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
     * Creates an Gameobject, adds it to the gameObjectContainer of the GAME_MANAGER
     * and appands it to the gameFrame
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

    removeAllGameObjects(){
        for (const gameObject of this.gameObjectContainer) {
            gameObject.remove();
        }
        this.gameObjectContainer = [];
    }
}