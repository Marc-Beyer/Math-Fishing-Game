/**
 * Ground-gameObject
 */
class Ground extends GameObject{

    // The final position of the ground
    finalXPosition = -35;
    
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
        }
    }
}