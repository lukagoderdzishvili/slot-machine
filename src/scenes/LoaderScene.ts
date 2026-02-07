import * as config from '@/config/loaderScene';
import { gameData } from '@/data';
import Phaser from 'phaser';
import BaseScene from './BaseScene';
import { CENTER_X } from '@/config/constants';

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

        this.load.atlas("images", "./assets/images/images.png", "./assets/images/images.json");

        this.load.audio('backgroundMusic', "./assets/audio/backgroundMusic.mp3");
        this.load.audio("winSound", "./assets/audio/win.mp3");
        


        this.load.on('progress', (value: number) => {
            this._progressBar.clear();
            this._progressBar.fillStyle(config.progressBarConfig.backgroundColor, config.progressBarConfig.backgroundAlpha);
            this._progressBar.fillRect(config.progressBarConfig.x, config.progressBarConfig.y, (CENTER_X - 20) * value, config.progressBarConfig.height);

            this._percentText.setText(`${Math.floor(value * 100)}%`);
        });

        this._container.add([this._progressBox, this._progressBar, this._LoadingText, this._percentText]);
    }

    create(): void {
        this.fadeToScene('MainScene', 750, () => this._container.destroy(true));
    }
}
