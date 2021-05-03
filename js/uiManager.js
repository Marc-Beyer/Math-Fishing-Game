class UIManager{
isMenuOpen = false;

    constructor(){
        this.menu = document.querySelector("#menu");
        this.restartBtn = document.querySelector("#restartBtn");
        this.resumeBtn = document.querySelector("#resumeBtn");
        this.wrongIndicator = document.querySelector("#wrongIndicator");

        this.wrongIndicator.addEventListener("animationend", this.wrongMSGAnimationendHandler);
        this.restartBtn.addEventListener("click", ()=>{
            SCENE_MANAGER.reloadScene();
            this.toggleMenu();
        });
        this.resumeBtn.addEventListener("click", this.toggleMenu);
    }

    showWrongMSG(){
        this.wrongIndicator.classList.add("showAnimation");
        GAME_MANAGER.isActive = false;
    }

    wrongMSGAnimationendHandler = (event)=>{
        this.wrongIndicator.classList.remove("showAnimation");
        if(!this.isMenuOpen) GAME_MANAGER.isActive = true;
    }

    toggleMenu = (event)=>{
        GAME_MANAGER.isActive = this.isMenuOpen;
        this.isMenuOpen = !this.isMenuOpen;
        if(this.isMenuOpen){
            this.menu.classList.add("show");
        }else{
            this.menu.classList.remove("show");
        }
    }
}