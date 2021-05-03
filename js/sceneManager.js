class SceneManager{

    scenes = [this.loadFishingScene, this.loadTestScene];
    curScene = 0;

    constructor(){}

    loadScene(sceneNr = 0){
        GAME_MANAGER.removeAllGameObjects();
        this.curScene = sceneNr;
        this.scenes[sceneNr]();
    }

    reloadScene = ()=>{
        this.loadScene(this.curScene);
    }

    loadFishingScene(){
        // Spawn 
        let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16)
        GAME_MANAGER.instantiateGameObject(new LevelController(hook));
        GAME_MANAGER.instantiateGameObject(hook);
    
        // Spawn fish and bubbles
        for (let index = 0; index < 15; index++) {
            GAME_MANAGER.instantiateGameObject(new Fish(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
        }
        for (let index = 0; index < 15; index++) {
            GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
        }
    }

    loadTestScene(){
        // Spawn 
        let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16)
        GAME_MANAGER.instantiateGameObject(new LevelController(hook));
        GAME_MANAGER.instantiateGameObject(hook);
    
        // Spawn fish and bubbles
        for (let index = 0; index < 115; index++) {
            GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
        }
    }
}