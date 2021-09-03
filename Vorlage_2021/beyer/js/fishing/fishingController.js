/**
 * FishingController-gameObject
 * Controls the game-logic in the fishing scene
 */
class FishingController extends GameObject{

    // The max depth a player can reach
    maxDepth = -5;

    // The max depth a player reached
    reachedDepth = 0;

    // The number of lives a player has
    hearts = 3;

    // All fish in the scene
    fishList = [];

    // All bubble in the scene
    bubbleList = [];

    /**
     * Create a FishingController-gameObject
     * @param {Hook} hook 
     * @param {number} score 
     * @param {string} name 
     */
    constructor(hook, score = 0, hearts = 3, curDepth = 0, name = "FishingController"){
        super(0,0,0,0,name);

        this.score = score;
        this.hearts = hearts;

        this.hook = hook;
        hook.FishingController = this;

        this.mathFieldElement = document.querySelector("#mathField");
        this.heartContainer = document.querySelector("#heart-container");
        this.depthMeterElement = document.querySelector("#depthMeter");
        this.depthMeterPointerElement = document.querySelector("#depthMeter-pointer");

        this.heartContainer.style.width = this.hearts * 50 + "px";

        const[x, y, answer] = Math.getQuestion();
        this.mathFieldElement.innerText = (`${x} + ${y} = ?`);

        FishingController.prototype.answer = answer;

        this.curDepth = curDepth;
        this.refreshUI = true;

        // Set static values
        Fish.prototype.sinkSpeed = -0.02;
        Fish.prototype.isSinking = true;
        Fish.prototype.isRising = false;
        Fish.prototype.curNrTillCorrectAnswer = 5;
        Fish.prototype.nrTillCorrectAnswer = 7;

        
        UI_MANAGER.wrongIndicator.addEventListener("animationend", ()=>{
            this.wrongIndicatorEnded();
        });

        this.ground = new Ground();
        this.ground.isActive = false;
        GAME_MANAGER.instantiateGameObject(this.ground);
    }
    
    /**
     * Is called every frame
     * Update the UI
     * @param {number} deltaTime the time passed since last frame. 
     * @override
     */
    update(deltaTime){

        this.refreshUI = !this.refreshUI;
        if(this.refreshUI) return;
        
        let backgroundColor = Math.lerpRGBColor({r: 0, g: 149, b: 255}, {r: 6, g: 35, b: 142}, this.curDepth / this.maxDepth);
        GAME_FRAME.style.background = "rgb(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + ")";
        
        if(Fish.prototype.isSinking || Fish.prototype.isRising) 
            this.curDepth += Fish.prototype.sinkSpeed * 0.4;

        this.depthMeterPointerElement.style.top = (this.curDepth / this.maxDepth) * 68 + 9 + "%";

        
        if(!this.dontActivateGround && Fish.prototype.isSinking && this.curDepth <= this.maxDepth + 3){
            this.ground.isActive = true;
            this.ground.spawnChests();
            this.dontActivateGround = true;
        }

        if(Fish.prototype.isSinking && this.curDepth <= this.maxDepth){
            Fish.prototype.sinkSpeed = 0;
            Fish.prototype.isSinking = false;
        }

        if(Fish.prototype.isRising && this.curDepth >= 0){
            if(Fish.prototype.sinkSpeed > 0){
                Fish.prototype.sinkSpeed = 0;
                this.hook.lastYPosition = this.hook.positionY;
                this.hook.nextYPosition = this.hook.height -2;
                this.hook.curYPositionAnimationState = 0;
                this.hook.isYPositionControlledByScript = true;
            }else{
                if(this.hook.curYPositionAnimationState > 1){
                    Fish.prototype.isRising = false;
                    Fish.prototype.isSinking = false;
                    Fish.prototype.sinkSpeed = 0;
                    SCENE_MANAGER.loadScene(SceneEnum.fishing, {
                        score: this.score + this.hook.nrOfFishCaught,
                        hearts: this.hearts,
                        curDepth: this.reachedDepth
                    });
                }
            }
        }
    }

    /**
     * Called when the player chooses a correct answer
     */
    correctAnswerGiven(){
        for (const fish of this.fishList) {
            fish.text.textContent = "BONUS";
        }
    }

    /**
     * Called when the player chooses a wrong answer
     * Check if the player has lost all hearts
     * Let all fish leave the screen
     */
    wrongAnswerGiven(){
        this.hearts--;
        this.heartContainer.style.width = this.hearts * 50 + "px";
        if(this.hearts <= 0){
            // Game over
            this.mathFieldElement.innerText = this.mathFieldElement.innerText.substring(0, this.mathFieldElement.innerText.length - 1) + FishingController.prototype.answer;
            SCENE_MANAGER.loadScene(SceneEnum.score, {score:this.score + this.hook.nrOfFishCaught});
        }

        for (const fish of this.fishList) {
            fish.isCollisionActive = false;
            fish.swimSpeed += .2;
            fish.changeSwimDirWhenOffscreen = false;
            if(fish.positionX > Environment.width/2){
                fish.swimDirection = 1;
            }else{
                fish.swimDirection = -1;
            }
        }
    }

    /**
     * Is called when the wrongIndicator-animation ended
     */
    wrongIndicatorEnded(){
        for (const fish of this.fishList) {
            fish.isCollisionActive = true;
            fish.changeSwimDirWhenOffscreen = true;
            fish.randomizeFish();
        }
    }
}