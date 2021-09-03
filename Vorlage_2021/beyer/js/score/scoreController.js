/**
 * FishingController-gameObject
 * Controls the game-logic in the fishing scene
 */
class ScoreController extends GameObject{

    // The highscore
    highscore = [];
    score = null;
    restartGame = false;

    /**
     * Create a SceneManager
     */
    constructor(parameter){
        super(0, 0, 0, 0, "ScoreController");

        GAME_FRAME.style = "";

        INPUT.removeKeyListener();
        UI_MANAGER.toggleScoreBoard(true);

        this.scoreBoardInput = document.querySelector("#score-board-input");
        this.scoreBoardTable = document.querySelector("#score-board-table");
        this.scoreBoardButton = document.querySelector("#score-board-button");
        this.scoreBoardButton.addEventListener("click", ()=>{
            if(this.restartGame){
                INPUT.addKeyListener();
                UI_MANAGER.toggleScoreBoard(false);
                SCENE_MANAGER.loadScene(SceneEnum.fishing);
                this.scoreBoardInput.hidden = false;
                this.scoreBoardButton.textContent = "Deinen Score Eintragen";
                this.restartGame = false;
                return;
            }

            if(this.scoreBoardInput.value){
                this.addNewScore(this.score, this.scoreBoardInput.value);
                this.showAllScoreEntrys();

                this.scoreBoardInput.hidden = true;
                this.scoreBoardButton.textContent = "Nochmal Versuchen";
                this.restartGame = true;
            }
        });

        this.scoreBoardInput.value = "";
        this.scoreBoardInput.focus();
        this.scoreBoardInput.addEventListener("keyup", (e)=>{
            if(e.key === "Enter" && this.scoreBoardInput.value){
                this.scoreBoardButton.click();
                this.scoreBoardButton.focus();
            }
        });

        if(parameter?.score !== undefined && parameter?.score !== null){
            this.score = parameter.score;
        }

        if(this.score === 0){
            this.scoreBoardInput.hidden = true;
            this.scoreBoardButton.textContent = "Nochmal Versuchen";
            this.restartGame = true;
        }

        if(this.score !== null){
            document.querySelector("#score-board h1").textContent = `Du hast ${this.score} Fische gefangen!`;
        }else{
            document.querySelector("#score-board h1").textContent = "HIGHSCORE";
        }

        this.highscore = this.getScoreFromStorage();

        this.showAllScoreEntrys();
        
    }

    /**
     * Show the highscore
     */
    showAllScoreEntrys(){
        this.removeAllScoreEntrys();
        if(this.highscore){
            let nr = 1;
            for (const scoreEntry of this.highscore) {
                this.createScoreEntry(nr++, scoreEntry);
                if(nr > 10)break;
            }
        }
    }

    /**
     * Create a scoreEntry and add it to the Dom
     * @param {number} nr 
     * @param {Object} param0 
     */
    createScoreEntry(nr, {n, s}){

        let row = document.createElement("tr");

        let nameField = document.createElement("td");
        nameField.textContent = `${nr}. ${n}`;

        let scoreField = document.createElement("trd");
        scoreField.textContent = `${s}`;

        row.append(nameField);
        row.append(scoreField);

        this.scoreBoardTable.append(row);
    }

    /**
     * 
     */
    removeAllScoreEntrys(){
        this.scoreBoardTable.innerHTML = "";
    }

    /**
     * Get the highscores from the localStorage
     * @returns {[Object]} the highscores as ObjectArray
     */
    getScoreFromStorage(){
        let highscoreArr = JSON.parse(localStorage.getItem("highscore"));
        if(highscoreArr){
            highscoreArr = highscoreArr.sort((elem1, elem2)=>{
                return elem1.s < elem2.s;
            });
            return highscoreArr;
        }
        return [];
    }

    /**
     * Add a new score to the localStorage
     * @param {number} score 
     * @param {string} name 
     */
    addNewScore(score, name){
        this.highscore.push({
            s:score,
            n:name
        });

        this.highscore = this.highscore.sort((elem1, elem2)=>{
            return elem1.s < elem2.s;
        });
        
        if(this.highscore.length > 50){
            this.highscore = this.highscore.slice(0, 50);
        }

        localStorage.setItem("highscore", JSON.stringify(this.highscore));
    }
}