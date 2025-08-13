let deck = []
let playerHand = []
let dealerHand = []
let hiddenCard = null
let gameActive = false
let roundOver = false

const dealerCardsEl = document.getElementById('dealer-cards')
const playerCardsEl = document.getElementById('player-cards')
const dealerScoreEl = document.getElementById('dealer-score')
const playerScoreEl = document.getElementById('player-score')
const statusEl = document.getElementById('status')
const newBtn = document.getElementById('new')
const hitBtn = document.getElementById('hit')
const standBtn = document.getElementById('stand')
const restartBtn = document.getElementById('restart')

function createDeck() {
  const suits = ['♠','♥','♦','♣']
  const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
  const deck = []
  for (const s of suits) {
    for (const r of ranks) {
      const value = r === 'A' ? 11 : r === 'J' || r === 'Q' || r === 'K' ? 10 : parseInt(r,10)
      deck.push({suit: s, rank: r, value})
    }
  }
  return deck
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function dealCard(hand) {
  if (!deck.length) deck = shuffle(createDeck())
  const card = deck.pop()
  hand.push(card)
  return card
}

function score(hand) {
  let total = hand.reduce((sum, c) => sum + c.value, 0)
  let aces = hand.filter(c => c.rank === 'A').length
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  return total
}

function renderCard(card, hidden=false) {
  const el = document.createElement('div')
  el.className = 'card' + ((card.suit === '♥' || card.suit === '♦') ? ' red' : '')
  if (hidden) {
    el.className = 'card back'
    return el
  }
  const top = document.createElement('div')
  top.className = 'top'
  top.textContent = card.rank + card.suit
  const suit = document.createElement('div')
  suit.className = 'suit'
  suit.textContent = card.suit
  const bottom = document.createElement('div')
  bottom.className = 'bottom'
  bottom.textContent = card.rank + card.suit
  el.appendChild(top)
  el.appendChild(suit)
  el.appendChild(bottom)
  return el
}

function renderHands(revealDealer=false) {
  dealerCardsEl.innerHTML = ''
  playerCardsEl.innerHTML = ''
  if (dealerHand.length) {
    dealerCardsEl.appendChild(renderCard(dealerHand[0]))
    if (revealDealer) {
      for (let i = 1; i < dealerHand.length; i++) dealerCardsEl.appendChild(renderCard(dealerHand[i]))
    } else {
      dealerCardsEl.appendChild(renderCard(hiddenCard, true))
      for (let i = 2; i < dealerHand.length; i++) dealerCardsEl.appendChild(renderCard(dealerHand[i]))
    }
  }
  for (const c of playerHand) playerCardsEl.appendChild(renderCard(c))
  dealerScoreEl.textContent = 'Score: ' + (revealDealer ? score(dealerHand) : score([dealerHand[0]]))
  playerScoreEl.textContent = 'Score: ' + score(playerHand)
}

function setStatus(text, cls) {
  statusEl.className = 'status ' + (cls || '')
  statusEl.textContent = text
}

function startRound() {
  deck = shuffle(createDeck())
  playerHand = []
  dealerHand = []
  hiddenCard = null
  roundOver = false
  gameActive = true
  dealCard(playerHand)
  dealCard(dealerHand)
  hiddenCard = dealCard(dealerHand)
  dealCard(playerHand)
  hitBtn.disabled = false
  standBtn.disabled = false
  renderHands(false)
  setStatus('Your move')
  const p = score(playerHand)
  const d = score(dealerHand)
  if (p === 21 || d === 21) endRound()
}

function dealerPlay() {
  while (score(dealerHand) < 17) dealCard(dealerHand)
}

function endRound() {
  dealerPlay()
  renderHands(true)
  const p = score(playerHand)
  const d = score(dealerHand)
  hitBtn.disabled = true
  standBtn.disabled = true
  roundOver = true
  if (p > 21 && d > 21) setStatus('Both bust — push', 'push')
  else if (p > 21) setStatus('You bust — dealer wins', 'lose')
  else if (d > 21) setStatus('Dealer busts — you win', 'win')
  else if (p > d) setStatus('You win', 'win')
  else if (p < d) setStatus('Dealer wins', 'lose')
  else setStatus('Push', 'push')
}

newBtn.addEventListener('click', () => {
  if (gameActive && !roundOver) return
  startRound()
})

hitBtn.addEventListener('click', () => {
  if (!gameActive || roundOver) return
  dealCard(playerHand)
  renderHands(false)
  if (score(playerHand) >= 21) endRound()
})

standBtn.addEventListener('click', () => {
  if (!gameActive || roundOver) return
  endRound()
})

restartBtn.addEventListener('click', () => {
  deck = []
  playerHand = []
  dealerHand = []
  hiddenCard = null
  gameActive = false
  roundOver = false
  dealerCardsEl.innerHTML = ''
  playerCardsEl.innerHTML = ''
  dealerScoreEl.textContent = 'Score: 0'
  playerScoreEl.textContent = 'Score: 0'
  hitBtn.disabled = true
  standBtn.disabled = true
  setStatus('Ready')
})

setStatus('Ready')
