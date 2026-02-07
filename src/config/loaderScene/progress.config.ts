import { gameData } from "@/data";
import { GraphicObjectConfig } from "@/types/graphicObject";
import { CENTER_Y } from "../constants";

export const progressBoxConfig: GraphicObjectConfig = {
    x: gameData.width / 4,
    y: CENTER_Y - 25,
    width: gameData.width / 2,
    height: 50,
    backgroundColor: 0x222222,
    backgroundAlpha: 0.8,
};

export const progressBarConfig: GraphicObjectConfig = {
    x: gameData.width / 4 + 10,
    y: CENTER_Y - 15,
    width: 0,
    height: 30,
    backgroundColor: 0xffffff,
    backgroundAlpha: 1,
};


export default {
    progressBoxConfig,
    progressBarConfig
}