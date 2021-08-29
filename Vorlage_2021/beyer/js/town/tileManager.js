class TileManager extends GameObject{

    constructor(){
        super(0,0,0,0, "TileManager");
        this.calcTileMap();
    }

    calcTileMap(){
        TileManager.prototype.xNr = Math.ceil(Environment.width / TileManager.prototype.tileMapSize);
        TileManager.prototype.yNr = Math.ceil(Environment.height / TileManager.prototype.tileMapSize);
        console.log(TileManager.prototype.xNr, TileManager.prototype.yNr);
        
        
        for (let y = 0; y < TileManager.prototype.yNr; y++) {
            for (let x = 0; x < TileManager.prototype.xNr; x++) {
                let tile01 = new Tile(this.tileMapSize * x, TileManager.prototype.tileMapSize * y, TileManager.prototype.tileMapSize, TileManager.prototype.tileMapSize);
                GAME_MANAGER.instantiateGameObject(tile01);
            }
        }
    }

    // Overwrite method
    resize(){
        this.calcTileMap();
    }
}

TileManager.prototype.tileMapSize = 16;

TileManager.prototype.toMapPos = function(number){
    return (Math.floor(number * TileManager.prototype.tileMapSize) / TileManager.prototype.tileMapSize);
}










