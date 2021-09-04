// Enum with all scenes
const SceneEnum = Object.freeze({
    "intro": 0,
    "score": 1,
    "fishing": 2,
    "test": 3
}); 

/**
 * Handle the loading and management of gameScenes
 */
class SceneManager{

    // Assign loading-functions to their correct position in the SceneEnum
    scenes = [this.loadIntroScene, this.loadScoreScene, this.loadFishingScene, this.loadTestScene];

    // Set the startScene
    curScene = SceneEnum.intro;

    /**
     * Create a SceneManager
     */
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
     * Load the handed scene and use parameter
     * @param {number} sceneNr 
     * @param {Object} parameter 
     */
    loadScene(sceneNr = SceneEnum.intro, parameter = {}){
        GAME_MANAGER.removeAllGameObjects();
        this.curScene = sceneNr;
        this.scenes[sceneNr](parameter);
        console.log(parameter);
    }

    /**
     * Reload the current scene
     */
    reloadScene = (parameter = null)=>{
        this.loadScene(this.curScene, parameter);
    }

    /**
     * Load the intro-scene
     * @param
     */
    loadIntroScene(parameter = null){

        UI_MANAGER.toggleTutorial(true);

        let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16);
        hook.FishingController = {
            correctAnswerGiven: () => {
                Fish.prototype.sinkSpeed = 0;
                hook.lastYPosition = hook.positionY;
                hook.nextYPosition = hook.height -2;
                hook.curYPositionAnimationState = 0;
                hook.isYPositionControlledByScript = true;
            },
            finish: ()=>{
                INPUT.addKeyListener();
                UI_MANAGER.toggleTutorial(false);
                SCENE_MANAGER.loadScene(SceneEnum.fishing);
            }
        }
        FishingController.prototype.answer = "tutorial";

        let fish = new Fish(0, 0, 0, 0);
        fish.positionX = Environment.width/1.2;
        fish.positionY = Environment.height/1.2;
        fish.isActive = false;
        fish.number = 20;
        fish.text.textContent = "20";

        GAME_MANAGER.instantiateGameObject(hook);
        GAME_MANAGER.instantiateGameObject(fish);
    }

    /**
     * Load the score-scene
     */
    loadScoreScene(parameter = null){
        let scoreController = new ScoreController(parameter);
        GAME_MANAGER.instantiateGameObject(scoreController);
    }

    /**
     * Load the fishing-scene
     */
    loadFishingScene(parameter = null){
        GAME_MANAGER.camPosX = 0;
        GAME_MANAGER.camPosY = 0;
        // Spawn 
        let hook = new Hook(Environment.width/2, -20, 16, 16);

        let fishingController;
        if(parameter?.score !== undefined && parameter?.hearts !== undefined){
            fishingController = new FishingController(hook, parameter?.score, parameter?.hearts, parameter?.curDepth);
        }else{
            fishingController = new FishingController(hook);
        }
        GAME_MANAGER.instantiateGameObject(fishingController);
        GAME_MANAGER.instantiateGameObject(hook);
    
        // Spawn fish and bubbles
        for (let index = 0; index < 15; index++) {
            fishingController.fishList.push(GAME_MANAGER.instantiateGameObject(new Fish(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9)));
        }
        for (let index = 0; index < 20; index++) {
            fishingController.bubbleList.push(GAME_MANAGER.instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9, "Bubble")));
        }
    }

    /**
     * Load the test-scene
     */
    loadTestScene(parameter = null){
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