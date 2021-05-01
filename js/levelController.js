class LevelController extends GameObject{

    constructor(name = "LevelController"){
        super(0,0,0,0,name);

        this.mathFieldElement = document.querySelector("#mathField");
        this.depthMeterElement = document.querySelector("#depthMeter");

        const[x, y, answer] = Math.getQuestion();
        this.mathFieldElement.innerText = (x + "+" + y + "=" + answer);

    }

    update(deltaTime){

    }
}