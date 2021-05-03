# Math-Fishing-Game
A simple HTML/JavaScript educational game.

>The game-logic starts in js/main.js start there if you want to understand the project

The core components are:
 - GameManager
 - UIManager
 - SceneManager
 - Input
___
## GameManager
Has a list of GameObject and calls an 'update'-function every frame.

The gameloop is only active if 'isActive: bool' is _true_.
___
## UIManager
Handles UI-interaction.

For example the 'toggleMenu'-function
___
## SceneManager
//TODO
___
## Input
handles the input and calls the UIManager's 'toggleMenu'-function when escape is presed.

This class provides some 'static' fields, that are fill by the user-inpus:

 - Input.prototype.left :           bool
 - Input.prototype.right :          bool
 - Input.prototype.up :             bool
 - Input.prototype.down :           bool
 - Input.prototype.space :          bool
 - Input.prototype.mousePosition :  {
                                        x: number, 
                                        y: number
                                    }
 - Input.prototype.mouseScroll :   number;
    - gets resetted after invoking or by user-input

### example code:
```javascript
function loop(){
    if(Input.prototype.space){
        // do stuff
    }

    let position = Input.prototype.mousePosition;
    // ...
}
```