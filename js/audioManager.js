class Audio{
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    play = function(){
        this.sound.play();
    }

    stop = function(){
        this.sound.pause();
    }
}

class AudioManager{
    
    audioClips = ["./assets/sound/licensed/13_ColorDiving.mp3"];
    backgroundAudio = new Audio(this.audioClips[0]);

    counter = 0;

    constructor(){
        GAME_FRAME.addEventListener("mouseover", (e)=>{
            this.backgroundAudio.play();
        });
        //window.requestAnimationFrame(this.startBackgroundMusic);
    }

    startBackgroundMusic = (time)=>{
        if(this.counter > 120){
            this.backgroundAudio.play();
        }else{
            window.requestAnimationFrame(this.startBackgroundMusic);
            this.counter++;
        }
    }
}