/**
 * The basic DomElement
 */
class GameObject extends HTMLElement{
    /**
     * If the Gameobject can collide
     */
    isCollisionActive = false;

    /**
     * A gameobject, that is an HTMLElement and should be con trolled by the GameManager.
     * @param {number} posX the x-position (position-left)
     * @param {number} posY the y-position (position-top)
     * @param {number} width the width
     * @param {number} height the height
     * @param {string} name the name
     */
    constructor(posX, posY, width, height, name = "GameObject"){
        super();

        this.setAttribute("name", name);
        this.style.position = "absolute";

        this.positionX = posX;
        this.positionY = posY;
        this.width = width;
        this.height = height;
        this.isActive = true;
        

        this.createDOMElement();
    }

    /**
     * Getter and Setter
     */
    get positionX() {
        return this._positionX;
    }
    set positionX(number) {
        this._positionX = number;
        this.style.left = (this._positionX + Environment.offset.x) * Environment.scale.x + "px";
    }
    
    get positionY() {
        return this._positionY;
    }
    set positionY(number) {
        this._positionY = number;
        this.style.top = (this._positionY + Environment.offset.y) * Environment.scale.y + "px";
    }

    get width() {
        return this._width;
    }
    set width(number) {
        this._width = number;
        this.style.width = this._width * Environment.scale.x + "px";
    }

    get height() {
        return this._height;
    }
    set height(number) {
        this._height = number;
        this.style.height = this._height * Environment.scale.y + "px";
    }

    /**
     * Is called in the constructor
     * Create your DOMElements here
     */
    createDOMElement(){}

    /**
     * Is called every frame
     * @param {number} deltaTime the time passed since last frame. 
     */
    update(deltaTime){}

    /**
     * Checks if the collider is colliding with this GameObject
     * @param {number} posX the x-position (position-left) of the collider
     * @param {number} posY the y-position (position-top) of the collider
     * @param {number} width the width of the collider
     * @param {number} height the height of the collider
     * @returns {boolean} True if the collider is colliding with this GameObject
     */
    isCollidingWith(posX, posY, width, height){
        if(!this.isCollisionActive) return false;

        if (
            this.positionX < posX + width &&
            this.positionX + this.width > posX &&
            this.positionY < posY + height &&
            this.positionY + this.height > posY
        ) {
            return true;
        }
        return false;
    }

    /**
     * Is called when the gameFrame is resized.
     * Resets the position and scale to update the the new Envirement values
     */
    resize(){
        this.positionX = this.positionX;
        this.positionY = this.positionY;
        this.width = this.width;
        this.height = this.height;
    }
}