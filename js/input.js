class Input {
    constructor() {
        Input.prototype.keysDown = [];
        Input.prototype.left = false;
        Input.prototype.right = false;
        Input.prototype.up = false;
        Input.prototype.down = false;
        Input.prototype.space = false;
        
        Input.prototype.mousePosition = {x: Environment.width/2 , y: 0};
        Input.prototype._mouseScroll = 0;
        Input.prototype.mouseScrollFactor = -0.005;

        Input.prototype.offsetX = gameFrame.getBoundingClientRect().x;
        Input.prototype.offsetY = gameFrame.getBoundingClientRect().y;

        window.addEventListener("keydown", Input.prototype.keyDownHandler, true);
        window.addEventListener("keyup", Input.prototype.keyUpHandler, true);
        
        gameFrame.addEventListener("mousemove", Input.prototype.mousemoveHandler, true);
        gameFrame.addEventListener("wheel", Input.prototype.mouseWheelHandler, true);
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
        Input.prototype.offsetX = gameFrame.getBoundingClientRect().x;
        Input.prototype.offsetY = gameFrame.getBoundingClientRect().y;
    }

    mouseWheelHandler(event){
        event.preventDefault();
        Input.prototype.mouseScroll = event.deltaY * Input.prototype.mouseScrollFactor;
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
                GAME_MANAGER.isActive = !GAME_MANAGER.isActive;
                console.log("pause", GAME_MANAGER.isActive);
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
