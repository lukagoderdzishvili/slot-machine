import config from '@/config/loaderSceneConfig';
import { gameData } from '@/data';
import Phaser from 'phaser';
import BaseScene from './BaseScene';

export default class LoaderScene extends BaseScene {
    private _container!: Phaser.GameObjects.Container;
    private _progressBar!: Phaser.GameObjects.Graphics;
    private _progressBox!: Phaser.GameObjects.Graphics;
    private _LoadingText!: Phaser.GameObjects.Text;
    private _percentText!: Phaser.GameObjects.Text;

    constructor() {
        super('LoaderScene');
    }

    preload(): void {
        this._container = this.add.container(0, 0);

        this._progressBox = this.make.graphics({...config.progressBoxConfig});
        this._progressBar = this.make.graphics();

        this._LoadingText = this.make.text({...config.loadingTextConfig});
        this._percentText = this.make.text({...config.percentTextConfig});

        this.load.image('board-default', '/assets/images/board-default.png');
        this.load.image('board-active', '/assets/images/board-active.png');
        this.load.image('symbol1', '/assets/images/symbol1.png');


        this.load.on('progress', (value: number) => {
            this._progressBar.clear();
            this._progressBar.fillStyle(config.progressBarConfig.backgroundColor, config.progressBarConfig.backgroundAlpha);
            this._progressBar.fillRect(config.progressBarConfig.x, config.progressBarConfig.y, (gameData.width / 2 - 20) * value, config.progressBarConfig.height);

            this._percentText.setText(`${Math.floor(value * 100)}%`);
        });

        this._container.add([this._progressBox, this._progressBar, this._LoadingText, this._percentText]);
    }

    create(): void {
        this.fadeToScene('MainScene', 750, () => this._container.destroy(true));
    }
}
