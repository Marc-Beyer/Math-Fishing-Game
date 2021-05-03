const root = document.documentElement;
const gameFrame = document.querySelector("#game-frame");

const GAME_MANAGER = new GameManager();
const INPUT = new Input();

let boundingRect;
let scale;
let Environment;

// Add resize event listener and set the initial size
window.addEventListener('resize', setFrameSize());
setFrameSize();

// Register customElements
registerCustomElements();

// Spawn 
let hook = new Hook(Environment.width/2, Environment.height/2, 16, 16)
instantiateGameObject(new LevelController(hook));
instantiateGameObject(hook);

// Spawn fish and bubbles
for (let index = 0; index < 15; index++) {
    instantiateGameObject(new Fish(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
}
for (let index = 0; index < 15; index++) {
    instantiateGameObject(new Bubble(Math.random()*Environment.width-18, Math.random()*Environment.height-9, 18, 9));
}

/**
 * Creates an Gameobject, adds it to the gameObjectContainer of the GAME_MANAGER
 * and appands it to the gameFrame
 * @param {GameObject} gameObject
 */
function instantiateGameObject(gameObject){
    GAME_MANAGER.gameObjectContainer.push(gameObject);
    gameFrame.append(gameObject);
    return gameObject;
}

/**
 * Registers all custom elements
 */
function registerCustomElements(){
    customElements.define("game-object", GameObject);
    customElements.define("game-object-level-controller", LevelController);
    customElements.define("game-object-fish", Fish);
    customElements.define("game-object-bubble", Bubble);
    customElements.define("game-object-hook", Hook);
    customElements.define("game-object-line", Line);
}

function setFrameSize(){
    boundingRect = gameFrame.getBoundingClientRect();
    scale = boundingRect.width/333;
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