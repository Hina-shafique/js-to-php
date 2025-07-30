// context => "this"

class Game {
  #minRange; // Private
  #maxRange;
  #maxAttempts;

  constructor({ minRange = 1, maxRange = 10, maxAttempts = 3 } = {}) {
    this.#minRange = Game.initRangevalues({
      value: minRange,
      lowerBounds: 0,
      uperBounds: maxRange,
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

  static initRangevalues({ value, lowerBounds, UperBounds = 0 }) {
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

  checkGuess(guess) {
    if (guess === this.secretNumber) {
      console.log("Congrats, you guessed the number!");
      return true;
    } else if (guess < this.secretNumber) {
      console.log(`${guess} is too low. Try again.`);
    } else {
      console.log(`${guess} is too high. Try again.`);
    }
    return false;
  }

  playGame() {
    this.secretNumber = Math.floor(
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

      if (this.checkGuess(guess)) {
        guessed = true;
        break; // Exit loop if guessed correctly
      }
    }

    var guessedMessage = guessed
      ? "guessed correctly"
      : "did not guess correctly";
    console.log(
      `Game over! The number was ${this.secretNumber} and you ${guessedMessage} with ${history.length} attempts.`
    );
    console.log(`your guesses were: ${history.join(", ")}`);
  }
}

let easyGame = new Game({ maxRange: 10 });

const GameTitleElement = document.getElementById("game-title");
GameTitleElement.replaceChildren(); // Clear any existing content
// GameTitleElement.innerHTML = "Easy Game";

const titleTextNode = document.createTextNode("Easy Game");
GameTitleElement.appendChild(titleTextNode);

// Create Elements

function containLiElements({content})
{
  const element = document.createElement("li");
  const textNode = document.createTextNode(content);

  element.appendChild(textNode);
  return element;
}

const rulesListElement = document.querySelector("ul.rules-list");
// rulesListElement.innerHTML = `<li> minRange: ${easyGame.minRange}</li>
//                               <li> maxRange: ${easyGame.maxRange}</li>
//                               <li> maxAttempts: ${easyGame.maxAttempts}</li>`;

const fragment = document.createDocumentFragment();

fragment.appendChild(
  containLiElements({ content: `minRange: ${easyGame.minRange}` })
);
fragment.appendChild(
  containLiElements({ content: `maxRange: ${easyGame.maxRange}` })
);
fragment.appendChild(
  containLiElements({ content: `maxAttempts: ${easyGame.maxAttempts}` })
);

rulesListElement.appendChild(fragment);

const headingElements = document.querySelectorAll("h2, h3");
