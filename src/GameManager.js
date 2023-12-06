
import { WritePositionToFile } from './CinematicWriter';


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

    const player = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()
    const cameraEntity = player[0].getCamera()

    console.log(cameraEntity)

    // SDK3DVerse.engineAPI.cameraAPI.travel(viewports[0],[-1.71,0.92,-1.71], [0,1,0,0], 100);

    const transform = await SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()

    const position = await transform[0].getTransform().position

    // WritePositionToFile(position);



    

};

const resetGame = () => {
    gameData = {
        score: 0,
        discoveredCountries: [],
        gameMode: 'inGame',
    };
};
  
export { gameData, incrementScore, addDiscoverCountry, setGameMode, resetGame, gameUpdate};
  