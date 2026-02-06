import { gameData } from '@/data';
import BaseScene from './BaseScene';
import config from '@/config/mainSceneConfig';
import { Board } from '@/components/Board';
 
export default class MainScene extends BaseScene {
    private _board!: Board;
    private _background!: Phaser.GameObjects.Sprite;
    private _overlay!: Phaser.GameObjects.Rectangle;
    
    constructor() {
        super({ key: 'MainScene' });
    }

    create(): void {
        this._createBackground();
        this._createBoard();
        this.playEnterTransition();
    }

    private _createBackground(): void {
        this._background = this.add
            .sprite(config.backgroundConfig.x, config.backgroundConfig.y, config.backgroundConfig.key)
            .setDisplaySize(config.backgroundConfig.displayWidth, config.backgroundConfig.displayHeight);
        
        this._overlay = this.add.rectangle(
            config.overlayConfig.x, 
            config.overlayConfig.y, 
            config.overlayConfig.width, 
            config.overlayConfig.height, 
            config.overlayConfig.color, 
            config.overlayConfig.alpha
        );

    }

    private _createBoard(): void {
        this._board = new Board(this, config.boardConfig.x, config.boardConfig.y).setScale(config.boardConfig.scale);
    }
}