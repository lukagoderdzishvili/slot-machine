import config from '@/config/loaderSceneConfig';
import { gameData } from '@/data';
import Phaser from 'phaser';

export default class LoaderScene extends Phaser.Scene {
    private _progressBar!: Phaser.GameObjects.Graphics;
    private _progressBox!: Phaser.GameObjects.Graphics;
    private _LoadingText!: Phaser.GameObjects.Text;
    private _percentText!: Phaser.GameObjects.Text;

    constructor() {
        super('LoaderScene');
    }

    preload(): void {
        this._progressBox = this.add.graphics()
            .fillStyle(config.progressBoxConfig.backgroundColor, config.progressBoxConfig.backgroundAlpha)
            .fillRect(config.progressBoxConfig.x, config.progressBoxConfig.y, config.progressBoxConfig.width, config.progressBoxConfig.height);
        this._progressBar = this.add.graphics();


        
        this._LoadingText = this.add
            .text(config.loadingTextConfig.x, config.loadingTextConfig.y, config.loadingTextConfig.text, config.loadingTextConfig.style)
            .setOrigin(config.loadingTextConfig.origin.x, config.loadingTextConfig.origin.y)
            .setResolution(config.loadingTextConfig.resolution);

        this._percentText = this.add.text(config.percentTextConfig.x, config.percentTextConfig.y, config.percentTextConfig.text, config.percentTextConfig.style)
            .setOrigin(config.percentTextConfig.origin.x, config.percentTextConfig.origin.y);

        this.load.image('board-default', '/assets/images/board-default.png');
        this.load.image('board-active', '/assets/images/board-active.png');
        this.load.image('symbol1', '/assets/images/symbol1.png');


        this.load.on('progress', (value: number) => {
            this._progressBar.clear();
            this._progressBar.fillStyle(config.progressBarConfig.backgroundColor, config.progressBarConfig.backgroundAlpha);
            this._progressBar.fillRect(config.progressBarConfig.x, config.progressBarConfig.y, (gameData.width / 2 - 20) * value, config.progressBarConfig.height);

            this._percentText.setText(`${Math.floor(value * 100)}%`);
        });

        this.load.on('complete', () => {
            this._progressBar.destroy();
            this._progressBox.destroy();
            this._LoadingText.destroy();
            this._percentText.destroy();
        });
    }

    create(): void {
        this.scene.start('MainScene');
    }
}
