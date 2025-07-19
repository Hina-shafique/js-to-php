// Arrays

//Constructor Array
let arr = new Array(); // Empty array
// Square brackets
let arr2 = [1, 2, 'as', [3, 'a']]; //mixed

// of Arrays
let arr3 = Array.of(1, 2, 3, 4); // Creates an array with the given elements

// from Arrays
let chars = Array.from("Hina"); // ["H", "i", "n", "a"]

//Add history in our game

const playGame = (function () {
  const secretNumber = Math.floor(Math.random() * 10) + 1;
  const maxAttempts = 3;
  const history = [];

  return function () {
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
    console.log(`your guesses were: ${history.join(", ")}`); // Display the history of guesses
  };
})();

playGame(); // Start the game
