import { TextConfig } from "@/types/text.type";
import { CENTER_X, CENTER_Y } from "../constants";

const titleTextConfig: TextConfig = {
    text: 'Slot Machine',
    x: CENTER_X, 
    y: CENTER_Y - 100,
    origin: { x: 0.5, y: 0.5 },
    resolution: 2,
    style: {
        font: '48px Arial',
        color: '#ffffff'
    }
};

export { titleTextConfig };