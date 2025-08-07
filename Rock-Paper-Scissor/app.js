const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('.clear-btn');
const resultMessage = resultDisplay.parentElement;
let userChoice;
let computerChoice;
let result;

const images = {
  'rock': 'images/rock.jpeg',
  'paper' : 'images/paper.png',
  'scissor' : 'images/scissor.jpeg'
};
  
resultMessage.style.visibility = 'hidden';
clearBtn.addEventListener('click',clearResult);
possibleChoices.forEach((possibleChoices) =>
  possibleChoices.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.setAttribute('src',images[userChoice]);
    generateComputerChoice();
    getResult();
  })
);
function clearResult(){
 userChoiceDisplay.setAttribute('src','images/default.jpeg');
 computerChoiceDisplay.setAttribute('src','images/default.jpeg');
 resultMessage.style.visibility = 'hidden';
}
function generateComputerChoice(){
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
  
  if(randomNumber === 1){
    computerChoice = 'rock';
  }
   if(randomNumber === 2){
    computerChoice = 'scissor';
  }
   if(randomNumber === 3){
    computerChoice = 'paper';
  }
  computerChoiceDisplay.setAttribute('src',images[computerChoice]);
}
function getResult(){
  if(computerChoice === userChoice){
    result = 'Its a draw!';
  }
  else if(computerChoice === 'rock' && userChoice === 'paper'){
    result = 'You win!';
  }
  else if(computerChoice === 'rock' && userChoice === 'scissors'){
    result = 'You lose!';
  }
  else if(computerChoice === 'paper' && userChoice === 'scissors'){
    result = 'You win!';
  }
  else if(computerChoice === 'paper' && userChoice === 'rock'){
    result = 'You lose!';
  }
  else if(computerChoice === 'scissors' && userChoice === 'rock'){
    result = 'You win!';
  }
  else if(computerChoice === 'scissors' && userChoice === 'paper'){
    result = 'You lose!';
  }
  resultDisplay.innerHTML = result;
  resultMessage.style.visibility = 'visible';
}