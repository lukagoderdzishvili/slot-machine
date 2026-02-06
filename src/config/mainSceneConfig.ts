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
    scale: 0.9
} as {
    x: number;
    y: number;
    scale: number;
}

export default { backgroundConfig, overlayConfig, boardConfig };