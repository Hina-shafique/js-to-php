// class

class Game{
  #minRange; // Private
  #maxRange;
  #maxAttempts;
  constructor({minRange = 1, maxRange = 10, maxAttempts = 3} = {})
  {
    this.#minRange = minRange;
    this.#maxRange = maxRange;
    this.#maxAttempts = maxAttempts;
  }
  playGame() { 
      
      const secretNumber = Math.floor(Math.random( (this.#maxRange - this.#minRange + 1)) + this.#minRange);
      const history = [];

      var guessed = false;
      while (history.length < this.#maxAttempts) {
        var input = prompt("Please enter a number between 1 and 10");
        var guess = Number(input);

        if (isNaN(guess) || guess < this.#minRange || guess > this.#maxRange) {
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
    }
};




// factory
const createGame = function ({minRange = 1, maxRange = 10, maxAttempts = 3} = {}) {
  return {
    playGame() { 
      
      const secretNumber = Math.floor(Math.random( (maxRange - minRange + 1)) + minRange);
      const history = [];

      var guessed = false;
      while (history.length < maxAttempts) {
        var input = prompt("Please enter a number between 1 and 10");
        var guess = Number(input);

        if (isNaN(guess) || guess < minRange || guess > maxRange) {
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
  };
};

// let easyGame = createGame({maxRange: 10});
// let hardGame = createGame({maxRange: 100, maxAttempts: 10});
// let realyHardGame = createGame({maxRange: 100, maxAttempts: 5});

let easyGame = new Game({maxRange: 10});
let hardGame = new Game({maxRange: 100, maxAttempts: 10});
let realyHardGame = new Game({maxRange: 100, maxAttempts: 5});

alert(easyGame.playGame === hardGame.playGame);