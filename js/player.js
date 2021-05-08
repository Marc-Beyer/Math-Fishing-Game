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
            Environment.offset.x -= this.movementSpeed * deltaTime;
            this.style.transform = "scale(-1, 1)";
            this.positionX += 0;
        } 
        if(INPUT.right){
            Environment.offset.x += this.movementSpeed * deltaTime;
            this.style.transform = "scale(1, 1)";
            this.positionX += 0;
        } 
        if(INPUT.up){
            Environment.offset.y -= this.movementSpeed * deltaTime;
            this.positionY += 0;
        } 
        if(INPUT.space){
            
        }
    }
}