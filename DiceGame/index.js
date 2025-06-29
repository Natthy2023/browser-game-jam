function diceGame() {
  const spinOne = document.querySelectorAll('.row-1 .dot');
  const spinTwo = document.querySelectorAll('.row-2 .dot');
  const h1Text = document.querySelector('h1 .title-text');
  const win1 = document.querySelector('.win-1');
  const win2 = document.querySelector('.win-2');

  // Reset title and hide flags initially
  h1Text.textContent = "Rolling...";
  win1.classList.add('hidden');
  win2.classList.add('hidden');

  const numbers = [1, 2, 3, 4, 5, 6];
  const firstRandomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const secondRandomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  // Show dice patterns
  displayDice(spinOne, firstRandomNumber);
  displayDice(spinTwo, secondRandomNumber);

  // Show winner after a small delay
  setTimeout(() => {
    if (firstRandomNumber > secondRandomNumber) {
      win1.classList.remove('hidden');
      h1Text.textContent = "Player 1 Wins!";
    } else if (firstRandomNumber < secondRandomNumber) {
      win2.classList.remove('hidden');
      h1Text.textContent = "Player 2 Wins!";
    } else {
      h1Text.textContent = "It's a Draw!";
    }
  }, 300);
}

function displayDice(dots, number) {
  const dotMap = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  // Show all dots first
  dots.forEach(dot => dot.classList.remove('invisible'));

  // Hide dots not in pattern
  dots.forEach((dot, index) => {
    if (!dotMap[number].includes(index)) {
      dot.classList.add('invisible');
    }
  });
}

window.onload = () => {
  const h1Text = document.querySelector('h1 .title-text');
  h1Text.textContent = "Refresh Me";
  document.querySelector('.win-1').classList.add('hidden');
  document.querySelector('.win-2').classList.add('hidden');

  // Make all dots visible initially
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('invisible'));
};
