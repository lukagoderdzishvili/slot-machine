import Phaser from 'phaser';
import PreloadScene from '@/scenes/PreloadScene';
import MainScene from '@/scenes/MainScene';
import { gameData } from '@/data';
import LoaderScene from '@/scenes/LoaderScene';
import { SpinePlugin } from '@esotericsoftware/spine-phaser';

const config: Phaser.Types.Core.GameConfig = {
    width: gameData.width,
    height: gameData.height,
    backgroundColor: gameData.backgroundColor,
    
    type: Phaser.WEBGL,
    parent: 'game',
    scene: [PreloadScene, LoaderScene, MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
    scene: [
            {
                key: "spine",
                plugin: SpinePlugin,
                mapping: "spine"
            }
        ]
    }

};

export default config;