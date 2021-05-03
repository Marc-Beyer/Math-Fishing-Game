class UIManager{
isMenuOpen = false;

    constructor(){
        this.menu = document.querySelector("#menu");
        this.wrongIndicator = document.querySelector("#wrongIndicator");
    }

    showWrongMSG(){
        this.wrongIndicator.addEventListener("animationend", this.wrongMSGAnimationendHandler);
        this.wrongIndicator.classList.add("showAnimation");
        GAME_MANAGER.isActive = false;
    }

    wrongMSGAnimationendHandler = (event)=>{
        console.log(this);
        this.wrongIndicator.classList.remove("showAnimation");
        if(!this.isMenuOpen)GAME_MANAGER.isActive = true;
    }

    toggleMenu(){
        GAME_MANAGER.isActive = this.isMenuOpen;
        this.isMenuOpen = !this.isMenuOpen;
        if(this.isMenuOpen){
            this.menu.classList.add("show");
        }else{
            this.menu.classList.remove("show");
        }
    }
}