import { gameData } from "@/data"
import { RectangleConfig } from "@/types/rectangle"
import { SpriteConfig } from "@/types/sprite"
import { CENTER_X, CENTER_Y } from "../constants"

const backgroundConfig: SpriteConfig = {
    x: CENTER_X,
    y: CENTER_Y,
    key: "background",
    frame: 'background',
    displayWidth: gameData.width,
    displayHeight: gameData.height
}

const overlayConfig: RectangleConfig = {
    x: CENTER_X,
    y: CENTER_Y,
    width: gameData.width,
    height: gameData.height,
    color: 0x000000,
    alpha: 0.75
}


export {
    backgroundConfig,
    overlayConfig
}