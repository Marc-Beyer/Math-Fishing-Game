class FishingController extends GameObject{

    maxDepth = -20;
    hearts = 3;
    fishList = [];
    bubbleList = [];

    constructor(hook, name = "FishingController"){
        super(0,0,0,0,name);

        this.hook = hook;
        hook.FishingController = this;

        this.mathFieldElement = document.querySelector("#mathField");
        this.heartContainer = document.querySelector("#heart-container");
        this.depthMeterElement = document.querySelector("#depthMeter");
        this.depthMeterPointerElement = document.querySelector("#depthMeter-pointer");

        this.heartContainer.style.width = this.hearts * 50 + "px";

        const[x, y, answer] = Math.getQuestion();
        this.mathFieldElement.innerText = (x + "+" + y + "= ?");

        FishingController.prototype.answer = answer;

        this.curDepth = 0;
        this.refreshUI = true;

        // Set static values
        Fish.prototype.sinkSpeed = -0.03;
        Fish.prototype.isSinking = true;
        Fish.prototype.isSRising = false;
        Fish.prototype.curNrTillCorrectAnswer = 5;
        Fish.prototype.nrTillCorrectAnswer = 7;

        
        UI_MANAGER.wrongIndicator.addEventListener("animationend", ()=>{
            this.wrongIndicatorEnded();
        });
    }

    // TODO 
    // Update the UI
    update(deltaTime){

        this.refreshUI = !this.refreshUI;
        if(this.refreshUI) return;
        
        let backgroundColor = Math.lerpRGBColor({r: 0, g: 149, b: 255}, {r: 6, g: 35, b: 142}, this.curDepth / this.maxDepth);
        GAME_FRAME.style.background = "rgb(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + ")";
        
        if(Fish.prototype.isSinking || Fish.prototype.isSRising) 
            this.curDepth += Fish.prototype.sinkSpeed * 0.4;

        //this.depthMeterElement.textContent = Math.floor(this.curDepth);
        this.depthMeterPointerElement.style.top = (this.curDepth / this.maxDepth) * 68 + 9 + "%";

        if(Fish.prototype.isSinking &&  Math.floor(this.curDepth) === this.maxDepth){
            Fish.prototype.sinkSpeed = 0;
            Fish.prototype.isSinking = false;
        }

        if(Fish.prototype.isSRising && this.curDepth >= 0){
            if(Fish.prototype.sinkSpeed > 0){
                Fish.prototype.sinkSpeed = 0;
                this.hook.lastYPosition = this.hook.positionY;
                this.hook.nextYPosition = this.hook.height -2;
                this.hook.curYPositionAnimationState = 0;
                this.hook.isYPositionControlledByScript = true;
            }else{
                if(this.hook.curYPositionAnimationState > 1){
                    Fish.prototype.isSRising = false;
                    Fish.prototype.isSinking = false;
                    Fish.prototype.sinkSpeed = 0;
                    SCENE_MANAGER.loadScene(SceneEnum.fishing);
                }
            }
        }
    }

    wrongAnswerGiven(){
        this.hearts--;
        this.heartContainer.style.width = this.hearts * 50 + "px";
        if(this.hearts <= 0){
            // Game over
            SCENE_MANAGER.reloadScene();
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

    wrongIndicatorEnded(){
        for (const fish of this.fishList) {
            fish.isCollisionActive = true;
            fish.changeSwimDirWhenOffscreen = true;
            fish.randomizeFish();
        }
    }
}