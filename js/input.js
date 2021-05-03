class Input {
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

    get mouseScroll(){
        let value = Input.prototype._mouseScroll;
        Input.prototype._mouseScroll = 0;
        return value;
    }
    set mouseScroll(number){
        Input.prototype._mouseScroll = number;
    }

    calcOffset(){
        Input.prototype.offsetX = GAME_FRAME.getBoundingClientRect().x;
        Input.prototype.offsetY = GAME_FRAME.getBoundingClientRect().y;
    }

    mouseWheelHandler(event){
        event.preventDefault();
        Input.prototype.mouseScroll = event.deltaY * Input.prototype.mouseScrollFactor;
    }

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
     *
     * @param {KeyboardEvent} event
     * @returns
     */
    keyDownHandler(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
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
                return; // Quit when Input.prototype doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }

    /**
     *
     * @param {KeyboardEvent} event
     * @returns
     */
    keyUpHandler(event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
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
                return; // Quit when Input.prototype doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
}
