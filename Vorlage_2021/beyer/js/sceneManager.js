// Enum with all scenes
const SceneEnum = Object.freeze({
    "intro": 0,
    "town": 1,
    "fishing": 2,
    "test": 3
}); 

/**
 * Handle the loading and management of gameScenes
 */
class SceneManager{

    // Assign loading-functions to their correct position in the SceneEnum
    scenes = [this.loadIntroScene, this.loadTownScene, this.loadFishingScene, this.loadTestScene];

    // Set the startScene
    curScene = SceneEnum.intro;

    constructor(){}

    /**
     * Load the handed scene
     * @param {number} sceneNr the number of the scene to load
     */
    loadScene(sceneNr = SceneEnum.intro){
        GAME_MANAGER.removeAllGameObjects();
        this.curScene = sceneNr;
        this.scenes[sceneNr]();
    }

    /**
     * Reload the current scene
     */
    reloadScene = ()=>{
        this.loadScene(this.curScene);
    }

    /**
     * Load the intro-scene
     */
    loadIntroScene(){
        //TODO
    }

    /**
     * Load the town-scene
     */
    loadTownScene(){
        let tileManager = new TileManager();
        GAME_MANAGER.instantiateGameObject(tileManager);

        let player = new Player(0, 0, 64, 64);
        GAME_MANAGER.instantiateGameObject(player);
    }

    /**
     * Load the fishing-scene
     */
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
        for (let index = 0; index < 20; index++) {
            fishingController.bubbleList.push(GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9)));
        }
    }

    /**
     * Load the test-scene
     */
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