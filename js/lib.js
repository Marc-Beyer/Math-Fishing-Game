Math.clamp = function(value, min, max){
    if(min > value) return min;
    if(max < value) return max;
    return value;
}

Math.randomInt = function(max){
    return Math.floor(Math.random() * (max + 1));
}

Math.randomIntRange = function(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

Math.getQuestion = function(){
    let answer = Math.floor(Math.random() * 90) + 10;
    let x = Math.floor(Math.random() * (answer - 2) + 2);
    let y = answer - x;
    return [x, y, answer];
}

Math.LerpColor = function(color1, color2, time){
    return color1;
}

Math.distance = function(a, b){
    return Math.abs(a - b);
}