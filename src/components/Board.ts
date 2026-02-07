import { gameData } from "@/data";
import Reel from "./Reel";
import * as config from "@/config/mainScene";

export default class Board extends Phaser.GameObjects.Container {

    private _background!: Phaser.GameObjects.Sprite;
    private _reels: Reel[] = [];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this._createBackground();
        this._createReels();

        this.scene.add.existing(this);
    }


    private _createBackground(): void{
        this._background = this.scene.make.sprite({...config.boardConfig.background});
        this.add(this._background);
    }

    private _createReels(): void {
        for (let i = 0; i < gameData.reelsCount; i++) {
            const positionX: number = config.reelConfig.x + (i * config.reelConfig.width  + (i * config.reelConfig.offsetX)); 
            const reel: Reel = new Reel(this.scene, positionX, config.reelConfig.y, i);
            this._reels.push(reel);
        }
        
        this.add(this._reels);
    }
}