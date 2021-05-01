const hook = document.querySelector("#gobj-hook");
const root = document.documentElement;
const gameFrame = document.querySelector("#game-frame");

// TODO clean up
// Color #0094FF
// Color #06248C
let boundingRect = gameFrame.getBoundingClientRect();

let Environment = {
        offset: {
            x: 0,
            y: 0
        },
        scale: {
            x: 4,
            y: 4
        },
        width: boundingRect.width / 4,
        height: boundingRect.height / 4,
        realWidth: boundingRect.width,
        realHeight: boundingRect.height
};

const INPUT = new Input();
const GAME_MANAGER = new GameManager();

// Register customElements
registerCustomElements();

instantiateGameObject(new Hook(Environment.width/2, Environment.height/2, 16, 16));

instantiateGameObject(new LevelController());

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

