import Phaser from 'phaser';
import config from '@/config/preloadSceneConfig';

export default class PreloadScene extends Phaser.Scene {
    private _titleText!: Phaser.GameObjects.Text;
    private _startButton!: Phaser.GameObjects.Text;

    constructor() {
        super('PreloadScene');
    }

    create() {
        this._titleText = this.add
            .text(config.titleTextConfig.x, config.titleTextConfig.y, config.titleTextConfig.text, config.titleTextConfig.style)
            .setResolution(config.titleTextConfig.resolution)
            .setOrigin(config.titleTextConfig.origin.x, config.titleTextConfig.origin.y);

        this._startButton = this.add
            .text(config.startButtonConfig.x, config.startButtonConfig.y, config.startButtonConfig.text, config.startButtonConfig.style)
            .setResolution(config.startButtonConfig.resolution)
            .setOrigin(config.startButtonConfig.origin.x, config.startButtonConfig.origin.y)
            .setPadding(config.startButtonConfig.padding ?? 0)
            .setBackgroundColor(config.startButtonConfig.backgroundColor ?? 'transparent')
            .setInteractive({ useHandCursor: true });
        

        this._startButton.on('pointerdown', this._startGame, this);
    }

    private _startGame() {
        this._titleText.destroy();
        this._startButton.destroy();
        this.scene.start('LoaderScene');
    }
}
