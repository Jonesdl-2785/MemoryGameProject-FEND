/*
 * Create a list that holds all of your cards
 */
const myCards = document.querySelectorAll('.card');
const myDeck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockId;
let clockOff = true;
let time = 0;
let restart;
let matched = 0;
const TOTAL_PAIRS = 8;
// const timer = document.querySelector('.clock').innerHTML = time;
// const minutes = Math.floor(time  / 60);
// const seconds = time % 60;
window.onload = startGame();

function startGame() {
  shuffleDeck();
}

function shuffleDeck() {
  const shuffleCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(shuffleCards);
  for (card of shuffledCards) {
    myDeck.appendChild(card);
  }
}
// shuffleDeck();

// add event listener and toggle class on and off
myDeck.addEventListener('click', e => {
  const clickTarget = e.target;

  if (isValidClick(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
  };

  if (isValidClick(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
  };

  if (toggledCards.length === 2) {
    checkIfMatch(clickTarget);
    newMove();
    playerScore();
  }
})

function isValidClick(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  )
}

function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
  // card.classList.toggle('disable');
}

// Push clicked card into toggled cards array
function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
}

// card match
function checkIfMatch() {
  if (
    toggledCards[0].firstElementChild.className ===
    toggledCards[1].firstElementChild.className
  ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 1000);
  }
}

// Moves
function newMove() {
  moves++
  const moveInfo = document.querySelector('.moves');
  moveInfo.innerHTML = moves;
}

// Stars
function playerScore() {
  if (moves === 8 || moves === 16 || moves === 24) {
    hideStar();
  }
}

// To hide stars based on moves
function hideStar() {
  const starLi = document.querySelectorAll('.stars li');
  for (star of starLi) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }

  }
}
// hideStar();
// hideStar();

// Clock/Timer

function startClock() {
  time = 0;
  let clockId = setInterval(() => {
      time++;
     displayTime();
  }, 1000);
}
// startClock();

function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}
// displayTime();
// clockOff = true;
// let newClock;
// clockId;

function stopClock() {
  clearInterval(clockId);
}
stopClock();


// Modal
function toggleModal() {
  const modal = document.querySelector('.modal_bg');
  modal.classList.toggle('hide');
}
 // toggleModal(); // to open modal
 // toggleModal(); // to close modal


// Modal writeModalStats
// time = 121;
// displayTime();
// moves = 16;
// playerScore();

// toggleModal();

function writeModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
  let stars = document.querySelectorAll('.stars li');
  let starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
        starCount++;
    }
  }
  return starCount;
}
writeModalStats();
toggleModal();

document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', () => {
  replayGame();
});

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
}

document.querySelector('.restart').addEventListener('click', resetGame);

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function allMatched() {
   if (matched === TOTAL_PAIRS) {
       gameOver();
   }
};

function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}

function replayGame() {
    resetGame();
    toggleModal();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
      for (let card of cards) {
          card.className = 'card';
      }
    }

    function gameOver() {
      stopClock();
      writeModalStats();
      toggleModal();
    }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
   var currentIndex = array.length,
     temporaryValue, randomIndex;

   while (currentIndex !== 0) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 }


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
