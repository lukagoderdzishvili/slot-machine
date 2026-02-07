import { gameData } from "@/data";
import { SpriteConfig } from "@/types/sprite";
import { CENTER_X, CENTER_Y } from "../constants";

interface BoardConfig {
    x: number;
    y: number;
    scale: number;
    background: SpriteConfig;
}

const boardConfig: BoardConfig = {
    x: CENTER_X - 5,
    y: CENTER_Y - 100,
    scale: 1,
    background: {
        x: 0,
        y: 0,
        key: 'board-default',
        frame: 'board-default',
        displayWidth: 731,
        displayHeight: 400
    }
};

export { boardConfig };