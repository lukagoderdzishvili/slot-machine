import { CENTER_X, CENTER_Y } from "../constants";
import { BoardConfig } from "@/types/boardConfig.type";

const boardConfig: BoardConfig = {
    x: CENTER_X - 5,
    y: CENTER_Y - 100,
    scale: 1,
    reelsCount: 3,
    background: {
        x: 0,
        y: 0,
        key: 'images',
        frame: 'board-default.png',
        displayWidth: 731,
        displayHeight: 400
    }
};

export { boardConfig };