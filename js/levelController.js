class LevelController extends GameObject{

    maxDepth = -10;

    constructor(hook, name = "LevelController"){
        super(0,0,0,0,name);

        this.hook = hook;

        this.mathFieldElement = document.querySelector("#mathField");
        this.depthMeterElement = document.querySelector("#depthMeter");

        const[x, y, answer] = Math.getQuestion();
        this.mathFieldElement.innerText = (x + "+" + y + "= ?");

        LevelController.prototype.answer = answer;

        this.curDepth = 0;
        this.refrashUI = true;
    }

    // TODO 
    update(deltaTime){
        this.refrashUI = !this.refrashUI;
        if(this.refrashUI) return;
        
        let backgroundColor = Math.LerpRGBColor({r: 0, g: 149, b: 255}, {r: 6, g: 35, b: 142}, this.curDepth / this.maxDepth);
        gameFrame.style.background = "rgb(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + ")";
        
        if(Fish.prototype.isSinking || Fish.prototype.isSRising) this.curDepth += Fish.prototype.sinkSpeed * 0.4;
        this.depthMeterElement.innerText = Math.floor(this.curDepth);

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
                    location.reload();
                }
            }
        }
    }
}