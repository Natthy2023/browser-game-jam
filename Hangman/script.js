const words = ["javascript", "canvas", "hangman", "developer", "theme", "toggle"];
  let selectedWord = "";
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrong = 6;

  const wordEl = document.getElementById("word");
  const lettersEl = document.getElementById("letters");
  const messageEl = document.getElementById("message");
  const canvas = document.getElementById("hangmanCanvas");
  const ctx = canvas.getContext("2d");

  function drawHangman(step) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-color");

    switch(step) {
      case 1:
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(150, 190);
        ctx.stroke();
        break;
      case 2:
        ctx.beginPath();
        ctx.moveTo(40, 190);
        ctx.lineTo(40, 20);
        ctx.lineTo(120, 20);
        ctx.lineTo(120, 40);
        ctx.stroke();
        break;
      case 3:
        ctx.beginPath();
        ctx.arc(120, 55, 15, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 4:
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(120, 120);
        ctx.stroke();
        break;
      case 5:
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(100, 100);
        ctx.moveTo(120, 80);
        ctx.lineTo(140, 100);
        ctx.stroke();
        break;
      case 6:
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 150);
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 150);
        ctx.stroke();
        break;
    }
  }

  function displayWord() {
    wordEl.textContent = selectedWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
  }

  function generateLetterButtons() {
    lettersEl.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i).toLowerCase();
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.addEventListener("click", () => handleGuess(letter, btn));
      lettersEl.appendChild(btn);
    }
  }

  function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
      guessedLetters.push(letter);
      displayWord();
      checkWin();
    } else {
      wrongGuesses++;
      drawHangman(wrongGuesses);
      checkLoss();
    }
  }

  function checkWin() {
    if (selectedWord.split("").every(l => guessedLetters.includes(l))) {
      messageEl.textContent = "🎉 You Win!";
      disableAllButtons();
    }
  }

  function checkLoss() {
    if (wrongGuesses === maxWrong) {
      messageEl.textContent = `💀 You Lose! Word was: ${selectedWord}`;
      disableAllButtons();
    }
  }

  function disableAllButtons() {
    document.querySelectorAll(".letters button").forEach(btn => btn.disabled = true);
  }

  function initGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    displayWord();
    generateLetterButtons();
    messageEl.textContent = "";
  }

  document.getElementById("restart").addEventListener("click", initGame);

  // Theme toggle
  document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "" : "dark";
    // Redraw hangman in new theme color
    const oldWrong = wrongGuesses;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i <= oldWrong; i++) {
      drawHangman(i);
    }
  });

  initGame();
