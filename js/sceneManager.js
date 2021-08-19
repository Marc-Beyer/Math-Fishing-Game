const SceneEnum = Object.freeze({
    "intro": 0,
    "town": 1,
    "fishing": 2,
    "test": 3
}); 

class SceneManager{

    scenes = [this.loadIntroScene, this.loadTownScene, this.loadFishingScene, this.loadTestScene];
    curScene = SceneEnum.intro;

    constructor(){}

    loadScene(sceneNr = SceneEnum.intro){
        GAME_MANAGER.removeAllGameObjects();
        this.curScene = sceneNr;
        this.scenes[sceneNr]();
    }

    reloadScene = ()=>{
        this.loadScene(this.curScene);
    }

    loadIntroScene(){
        //TODO
    }

    loadTownScene(){
        let tileManager = new TileManager();
        GAME_MANAGER.instantiateGameObject(tileManager);

        let player = new Player(0, 0, 64, 64);
        GAME_MANAGER.instantiateGameObject(player);
    }

    loadFishingScene(){
        GAME_MANAGER.camPosX = 0;
        GAME_MANAGER.camPosY = 0;
        // Spawn 
        let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16);
        let fishingController = new FishingController(hook);
        GAME_MANAGER.instantiateGameObject(fishingController);
        GAME_MANAGER.instantiateGameObject(hook);
    
        // Spawn fish and bubbles
        for (let index = 0; index < 15; index++) {
            fishingController.fishList.push(GAME_MANAGER.instantiateGameObject(new Fish(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9)));
        }
        for (let index = 0; index < 15; index++) {
            fishingController.bubbleList.push(GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9)));
        }
    }

    loadTestScene(){
        // Spawn 
        let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16)
        GAME_MANAGER.instantiateGameObject(new FishingController(hook));
        GAME_MANAGER.instantiateGameObject(hook);
    
        // Spawn fish and bubbles
        for (let index = 0; index < 115; index++) {
            GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
        }
    }
}