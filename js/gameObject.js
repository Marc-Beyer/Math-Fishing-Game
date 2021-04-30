class GameObject extends HTMLElement{
    // If the Gameobject can collide
    isCollisionActive = false;

    /**
     * 
     * @param {number} posX 
     * @param {number} posY 
     * @param {number} width 
     * @param {number} height 
     * @param {string} name 
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
        this.style.left = this._positionX * Environment.scale.x + "px";
    }
    
    get positionY() {
        return this._positionY;
    }
    set positionY(number) {
        this._positionY = number;
        this.style.top = this._positionY * Environment.scale.y + "px";
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

    createDOMElement(){}

    update(deltaTime){}

    isCollidingWith(posX, posY, width, height){
        if(!this.isCollisionActive) return false;

        //if(Math.distance(this.positionX, posX) > width + this.width) return false;
        //if(Math.distance(this.positionY, posY) > height + this.height) return false;

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
}