const btn = document.getElementById('btn');
const message = document.getElementById('message');
const error = document.getElementById('error');
const input = document.getElementById('guessInput');

const minNum = 1;
const maxNum = 10;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempts = 0;
const maxAttempts = 3;

btn.addEventListener('click', () => {
  let guess = input.value.trim();
  guess = Number(guess);

  error.classList.remove('show');
  message.classList.remove('show');

  if (isNaN(guess) || guess < minNum || guess > maxNum) {
    error.textContent = 'Please enter a valid number between 1 and 10';
    error.classList.add('show');
    return;
  }

  attempts++;

  if (guess < answer) {
    message.textContent = `TOO LOW! Attempt ${attempts} of ${maxAttempts}`;
    message.classList.add('show');
  } else if (guess > answer) {
    message.textContent = `TOO HIGH! Attempt ${attempts} of ${maxAttempts}`;
    message.classList.add('show');
  } else {
    message.textContent = `🎉 CORRECT! The answer was ${answer}. You guessed it in ${attempts} attempt(s).`;
    message.classList.add('show');
    endGame();
    return;
  }

  if (attempts >= maxAttempts) {
    message.textContent = `💥 GAME OVER! The correct answer was ${answer}.`;
    message.classList.add('show');
    endGame();
  }
});

function endGame() {
  btn.disabled = true;
  input.disabled = true;
}
