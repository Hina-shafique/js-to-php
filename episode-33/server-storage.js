const jysonContextType = "application/jyson";

async function getJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Response wasn't ok.");
  }

  return await response.json();
}

export async function clearGameState() {}

export async function getGameState() {
  return await getJson(`get.php`);
}

export async function saveGameState(stateObj) {}
