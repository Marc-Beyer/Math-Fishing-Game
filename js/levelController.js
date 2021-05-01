class LevelController extends GameObject{

    maxDepth = -10;

    constructor(name = "LevelController"){
        super(0,0,0,0,name);

        this.mathFieldElement = document.querySelector("#mathField");
        this.depthMeterElement = document.querySelector("#depthMeter");

        const[x, y, answer] = Math.getQuestion();
        this.mathFieldElement.innerText = (x + "+" + y + "=" + answer);

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
    }
}