/**
 * Ground-gameObject
 */
class Ground extends GameObject{

    // The final position of the ground
    finalXPosition = -35;

    // Chest at the ground
    chests = [];

    // Offset of the chests
    chestsOffset = 250;
    
    /**
     * Create a ground-gmeObject
     */
     constructor(){
        super(0, 200, 433, 280, "ground");
    }

    /**
     * Is called in the constructor
     * Create your DOMElements here
     * @override
     */
    createDOMElement(){
        let img = document.createElement("img");
        img.src = "./assets/textures/ground.png";
        img.alt = "ground";
        this.append(img);
    }
    
    /**
     * Is called every frame
     * @param {number} deltaTime the time passed since last frame. 
     * @override
     */
    update(deltaTime){
        if(this.positionY > this.finalXPosition || Fish.prototype.isRising){
            this.positionY += Fish.prototype.sinkSpeed * deltaTime;

            for (const chest of this.chests) {
                chest.positionY = this.positionY + this.chestsOffset;
            }
        }
    }

    /**
     * Spawn chests
     */
    spawnChests(){
        this.spawnChest(Environment.width/4, FishingController.prototype.answer);
        this.spawnChest(Environment.width/4 * 3, Math.randomIntRange(0, 100));
    }

        /**
     * Spawn a chest
     */
         spawnChest(xPos, answer){
            let fish = new Fish(0, 0, 0, 0, "Chest");
            fish.positionX = xPos;
            fish.positionY = this.positionY + 250;
            fish.width = 17;
            fish.height = 16;
            fish.number = answer;
            fish.swimSpeed = 0;
            fish.text.textContent = answer;
            fish.img.src = "./assets/textures/chest_17x15.png";
            fish.img.alt = "chest";
            fish.isActive = false;
            fish.isChest = true;

            this.chests.push(fish);
            GAME_MANAGER.instantiateGameObject(fish);
        }
}