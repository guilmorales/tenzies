/***********************************************************
 * File: tenzies.js                                        *
 * Date: January 28, 2024                                  *
 ***********************************************************/

// Function: random
// Description: Generates random numbers between 1 and 6
function random(){
  return Math.floor( Math.random()*6 ) + 1
}

// Function: createDice
// Description: Returns an array of dice, each die has
// the properties state(false) and number(1 to 6) for
// the first time
function createDice() {
  let dice = []
  for(let i=0; i<10; i++) {
    const die = {
      state: false,
      number: random()
    }
  
    dice.push(die)
  }
  return dice
}

// Function: draw
// Description: Renders each die to show the number
// if the state is true, it will add the lock styles
// otherwise it will remove the lock styles
function draw() {
  const diceEl = document.getElementsByClassName("die")
  Array.from(diceEl).forEach(die => {
    die.innerText = dice[die.id].number
    if(dice[die.id].state)
      die.classList.add("lock")
    else
      die.classList.remove("lock")
  })
}

// Function: roll
// Description: Generates a new random number for each
// die which has a false state
function roll(){
  for(let i=0; i<10; i++) {
    if(!dice[i].state)
      dice[i].number = random()
  }
  // Render dice with new data and state
  draw()
}

// Function: eventListener
// Description: This will be executed every time the
// player click on any die
document.addEventListener('click', function(e){
  if((e.target.className === "die" || e.target.className === "die lock") && !endGame) {
    // Change the state of the die from true to false or vice versa
    dice[e.target.id].state = !dice[e.target.id].state

    if(dice[e.target.id].state){
      // If the die is lock, increased totalLocks by 1 and
      // updated the score adding the current number of locked die
      totalLocks++
      score += dice[e.target.id].number
    }
    else {
      // If the die is unlock, decreased totalLocks by 1 and
      // updated the score substracting the current number of locked die
      totalLocks--
      score -= dice[e.target.id].number
    }

    // Render dice with new data and state
    draw()
    
    // Check if the player has won the game
    checkStatus()
  }
})

function checkStatus(){
  if(totalLocks === 10 && score % 10 === 0) {
    endGame = true
    document.getElementById("rollBtn").disabled = true
    document.getElementById("message").style.display = "flex"
    document.getElementById("message").style.animation = "message_background 1s ease-in-out 1 normal forwards"
  }
}

// Variables totalLocks, score, and endGame to 
// determine the end of the game
let totalLocks = 0
let score = 0
let endGame = false

// Creating an array containing 10 dice
let dice = createDice()

// Render the number of each die for the first time
draw()