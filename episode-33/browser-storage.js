const gameStateKey = "game-state";

export async function clearingGameState() {
  localStorage.removeItem(gameStateKey);
}

export async function getGameState() {
  return JSON.parse(localStorage.getItem(gameStateKey));
}

export async function saveGameState(stateobj) {
  localStorage.setItem(gameStateKey, JSON.stringify(stateobj));
}
