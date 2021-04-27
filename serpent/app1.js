const canvas = document.querySelector('#canvas')
const scoreSpan = document.querySelector('.score')
const button = document.querySelector('.replay')
let score = 0

const context = canvas.getContext('2d')

const bgImg = new Image()
bgImg.src = 'background.png'


const foodImg = new Image()
foodImg.src = 'food.png'

const eatAudio = new Audio()
eatAudio.src = 'serpent/eat.mp3'

const deadAudio = new Audio()
deadAudio.src = 'serpent/dead.mp3' 

const unit = 30 
let food = {
    x:Math.floor(Math.random() *19 +1)*unit,
    y:Math.floor(Math.random() *19 +1)*unit
}

const snake = []
snake[0] = {
    x: 10*unit,
    y: 9*unit
}

let direction = null 

document.addEventListener('keydown', (e) =>{
    if(e.keyCode == 37 && direction!='R'){
        direction = 'L'
    }
    else if(e.keyCode == 38 && direction!='D'){
        direction = 'U'
    }
    else if(e.keyCode == 39 && direction!='L'){
        direction = 'R'
    }
    else if(e.keyCode == 40 && direction!='U'){
        direction = 'D'
    }
})

const collisionBody = (head,snake) =>{
    for (let index = 0; index <= snake.length; index++){
    if(head.x == snake[index].x && head.y == snake[index].x)
    return false
    }
    return true
}

function draw(){
    context.drawImage(bgImg,0,0)
    context.drawImage(foodImg,food.x,food.y)

     for (let index = 0; index < snake.length; index++)  {
         if(index === 0){
             context.fillStyle = 'white'
         }
         else{
             context.fillStyle = 'red'
         }
        
         context.fillRect(snake[index].x,snake[index].y,unit,unit)
         context.strokeRect(snake[index].x,snake[index].y,unit,unit)
         context.strokeStyle ='green'
     } 

     let snakeX = snake[0].x
     let snakeY = snake[0].y

     if(direction == 'L') snakeX -= unit
     if(direction == 'U') snakeY -= unit
     if(direction == 'R') snakeX += unit
     if(direction == 'D') snakeY += unit

     if (snakeX == food.x && snakeY == food.y){
         score++ 
         food = {
            x:Math.floor(Math.random() *19 +1)*unit,
            y:Math.floor(Math.random() *19 +1)*unit
      }
      eatAudio.play()
    }
    else{
         snake.pop()
    }

     let newHead ={
         x:snakeX,
         y:snakeY
     }

     snake.unshift(newHead)

     if(snakeX <= -unit || snakeX >= canvas.width || snakeY <= -unit || snakeY >= canvas.width || collisionBody(newhead,snake) == true){
        deadAudio.play()
        clearInterval(play)
        button.style.display = 'block' 
     }
     scoreSpan.textContent = score
     
}
const clickButton = () =>{
    Window.location.reload()
}
let play = setInterval(draw,100)

