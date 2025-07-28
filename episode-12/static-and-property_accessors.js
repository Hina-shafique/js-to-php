// static

class Game {
  #minRange; // Private
  #maxRange;
  #maxAttempts;

  constructor({ minRange = 1, maxRange = 10, maxAttempts = 3 } = {}) {
    this.#minRange = Game.initRangevalues({
      value: minRange,
      lowerBounds: 0,
    });

    this.#maxRange = Game.initRangevalues({
      value: maxRange,
      lowerBounds: minRange,
    });

    this.#maxAttempts = maxAttempts;
  }

  get minRange() {
    return this.#minRange;
  }

  set minRange(value) {
    this.#minRange = Game.initRangevalues({
      value,
      lowerBounds: 0,
      uperBounds: this.#maxRange,
    });
  }

  get maxRange() {
    return this.#maxRange;
  }

  set maxRange(value) {
    this.#maxRange = Game.initRangevalues({
      value,
      lowerBounds: this.#minRange,
    });
  }

  get maxAttempts() {
    return this.#maxAttempts;
  }

  set maxAttempts(value) {
    this.#maxAttempts = value;
  }

  static initRangevalues(value, lowerBounds, UperBounds = 0) {
    let num = Number(value);

    if (isNaN(num)) {
      throw {
        message: "Invalid input. Please enter a number.",
      };
    }

    if (num < lowerBounds) {
      throw {
        message: `Invalid input. Please enter a number greater than or equal to ${lowerBounds}.`,
      };
    }

    if (UperBounds && num > UperBounds) {
      throw {
        message: `Invalid input. Please enter a number less than or equal to ${UperBounds}.`,
      };
    }

    return num;
  }

  playGame() {
    const secretNumber = Math.floor(
      Math.random(this.#maxRange - this.#minRange + 1) + this.#minRange
    );
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
}

// factory
const createGame = function ({
  minRange = 1,
  maxRange = 10,
  maxAttempts = 3,
} = {}) {
  return {
    // get and set for factory

    get minRange() {
      return minRange;
    },

    set minRange(value) {
      minRange = Game.initRangevalues({
        value,
        lowerBounds: 0,
        uperBounds: maxRange,
      });
    },

    get maxRange() {
      return maxRange;
    },

    set maxRange(value) {
      maxRange = Game.initRangevalues({
        value,
        lowerBounds: minRange,
      });
    },

    get maxAttempts() {
      return maxAttempts;
    },

    set maxAttempts(value) {
      maxAttempts = value;
    },

    playGame() {
      const secretNumber = Math.floor(
        Math.random(maxRange - minRange + 1) + minRange
      );
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

let easyGame = new Game({ maxRange: 10 });
let hardGame = new Game({ maxRange: 100, maxAttempts: 10 });
let realyHardGame = new Game({ maxRange: 100, maxAttempts: 5 });

easyGame.playGame();
