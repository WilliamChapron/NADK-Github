// gameManager.js
let gameData = {
    score: 0,
    discoveredCountries: [],
    gameMode: 'inGame',
};

const incrementScore = (points) => {
    gameData.score += points;
};

const addDiscoverCountry = (country) => {
    if (!gameData.discoveredCountries.includes(country)) {
        gameData.discoveredCountries.push(country);    }
};

const setGameMode = (mode) => {
    gameData.gameMode = mode;
};

const gameUpdate = async () => {
    const SDK3DVerse = window.SDK3DVerse
    const player = await SDK3DVerse.engineAPI.findEntitiesByNames("Player")
    console.log(await player[0].getGlobalTransform().position)
    // camera = await player[1].getChildren()

    // const playerPos = await player[0].getGlobalTransform().position;
    // console.log(playerPos)
    

};

const resetGame = () => {
    gameData = {
        score: 0,
        discoveredCountries: [],
        gameMode: 'inGame',
    };
};
  
export { gameData, incrementScore, addDiscoverCountry, setGameMode, resetGame, gameUpdate};
  