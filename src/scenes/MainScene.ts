import Phaser from 'phaser';
import { gameData } from '@/data';
import BaseScene from './BaseScene';
 
export default class MainScene extends BaseScene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.playEnterTransition();

        
        const testBoard: Phaser.GameObjects.Sprite = this.add.sprite(gameData.width / 2, gameData.height / 3, 'board-default')
        .setSize(631, 365)
        .setDisplaySize(631, 365)
        .setScale(0.9);
    }
}