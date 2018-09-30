/*
 * Create a list that holds all of your cards
 */
const myCards = document.querySelectorAll('.card');
const myDeck = document.querySelector('.deck');
let toggledCards = [];

// add event listener and toggle class on and off
  myDeck.addEventListener('click', e => {
    const clickTarget = e.target;
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        isValidClick(clickTarget);

        if (toggledCards.length === 2) {
            checkIfMatch();
           
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
    console.log(card);
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
         }, 1100); 
      }
}
// });


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
