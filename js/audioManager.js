class AudioManager{
    
    audioClips = ["./assets/sound/licensed/13_ColorDiving.mp3"];

    constructor(){
        this.play(0);
    }

    play(nr){
        try{
            let audio = new Audio(this.audioClips[nr]);
            document.body.append(audio);
            console.log(audio);
            audio.addEventListener("canplaythrough", event => {
                console.log(event);
                audio.play();
              });
        }catch(e){
            console.log(e);
        }
    }
}