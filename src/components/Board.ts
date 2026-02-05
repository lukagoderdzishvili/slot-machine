export class Board extends Phaser.GameObjects.Container {

    private _background!: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this._createBackground();

        this.scene.add.existing(this);
    }


    private _createBackground(): void{
        this._background = this.scene.make.sprite({x: 0, y: 0, key: 'board-default'});
        
        this.add(this._background);
    }
}