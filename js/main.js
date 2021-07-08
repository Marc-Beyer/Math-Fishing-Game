// Load core components
const GAME_FRAME = document.querySelector("#game-frame");
const GAME_MANAGER = new GameManager();
const SCENE_MANAGER = new SceneManager();
const UI_MANAGER = new UIManager();
const INPUT = new Input();
//const AUDIO_MANAGER = new AudioManager();

let boundingRect;
let scale;
let Environment;

// Add resize event listener and set the initial size
window.addEventListener("resize", setFrameSize());
setFrameSize();

// Register customElements
registerCustomElements();

// Load the first scene
SCENE_MANAGER.loadScene(SceneEnum.fishing);

/**
 * Registers all custom elements
 */
function registerCustomElements(){
    customElements.define("game-object", GameObject);
    customElements.define("game-object-level-controller", FishingController);
    customElements.define("game-object-fish", Fish);
    customElements.define("game-object-bubble", Bubble);
    customElements.define("game-object-hook", Hook);
    customElements.define("game-object-line", Line);
    customElements.define("game-object-player", Player);
    customElements.define("game-object-tile", Tile);
    customElements.define("game-object-tile-manager", TileManager);
}

/**
 * Sets the Environment variable
 */
function setFrameSize(isFullscreen = false){
    boundingRect = GAME_FRAME.getBoundingClientRect();

    console.log(boundingRect);
    console.log(window.screen.width, window.screen.height);

    console.log("document.fullscreenElement", document.fullscreenElement);
    if(document.fullscreenElement || isFullscreen){
        boundingRect.width = window.screen.width;
        boundingRect.height = window.screen.height;
        console.log("FULLSCREEN");
    }

    scale = boundingRect.width/433;
    if(boundingRect.width < 800)
        scale = boundingRect.width/150;

    Environment = {
        offset: {
            x: 0,
            y: 0
        },
        scale: {
            x: scale,
            y: scale
        },
        width: boundingRect.width / scale,
        height: boundingRect.height / scale,
        realWidth: boundingRect.width,
        realHeight: boundingRect.height
    };
    INPUT.calcOffset();
    for (const gameObject of GAME_MANAGER.gameObjectContainer) {
        gameObject.resize();
    }
}

