import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('board-default', '../assets/images/board-default.png');
        this.load.image('board-active', '../assets/images/board-active.png');
        this.load.image('symbol1', '../assets/images/symbol1.png');
    }

    create() {
        this.scene.start('MainScene');
    }
}