// All Variables (Global)
var scores, roundScore, activePlayer, gamePlaying, lastDice;

// Function To intialise the Game
init();

// *************************************************//
// *************************************************//

// Adding EventListener to the roll dice event
document.querySelector('.btn-roll').addEventListener('click', function () {
    // If the state variable of gameplaying is true.   
    if (gamePlaying) {
        // 1. Generate a Random number for dice
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display the result in the UI ( the dice image)
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'assests/images/dice-' + dice + '.png';
        //3. Update the round score IF the rolled number was NOT a 1 and it does not have two consective sixes
        if (dice === 6 && lastDice === 6) {
            //Player looses score its global score
            scores[activePlayer] = 0;
            // display the score in the UI
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // call for the next player
            nextPlayer();
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
        lastDice = dice
    }
});

// *************************************************//
// *************************************************//

// Add EventListener to the hold button event
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        var winningScore;
        // Take the winning score from the input field
        var input = document.querySelector('.final-score').value;
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        if (scores[activePlayer] >= winningScore) {
            // If someone wins change its UI accordingly
            // change player name to winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // change the visibility of dice
            document.querySelector('.dice').style.display = 'none';
            // Add the class winner to the player
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // remove the active class from the player
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // change the state of the state variable such that the game is ended (false)
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

// *************************************************//
// *************************************************//

// Function which will call the next palyer to play
function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //setting everything to zero
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // toggling the active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // making  dice invisible
    document.querySelector('.dice').style.display = 'none';
}

// calling the initialize function on hitting the new button
document.querySelector('.btn-new').addEventListener('click', init);

// *************************************************//
// *************************************************//

// function to initialize the game
function init() {
    // stting the score to zero
    scores = [0, 0];
    // making active player as zero
    activePlayer = 0;
    // setting the current score to zero
    roundScore = 0;
    // changing the state variable to true
    gamePlaying = true;
    // removing the dice from dispplay
    document.querySelector('.dice').style.display = 'none';
    // setting player score to zero in UI
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // setting the player name correctly
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // removing the winner  and active class from both 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // adding active class to the first player.
    document.querySelector('.player-0-panel').classList.add('active');
}

// *************************************************//
// *************************************************//

//  Code for the modal
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// *************************************************//
// *************************************************//

