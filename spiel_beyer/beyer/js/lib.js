/**
 * Clamp a value between min and max
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} a clamped value between min and max
 */
Math.clamp = function(value, min, max){
    if(min > value) return min;
    if(max < value) return max;
    return value;
}

/**
 * Lerp between two numbers
 * @param {number} start 
 * @param {number} end 
 * @param {number} time pos between them
 * @returns {number} the number at time
 */
Math.lerp = function(start, end, time){
    return start + (end - start) * time;
}

/**
 * Lerp between two RGBColor
 * @param {Object} start a RGBColor
 * @param {Object} end a RGBColor
 * @param {number} time pos between them
 * @returns {Object} the RGBColor at time
 */
Math.lerpRGBColor = function(start, end, time){
    start.r = start.r + (end.r - start.r) * time;
    start.g = start.g + (end.g - start.g) * time;
    start.b = start.b + (end.b - start.b) * time;
    return start;
}

/**
 * Get a random int-number between 0 and max
 * @param {number} max 
 * @returns {number} a random int-number between 0 and max
 */
Math.randomInt = function(max){
    return Math.floor(Math.random() * (max + 1));
}

/**
 * Get a random int-number between min and max
 * @param {number} min 
 * @param {number} max 
 * @returns {number} a random int-number between min and max
 */
Math.randomIntRange = function(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

/**
 * Get a random number between min and max
 * @param {number} min 
 * @param {number} max 
 * @returns {number} a random number between min and max
 */
 Math.randomRange = function(min, max){
    return Math.random() * (max - min) + min;
}

/**
 * Get a MathQuestion as Array
 * @returns {[number, number, number]} a MathQuestion as Array
 */
Math.getQuestion = function(){
    let answer = Math.floor(Math.random() * 90) + 10;
    let x = Math.floor(Math.random() * (answer - 2) + 2);
    let y = answer - x;
    return [x, y, answer];
}

/**
 * Calculate the distance between a and b
 * @param {number} a 
 * @param {number} b 
 * @returns {number} distance between a and b
 */
Math.distance = function(a, b){
    return Math.abs(a - b);
}