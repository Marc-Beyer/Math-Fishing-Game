Math.clamp = function(value, min, max){
    if(min > value) return min;
    if(max < value) return max;
    return value;
}

Math.Lerp = function(start, end, time){
    return start + (end - start) * time;
}

Math.LerpRGBColor = function(start, end, time){
    start.r = start.r + (end.r - start.r) * time;
    start.g = start.g + (end.g - start.g) * time;
    start.b = start.b + (end.b - start.b) * time;
    return start;
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