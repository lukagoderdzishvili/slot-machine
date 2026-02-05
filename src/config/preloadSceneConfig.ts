import { gameData } from "@/data";
import { TextButtonConfig, TextConfig } from "@/types/text";

const titleTextConfig: TextConfig = {
    text: 'Slot Machine',
    x: gameData.width / 2, 
    y: gameData.height / 2 - 100,
    origin: { x: 0.5, y: 0.5 },
    resolution: 2,
    style: {
        font: '48px Arial',
        color: '#ffffff'
    }
} ;

const startButtonConfig: TextButtonConfig = {
    text: 'START',
    x: gameData.width / 2, 
    y: gameData.height / 2 + 100,
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


export default { titleTextConfig, startButtonConfig };