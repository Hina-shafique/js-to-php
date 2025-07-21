// Objects

var person = new Object(); // Create an empty object and instantiate it

// using object literal notation

var person = {}; 

// Create an object with properties

var person = {
  firstName: 'john',
  lastName: 'doe',
  fullName() {
    retrun `${this.firstName} ${this.lastName}`;
  }
};

const Game = (function () {
  let secretNumber = Math.floor(Math.random() * 10) + 1;
  const maxAttempts = 3;
  const history = [];

  return {
    playGame(){
      var guessed = false;
       while (history.length < maxAttempts) {
      var input = prompt("Please enter a number between 1 and 10");
      var guess = Number(input);

      if (isNaN(guess) || guess < 1 || guess > 10) {
        console.log("Invalid input. Please enter a number between 1 and 10.");
        continue;
      }

      if (history.indexOf(guess) > -1) {
        continue; // Skip if the guess is already in history
      }

      history.push(guess); // Add the guess to history

      if (guess === secretNumber) {
        console.log("Congrats, you guessed the number!");
        guessed = true;
        break; // Stop the loop if guessed correctly
      } else if (guess < secretNumber) {
        console.log(`${guess} is too low. Try again.`);
      } else {
        console.log(`${guess} is too high. Try again.`);
      }
    }

    var guessedMessage = guessed
      ? "guessed correctly"
      : "did not guess correctly";
    console.log(
      `Game over! The number was ${secretNumber} and you ${guessedMessage} with ${history.length} attempts.`
    );
    console.log(`your guesses were: ${history.join(", ")}`);
    },
    resetGame(){
      secretNumber = Math.floor(Math.random() * 10) + 1;
    history.length = 0; // Clear the history
    console.log("Game has been reset. You can play again!");
    }
  };
})();

Game.playGame(); // Start the game
