export default class AudioManager extends Phaser.Sound.BaseSoundManager {

    public backgroundMusic!: Phaser.Sound.BaseSound;
    public win!: Phaser.Sound.BaseSound;

    constructor(game: Phaser.Game){
        super(game);

        this._create();
    }

    private _create(): void {
        this.backgroundMusic = this.game.sound.add("backgroundMusic", { loop: true });
        this.win = this.game.sound.add("winSound");
    }

    public enable(): void {
        this.game.sound.setMute(false);
    }

    public disable(): void {
        this.game.sound.setMute(true);
    }
}

