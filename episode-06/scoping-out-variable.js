// scope and variable

const playGame = (function () {
  const secretNumber = Math.floor(Math.random() * 10) + 1;
  const maxAttempts = 3;

  return function () {
    var guessed = false;
    let attempt = 1
    for (attempt; attempt <= maxAttempts; attempt++) {
      var input = prompt("Please enter a number between 1 and 10");
      var guess = Number(input);

      if (isNaN(guess) || guess < 1 || guess > 10) {
        console.log("Invalid input. Please enter a number between 1 and 10.");
        continue;
      }

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
      `Game over! The number was ${secretNumber} and you ${guessedMessage} with ${attempt} attempts.`
    );
  };
})();
