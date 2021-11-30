// All Variables (Global)
var scores, roundScore, activePlayer, gamePlaying;

// Function To intialise the Game
init();

// *************************************************//
// *************************************************//

// Adding EventListener to the roll dice event
document.querySelector('.btn-roll').addEventListener('click', function () {
    // If the state variable of gameplaying is true. 
    if (gamePlaying) {
        // 1. Generate a Random number for  both dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //2. Display the result in the UI ( both dice image)
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        //3. Update the round score IF none of rolled number on any of the dice was 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score from both dice
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
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
        // Take the winning score from the input field
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Check if player won the game
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // If someone wins change its UI accordingly
            // change player name to winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // change the visibility of both the dice
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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
    // making  both the dice invisible
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
    // removing both the dice from dispplay
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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