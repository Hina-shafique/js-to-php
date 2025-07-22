// Objects as Parameters
const Game = (function () {
  return {
    playGame( options = {}) {

      if(typeof options.minRange === 'undefined'){
        options.minRange = 1;
      }

      if(typeof options.maxRange === 'undefined'){
        options.maxRange = 10;
      }

      if(typeof options.maxAttempts === 'undefine'){
        options.maxAttempts = 3;
      }

      const minRange = options.minRange;
      const maxRange = options.maxRange;
      const maxAttempts = options.maxAttempts;
      
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

