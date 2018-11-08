const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockboard;
const totalCards = 12;
flippedCards = 0;
let unsuccessfulTries = 0;

function flipcard() {
  console.log("here");
  if (lockboard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  return isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipcard);
  secondCard.removeEventListener("click", flipcard);
  flippedCards += 2;
  checkIfGameComplete();
}

function unflipCards() {
  lockboard = true;
  setTimeout(() => {
    unsuccessfulTries += 1;
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockboard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkIfGameComplete() {
  if (totalCards === flippedCards) {
    alert(
      `You won the Game!!! but with ${unsuccessfulTries} unsuccessful Tries`
    );
  }
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffle();

cards.forEach(card => card.addEventListener("click", flipcard));
