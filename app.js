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
// const minutes = Math.floor(time  / 60);
// const seconds = time % 60; 

function shuffleDeck() {
  const shuffleCards = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(shuffleCards);
  for (card of shuffledCards) {
    myDeck.appendChild(card);
  }
}
shuffleDeck();

// add event listener and toggle class on and off
  myDeck.addEventListener('click', e => {
    const clickTarget = e.target;
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
       if (isValidClick(clickTarget)) {
          if (clockOff) {
           startClock();
            clockOff = false;
          }
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
      ){
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
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
function hideStar(){
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
function startClock() {
  time = 0;
  let clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
    }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time  / 60);
  const seconds = time % 60;

  if (seconds < 10) {
     clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
      clock.innerHTML = `${minutes}:${seconds}`;
  }
   console.log(clock);
   clock.innerHTML = time;
}
// displayTime();

function stopClock() {
  clearInterval(clockId);
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
