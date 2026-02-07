import { gameData } from "@/data";
import { TextButtonConfig } from "@/types/text.type";
import { CENTER_X, CENTER_Y } from "../constants";

const startButtonConfig: TextButtonConfig = {
    text: 'START',
    x: CENTER_X, 
    y: CENTER_Y + 100,
    origin: { x: 0.5, y: 0.5 },
    resolution: 2,
    padding: 10,
    style: {
        font: '32px Arial',
        color: '#ffff00',
    },
    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#ff0000',
        blur: 55
    },
    backgroundColor: '#0051ff',
};

export { startButtonConfig };