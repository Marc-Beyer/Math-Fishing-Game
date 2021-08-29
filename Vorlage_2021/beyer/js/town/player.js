class Player extends GameObject{

    movementSpeed = 0.1;

    constructor(posX, posY, width, height, name = "Player"){
        super(posX, posY, width, height, name);
    }

    // overwrite method
    createDOMElement(){
        let img = document.createElement("img");
        img.src = "./assets/textures/fisher_idle-64x64.png";
        this.append(img);
    }

    // overwrite method
    update(deltaTime){
        if(INPUT.left){
            GAME_MANAGER.camPosX -= this.movementSpeed * deltaTime;
            this.positionX += this.movementSpeed * deltaTime;
            this.style.transform = "scale(-1, 1)";
        } 
        if(INPUT.right){
            GAME_MANAGER.camPosX += this.movementSpeed * deltaTime;
            this.positionX -= this.movementSpeed * deltaTime;
            this.style.transform = "scale(1, 1)";
        } 
        if(INPUT.up){
            GAME_MANAGER.camPosY -= this.movementSpeed * deltaTime;
            this.positionY += this.movementSpeed * deltaTime;
            this.positionY += 0;
        } 
        if(INPUT.down){
            GAME_MANAGER.camPosY += this.movementSpeed * deltaTime;
            this.positionY -= this.movementSpeed * deltaTime;
            this.positionY += 0;
        } 
        if(INPUT.space){
            
        }
    }
}