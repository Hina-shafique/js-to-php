// Select Element

const ui = (function () {
  function getBy(cssSelector) {
    return document.querySelector(cssSelector);
  }

  const form = getBy("#settings-form");
  const optionsCustomElement = getBy("#options-custom");
  const optionsModeElement = getBy("#options-mode");
  const allowDuplicatesCheckbox = getBy("#allow-duplicates-checkbox");
  const inputGuessElement = getBy("#guess-input");
  const showFeedBackElement = getBy("#guess-feedback");
  const historyElement = getBy("#guess-history");

  return {
    get selectedGameType() {
      return form.elements.namedItem("game-type-selector").value;
    },

    get allowDuplicatesCheckbox() {
      return allowDuplicatesCheckbox.checked;
    },

    changeGameType(id) {
      if (optionsCustomElement.id === id) {
        optionsCustomElement.className = "inline";
        optionsModeElement.className = "hidden";
      } else {
        optionsCustomElement.className = "hidden";
        optionsModeElement.className = "inline";
      }
    },

    getGuess() {
      return parseInt(inputGuessElement.value);
    },

    reset(){
      this.resetHistory();
      this.resetGuess();
      this.showFeedBack('');
    },

    resetGuess() {
      inputGuessElement.value = '';
      inputGuessElement.focus();
    },

    showFeedBack(result) {
      showFeedBackElement.innerHTML = result;
    },

    showhistoryElement(result) {
      historyElement.innerHTML = result;
    },

    resetHistory(){
      historyElement.innerHTML = '';
    },
  };
})();

class Game {
  #minRange; // private
  #maxRange; // private
  #maxAttempts; // private
  #allowDuplicatesCheckbox;

  constructor({
    minRange = 1,
    maxRange = 10,
    maxAttempts = 3,
    allowDuplicatesCheckbox = false,
  } = {}) {
    this.#minRange = Game.initRangeValues({
      value: minRange,
      lowerBounds: 0,
      upperBounds: maxRange,
    });

    this.#maxRange = Game.initRangeValues({
      value: maxRange,
      lowerBounds: minRange,
    });

    this.#maxAttempts = maxAttempts;
    this.#allowDuplicatesCheckbox = allowDuplicatesCheckbox;
    this.history = [];
    this.secretNumber =
      Math.floor(Math.random() * (this.#maxRange - this.#minRange + 1)) +
      this.#minRange;
  }

  get minRange() {
    return this.#minRange;
  }

  set minRange(value) {
    this.#minRange = Game.initRangeValues({
      value,
      lowerBounds: 0,
      upperBounds: this.#maxRange,
    });
  }

  get maxRange() {
    return this.#maxRange;
  }

  set maxRange(value) {
    this.#maxRange = Game.initRangeValues({
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

  static initRangeValues({ value, lowerBounds, upperBounds = 0 } = {}) {
    let num = Number(value);

    if (isNaN(num)) {
      throw {
        message: "Value must be numeric",
      };
    }

    if (num < lowerBounds) {
      throw {
        message: `Value cannot be less than ${lowerBounds}`,
      };
    }

    if (upperBounds && num > upperBounds) {
      throw {
        message: `Value cannot be greater than ${upperBounds}`,
      };
    }

    return num;
  }

  checkGuess(guess) {
    if (!this.#allowDuplicatesCheckbox) {
      if (this.history.indexOf(guess) > -1) {
        return;
      }
    }

    this.history.push(guess);

    if (guess === this.secretNumber) {
      return "correct";
    } else if (guess < this.secretNumber) {
      return `too low `;
    } else {
      return `too high.`;
    }
  }

  play() {
    const history = [];
    while (history.length < this.#maxAttempts) {
      if (this.checkGuess(guess)) {
        var guessed = true;
        break;
      }
    }

    var guessedMessage = guessed ? "guessed" : "didn't guess";

    console.log(
      `Game over! The number is ${this.secretNumber}, and you ${guessedMessage} in ${history.length} attempts`
    );
    
  }
}

function getBy(cssSelector) {
  return document.querySelector(cssSelector);
}

document.addEventListener("input", function (e) {
  if (e.target.name !== "game-type-selector") {
    return;
  }

  ui.changeGameType(e.target.value);
});

document.addEventListener("keydown", function (e) {
  if (e.target.parentNode.id !== "options-custom") {
    return;
  }
  if (e.target.id.indexOf("title") > -1) {
    return;
  }

  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (allowedKeys.includes(e.key) || (e.key >= 0 && e.key <= 9)) {
    return;
  } else {
    e.preventDefault();
  }
});

let game;

document
  .getElementById("settings-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let titleElement = getBy("#input-title");
    let minRangeElement = getBy("#input-min-range");
    let maxRangeElement = getBy("#input-max-range");
    let maxAttemptsElement = getBy("#input-max-attempts");
    let gameLevelElement = getBy("#game-level");
    const gameAreaEleemnt = getBy("#game-area");

    const submitterName = e.submitter.name;
    const allowDuplicatesCheckbox = ui.allowDuplicatesCheckbox;

    if (submitterName === "play-game") {
      let title = titleElement.value;
      let minRange = minRangeElement.value;
      let maxRange = maxRangeElement.value;
      let maxAttempts = maxAttemptsElement.value;

      if (ui.selectedGameType === "options-custom") {
        if (!title || !minRange || !maxRange || !maxAttempts) {
          alert("Please enter all settings");
          return;
        }
      } else {
        let selectedOption = gameLevelElement.selectedOptions[0];

        minRange = selectedOption.getAttribute("data-min-range");
        maxRange = selectedOption.dataset.maxRange;
        maxAttempts = selectedOption.dataset.attempts;
      }
      ui.reset();

      game = new Game({
        minRange,
        maxRange,
        maxAttempts,
        allowDuplicatesCheckbox,
      });

      gameAreaEleemnt.classList.toggle("hidden");
    } else {
      titleElement.value = "";
      minRangeElement.value = "";
      maxRangeElement.value = "";
      maxAttemptsElement.value = "";

      gameAreaEleemnt.style.display = "";
      gameAreaEleemnt.classList.toggle("hidden");
      ui.reset();
    }
  });

document.addEventListener("click", function (e) {
  if (e.target.id === "submit-guess") {
    // get guess
    const guess = ui.getGuess();
    // velidate guess
    if (isNaN(guess) || guess < game.minRange || guess > game.maxRange) {
      ui.showFeedBack(
        `Please enter a valid number from ${game.minRange} and ${game.maxRange}`
      );
      ui.resetGuess();
      return;
    }
    // check guess
    const result = game.checkGuess(guess);
    // update ui/ provide feedback
    ui.showFeedBack(`${guess} is ${result}`);

    //show history
    ui.showhistoryElement(`Guessed numbers are: ${game.history.join(", ")}`);

    ui.resetGuess();
  }
});
