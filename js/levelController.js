class LevelController extends GameObject{

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
    aupdate(deltaTime){
        this.refrashUI = !this.refrashUI;
        if(this.refrashUI) return;

        if(Fish.prototype.isSinking) this.curDepth += Fish.prototype.sinkSpeed * 0.4;
        this.mathFieldElement.innerText = Math.floor(this.curDepth);
    }
}