import { gameData } from "@/data";
import { GraphicObjectConfig } from "@/types/graphicObject";
import { TextConfig } from "@/types/text";

const progressBoxConfig: GraphicObjectConfig = {
    x: gameData.width / 4,
    y: gameData.height / 2 - 25,
    width: gameData.width / 2,
    height: 50,
    backgroundColor: 0x222222,
    backgroundAlpha: 0.8,
}

const progressBarConfig: GraphicObjectConfig = {
    x: gameData.width / 4 + 10,
    y: gameData.height / 2 - 15,
    width: 0,
    height: 30,
    backgroundColor: 0xffffff,
    backgroundAlpha: 1,
}

const loadingTextConfig: TextConfig = {
    x: gameData.width / 2,
    y: gameData.height / 2 - 50,
    text: 'Loading...',
    origin: { x: 0.5, y: 0.5 },
    resolution: 1,
    style: {
        font: '20px Arial',
        color: '#ffffff'
    }
}

const percentTextConfig: TextConfig = {
    x: gameData.width / 2,
    y: gameData.height / 2,
    text: '0%',
    origin: { x: 0.5, y: 0.5 },
    resolution: 1,
    style: {
        font: '18px Arial',
        color: '#2afa00'
    }
}
    

export default {
    progressBoxConfig,
    progressBarConfig,
    loadingTextConfig,
    percentTextConfig
}