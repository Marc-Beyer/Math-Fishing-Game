/**
 * Handle the UI
 */
class UIManager{

    // Track if the menu is open
    isMenuOpen = false;

    /**
     * Get UI-elements and add eventListener
     */
    constructor(){
        this.intro = document.querySelector("#intro");
        this.introBtn = document.querySelector("#intro button");
        this.menu = document.querySelector("#menu");
        this.openMenuBtn = document.querySelector("#open-menu");
        this.fullscreenBtn = document.querySelector("#fullscreenBtn");
        this.restartBtn = document.querySelector("#restartBtn");
        this.resumeBtn = document.querySelector("#resumeBtn");
        this.wrongIndicator = document.querySelector("#wrongIndicator");

        this.introBtn.addEventListener("click", ()=>{
            this.introBtn.classList.add("hidden");
            SCENE_MANAGER.loadScene(SceneEnum.tutorial);
        });

        this.wrongIndicator.addEventListener("animationend", this.wrongMSGAnimationendHandler);

        // Add eventListener to the menu-buttons 
        this.fullscreenBtn.addEventListener("click", ()=>{
            this.toggleFullScreen();
        });
        this.restartBtn.addEventListener("click", ()=>{
            SCENE_MANAGER.reloadScene();
            this.toggleMenu();
        });
        this.resumeBtn.addEventListener("click", this.toggleMenu);
        this.openMenuBtn.addEventListener("click", this.toggleMenu);
    }

    /**
     * Show the wrongIndicator-element
     */
    showWrongMSG(){
        this.wrongIndicator.classList.add("showAnimation");
    }

    /**
     * Hide the wrongIndicator-element when the animation ended
     * @param {Object} event 
     */
    wrongMSGAnimationendHandler = (event)=>{
        this.wrongIndicator.classList.remove("showAnimation");
    }

    /**
     * Show/Hide menu
     * @param {Object} event 
     */
    toggleMenu = (event)=>{
        GAME_MANAGER.isActive = this.isMenuOpen;
        this.isMenuOpen = !this.isMenuOpen;
        if(this.isMenuOpen){
            this.menu.classList.add("show");
        }else{
            this.menu.classList.remove("show");
        }
    }

    /**
     * Toggle the ScoreBoard
     * @param {boolean} value 
     */
    toggleScoreBoard(value){
        if(value){
            document.querySelector("#score-board").classList.remove("hidden");
        }else{
            document.querySelector("#score-board").classList.add("hidden");
        }

        document.querySelector("#open-menu").hidden = value;
        document.querySelector("#depthMeter").hidden = value;
    }

    /**
     * Toggle the Tutorial
     * @param {boolean} value 
     */
    toggleTutorial(value){
        if(value){
            document.querySelector("#tutorial").classList.remove("hidden");
            this.intro.classList.remove("hidden");
        }else{
            document.querySelector("#tutorial").classList.add("hidden");
            this.intro.classList.add("hidden");
        }

        document.querySelector("#open-menu").hidden = value;
        document.querySelector("#depthMeter").hidden = value;
    }

    /**
     * Turns fullscreen on and off
     * src: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    async toggleFullScreen() {
        if (!document.fullscreenElement) {
            // waiting for fullscreen
            document.documentElement.requestFullscreen().then(()=>{
                // Firefox doesn't trigger the resize-event correctly on changing to fullscreen
                setFrameSize();
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        //setFrameSize();
      }
}