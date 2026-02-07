import BaseScene from './BaseScene';
import Phaser from 'phaser';
import  * as config from '@/config/preloadScene';

export default class PreloadScene extends BaseScene {
    private _container!: Phaser.GameObjects.Container;
    private _titleText!: Phaser.GameObjects.Text;
    private _startButton!: Phaser.GameObjects.Text;

    constructor() {
        super('PreloadScene');
    }

    create(): void {
        this.playEnterTransition();

        this._container = this.add.container(0, 0);

        this._titleText = this.make.text({...config.titleTextConfig});

        const { padding, backgroundColor, ...startButtonConfig } = config.startButtonConfig;
        this._startButton = this.make
            .text({...startButtonConfig})
            .setPadding(padding ?? 0, padding ?? 0)
            .setBackgroundColor(backgroundColor ?? 'transparent')
            .setInteractive({ useHandCursor: true });

        this._container.add([this._titleText, this._startButton]);


        this._startButton.once('pointerdown', this._startGame, this);
    }

    private _startGame(): void {  
        this.fadeToScene('LoaderScene', 500, () => this._container.destroy(true));
    }
}
