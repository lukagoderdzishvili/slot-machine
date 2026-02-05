import Phaser from 'phaser';
import { gameData } from '@/data';
 
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        const testBoard: Phaser.GameObjects.Sprite = this.add.sprite(gameData.width / 2, gameData.height / 3, 'board-default')
        .setSize(631, 365)
        .setDisplaySize(631, 365)
        .setScale(0.9);
    }
}