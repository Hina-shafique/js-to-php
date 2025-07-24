// Objects as Parameters
const Game = (function () {
  return {
    playGame( {minRange = 1, maxRange = 10, maxAttempts = 3} = {}) { // destructure in function parameter

      // playGame( options = {}) { 
      // const{minRange = 1, maxRange = 10, maxAttempts = 3} = options; // destructure inside function

      // const minRange = options.minRange ?? 1;
      // const maxRange = options.maxRange ?? 10;
      // const maxAttempts = options.maxAttempts ?? 3;
      
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
})();

