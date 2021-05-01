class Line extends GameObject{
    constructor(width, pHook, name = "Line"){
        super(0, 0, width, 2, name);

        this.hook = pHook;
        this.anchorPointX = 0;

        this.positionX = (this.hook.width - this.width) / 2;
        this.positionY = -this.height/2;
    }

    createDOMElement(){
        this.innetLine = document.createElement("div");
        this.configDOMElements();
        this.append(this.innetLine);

    }

    update(deltaTime){
        let hookAnchorX = (this.hook.positionX + (this.hook.width - this.width) / 2);
        let xDistanceBetweenAnchorAndHook = hookAnchorX - this.hook.anchorPointX;

        // Set the line to the hook position and rotate to the right angle
        this.style.transform = "rotate(" + -Math.atan( xDistanceBetweenAnchorAndHook / this.hook.positionY ) * 180/Math.PI + "deg)";
    }

    
    resize(){
        super.resize();
        this.configDOMElements();

        this.positionX = (this.hook.width - this.width) / 2;
        this.positionY = -this.height/2;
    }

    configDOMElements(){
        this.height = Math.sqrt( Math.pow(Environment.width, 2) + Math.pow(Environment.height, 2)) * 2;
        this.innetLine.style.background = "#000";
        this.innetLine.style.height = (this.height * Environment.scale.y / 2 + 1) + "px";
    }
}