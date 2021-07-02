class Tile extends GameObject{

    constructor(posX, posY, width, height, name = "Tile"){
        super(posX, posY, width, height, name);
    }

    createDOMElement(){
        this.img = document.createElement("img");
        this.img.src = "./assets/textures/tile_16x16.png";
        this.append(this.img);
    }

    get positionX() {
        return this._positionX;
    }
    set positionX(number) {
        this._positionX = number;

        // Wrap the position offscreen
        if((this._positionX + Environment.offset.x) < -this.width){
            this._positionX = TileManager.prototype.toMapPos(Environment.width - Environment.offset.x);
        }else if((this._positionX + Environment.offset.x) > Environment.width){
            this._positionX = 10000-Environment.offset.x;
        }

        this.style.left = (this._positionX + Environment.offset.x) * Environment.scale.x + "px";
    }
    
    get positionY() {
        return this._positionY;
    }
    set positionY(number) {
        this._positionY = number;

        // Wrap the position offscreen
        if((this._positionY + Environment.offset.y) < -this.height){
            this._positionY = Environment.height - Environment.offset.y;
        }else if((this._positionY + Environment.offset.y) > Environment.height){
            this._positionY = -Environment.offset.y;
        }

        this.style.top = (this._positionY + Environment.offset.y) * Environment.scale.y + "px";
    }
}