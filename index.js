// Game Constant & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('./video/food.mp3');
const gameOverSound = new Audio('./video/gameOver.mp3');
const moveSound = new Audio('./video/direction.mp3');
const musicSound = new Audio('./video/music.mp3');

let speed = 5;
let score = 0;
let lastpainTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

let food = {x: 7, y: 6};


// Game function
function main(ctime){
    window.requestAnimationFrame(main)
    console.log(ctime);

    if((ctime - lastpainTime)/1000 < 1/speed){
        return ;
    }

    lastpainTime = ctime;
    gameEngine();
    
}




function isCollide(snakeArr) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }

    // If you bump into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x < 0 || snakeArr[0].y >= 18 || snakeArr[0].y < 0) {
        return true;
    }

    return false;
}




function gameEngine(){
    // Part 1: Update Snake array and food

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again !!");
        snakeArr = {x: 13, y: 15};
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the food and regenerate the food
    if((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y)){
        foodSound.play();
        score += 1;
        score.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the Snake and food
    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}









// Main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}   // game start
    moveSound.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

         case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})