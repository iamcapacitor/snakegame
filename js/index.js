// Game constants & variables
console.log('Namaste');
let inputDir = {x:0,y:0};
const startsound = new Audio("./tunes/startsound.mp3");
const continuesong = new Audio("./tunes/continuesong.mp3");
const bonoussong = new Audio("./tunes/bonous.mp3");
const gameoversong = new Audio("./tunes/gameover.mp3");
continuesong.loop = true;
continuesong.play();
let board = document.getElementById('gamebox');
let scorebox = document.getElementById('scorebox');
let highscorebox = document.getElementById('highscore');
let gamew = 18;
// let speed = 10;
const a = 2;
const b = 15;
let score =0;
let lastPaintTime = 0;
//  x rightside , y down
let snakearray = [
    {x:5,y:5}
];
let foodposition = {x:10,y:15};


// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime - lastPaintTime)/1000) < (1/speed)){
        return ;
    }
    lastPaintTime = ctime;
    GameEngine();
}

function iscollide(snakearray){
    // if snake bump on itself
    for(let i = 1 ; i < snakearray.length ; i++){
        if(snakearray[0].x === snakearray[i].x && snakearray[0].y === snakearray[i].y){
            return true;
        }
    };
    if ((snakearray[0].x >= gamew || snakearray[0].x <= 0) || (snakearray[0].y >= gamew || snakearray[0].y <= 0)){
        console.log('snake on the wall');
        return true;
    }
}
function GameEngine(){
    // part 1 - updating snake array and food 
        if (iscollide(snakearray)){
            continuesong.pause();
            gameoversong.play();
            inputDir = {x:0,y:0};
            setTimeout(() => {
                alert('game is over ! press any key to start game again!');
                continuesong.play();
                snakearray = [{x:1,y:5}];
            }, 100);
            scorebox.innerText = 'Score : ' + 0;
        }
    // if snake has eaten the food then increment score and regenerate the food
        if((snakearray[0].x === foodposition.x ) && (snakearray[0].y === foodposition.y)){
            score +=1;
            scorebox.innerText = 'Score : ' + score;
            if(score >  highscore){
                localStorage.setItem('highscore', score);
                highscorebox.innerHTML = 'high Score : ' + score;
            }
            bonoussong.play();
            snakearray.unshift({x:snakearray[0].x + inputDir.x, y: snakearray[0].y + inputDir.y});
            foodposition = {x: a + parseInt((b-a)*Math.random()), y:a + parseInt((b-a)*Math.random())}
        };
        for(let i = snakearray.length - 2; i>=0 ;i--){
            snakearray[i+1] = {...snakearray[i]};
        };
        snakearray[0].x += inputDir.x;
        snakearray[0].y += inputDir.y;

    // part 2 - render the snake and food
    board.innerHTML = '';
    // display the snake
    snakearray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = foodposition.y;
        foodElement.style.gridColumnStart = foodposition.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}

// do display highscore
let highscore = localStorage.getItem('highscore');
if(highscore === null){
    highscoreval= 0;
    localStorage.setItem('highscore', highscoreval);
}else{
    highscorebox.innerHTML = 'high Score : ' + highscore;
}

// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e)=>{
    inputDir = {x:0,y:0};   // start the game
    // startsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log(e.key , " ArrowUp");
            inputDir.x =  0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log(e.key , " ArrowDown");
            inputDir.x =  0;
            inputDir.y =  1;
            break;
        case "ArrowLeft":
            console.log(e.key , " ArrowLeft");
            inputDir.x = - 1;
            inputDir.y =  0;
            break;
        case "ArrowRight":
            console.log(e.key , " ArrowRight");
            inputDir.x =  1;
            inputDir.y =  0;
            break;
            
    
        default:
            break;
    }
})