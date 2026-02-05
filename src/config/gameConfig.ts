import Phaser from 'phaser';
import PreloadScene from '@/scenes/PreloadScene';
import MainScene from '@/scenes/MainScene';
import { gameData } from '@/data';

const config: Phaser.Types.Core.GameConfig = {
    width: gameData.width,
    height: gameData.height,
    backgroundColor: gameData.backgroundColor,
    
    type: Phaser.WEBGL,
    parent: 'game',
    scene: [PreloadScene, MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

export default config;