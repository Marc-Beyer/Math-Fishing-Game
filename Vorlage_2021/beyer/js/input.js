/**
 * Handle the player-input
 */
class Input {

    /**
     * Set all eventListener for player-input
     */
    constructor() {
        Input.prototype.keysDown = [];
        Input.prototype.left = false;
        Input.prototype.right = false;
        Input.prototype.up = false;
        Input.prototype.down = false;
        Input.prototype.space = false;
        
        Input.prototype.mousePosition = {x: GAME_FRAME.getBoundingClientRect().x/2, y: 0};
        Input.prototype._mouseScroll = 0;
        Input.prototype.mouseScrollFactor = -0.005;

        Input.prototype.offsetX = GAME_FRAME.getBoundingClientRect().x;
        Input.prototype.offsetY = GAME_FRAME.getBoundingClientRect().y;

        window.addEventListener("keydown", Input.prototype.keyDownHandler, true);
        window.addEventListener("keyup", Input.prototype.keyUpHandler, true);
        
        GAME_FRAME.addEventListener("mousemove", Input.prototype.mousemoveHandler, true);
        GAME_FRAME.addEventListener("touchmove", Input.prototype.touchmoveHandler, false);
        GAME_FRAME.addEventListener("wheel", Input.prototype.mouseWheelHandler, true);
    }

    // Getter and Setter for mouseScroll
    get mouseScroll(){
        let value = Input.prototype._mouseScroll;
        Input.prototype._mouseScroll = 0;
        return value;
    }
    set mouseScroll(number){
        Input.prototype._mouseScroll = number;
    }

    /**
     * Calculate the offset of the gameFrame
     */
    calcOffset(){
        Input.prototype.offsetX = GAME_FRAME.getBoundingClientRect().x;
        Input.prototype.offsetY = GAME_FRAME.getBoundingClientRect().y;
    }

    /**
     * Handle the mouseWheel-event and set the mouseScroll at prototype-level
     * @param {MouseEvent} event 
     */
    mouseWheelHandler(event){
        event.preventDefault();
        Input.prototype.mouseScroll = event.deltaY * Input.prototype.mouseScrollFactor;
    }

    /**
     * Handle the touch-events-event and set the mousePosition at prototype-level
     * @param {*} event 
     */
    touchmoveHandler(event){
        event.preventDefault();
        Input.prototype.mousePosition = {
            x: (event.changedTouches[0].pageX - Input.prototype.offsetX) / Environment.scale.x, 
            y: (event.changedTouches[0].pageY - Input.prototype.offsetY) / Environment.scale.y
        };
    }

    /**
     * Sets the mousePosition
     * @param {MouseEvent} event 
     */
    mousemoveHandler(event){
        Input.prototype.mousePosition = {
            x: (event.pageX - Input.prototype.offsetX) / Environment.scale.x, 
            y: (event.pageY - Input.prototype.offsetY) / Environment.scale.y
        };
    }

    /**
     * Handle all keyDown-events and set all used keys at the prototype-level to true
     * @param {KeyboardEvent} event
     */
    keyDownHandler(event) {
        if (event.defaultPrevented) {
            return; // return if the event was already handled
        }

        switch (event.key) {
            case "Down":
            case "ArrowDown":
            case "s":
                Input.prototype.down = true;
                break;
            case "Up":
            case "ArrowUp":
            case "w":
                Input.prototype.up = true;
                break;
            case "Left":
            case "ArrowLeft":
            case "a":
                Input.prototype.left = true;
                break;
            case "Right":
            case "ArrowRight":
            case "d":
                Input.prototype.right = true;
                break;
            case "Spacebar":
            case " ":
                Input.prototype.space = true;
                break;
            case "Escape":
                UI_MANAGER.toggleMenu();
                break;
            default:
                return; // Return when Input.prototype doesn't handle the key event
        }

        // Prevent the default action to avoid it being handled twice
        event.preventDefault();
    }

    /**
     * Handle all keyUp-events and set all used keys at the prototype-level to false
     * @param {KeyboardEvent} event
     */
    keyUpHandler(event) {
        if (event.defaultPrevented) {
            return; // Return if the event was already handled
        }

        switch (event.key) {
            case "Down":
            case "ArrowDown":
            case "s":
                Input.prototype.down = false;
                break;
            case "Up":
            case "ArrowUp":
            case "w":
                Input.prototype.up = false;
                break;
            case "Left":
            case "ArrowLeft":
            case "a":
                Input.prototype.left = false;
                break;
            case "Right":
            case "ArrowRight":
            case "d":
                Input.prototype.right = false;
                break;
            case "Spacebar":
            case " ":
                Input.prototype.space = false;
                break;
            default:
                return; // Return when Input.prototype doesn't handle the key event
        }

        // Prevent the default action to avoid it being handled twice
        event.preventDefault();
    }
}
