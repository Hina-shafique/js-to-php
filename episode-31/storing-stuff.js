import { ui, init } from "./ui.js";
init();

document.addEventListener("game:over", function (e) {
  const secretNumber = e.detail.secretNumber;
  ui.showFeedback(`Game over!, the secret number was ${secretNumber}`);
  ui.settings.disabled = false;
  ui.gameArea.disabled = true;
});

document.addEventListener("game:guess", function (e) {
  const { guess, result, attemptsLeft } = e.detail;
  ui.updateHistory(`${guess} is ${result}`);
  ui.showFeedback(`your remaining attempts: ${attemptsLeft}`);
  //serialized
  const json = JSON.stringify(e.detail);
  console.log(json);
  //deserialized
  const det = JSON.parse(json);
  console.log(det);
});

document.addEventListener("ui:submit-guess", function (e) {
  const { guess, game } = e.detail;
  if (isNaN(guess) || guess < game.minRange || guess > game.maxRange) {
    ui.showFeedback(`Please enter a valid number from 
        ${game.minRange} and ${game.maxRange}`);
    ui.resetGuess();
    return;
  }
  game.checkGuess(guess);

  ui.resetGuess();
});

document.addEventListener("ui:end-game", function () {
  ui.settings.disabled = false;
});
