import { gameData } from "@/data";
import { RectangleConfig } from "@/types/rectangle";
import { SpriteConfig } from "@/types/sprite";

const backgroundConfig: SpriteConfig = {
    x: gameData.width / 2,
    y: gameData.height / 2,
    key: "background",
    frame: 'background',
    displayWidth: gameData.width,
    displayHeight: gameData.height
}

const overlayConfig: RectangleConfig = {
    x: gameData.width / 2,
    y: gameData.height / 2,
    width: gameData.width,
    height: gameData.height,
    color: 0x000000,
    alpha: 0.75
}

const boardConfig = {
    x: gameData.width / 2 - 5,
    y: gameData.height / 2 - 100,
    scale: 1,
    background: {
        x: 0,
        y: 0,
        key: 'board-default'
    }
} as {
    x: number;
    y: number;
    scale: number;
    background: SpriteConfig;
}

const reelConfig =  {
    width: 100,
    height: 154,
    offsetX: 46,
    x: -195,
    y: -50,
    shapeMask: {
        width: 100,
        height: 154,
        y: gameData.height / 2 - 156
    },
    symbols: ['symbol1', 'symbol2', 'symbol3'],
    minSpinLoopsCount: 3 
} as {
    width: number;
    height: number;
    offsetX: number;
    x: number;
    y: number;
    shapeMask: {
        width: number;
        height: number;
        y: number;
    },
    symbols: string[],
    minSpinLoopsCount: number
}

const symbolConfig = {
    width: 77,
    height: 95
}


export default { backgroundConfig, overlayConfig, boardConfig, reelConfig, symbolConfig };