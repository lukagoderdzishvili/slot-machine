import { gameData } from "@/data";
import Reel from "./Reel";
import * as config from "@/config/mainScene";
import { SpinResult, SymbolID } from "@/services/gameServer/gameServer.types";
import gsap from "gsap";
import { ANIMATION_DURATION } from "@/config/constants";

export default class Board extends Phaser.GameObjects.Container {

    private _background!: Phaser.GameObjects.Sprite;
    private _reels: Reel[] = [];
    private _onFinishCallback!: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this._create();
    }

    private _create(): void {
        this._createBackground();
        this._createReels();
    }

    private _createBackground(): void{
        this._background = this.scene.make.sprite({...config.boardConfig.background});
        this.add(this._background);
    }

    private _createReels(): void {
        for (let i = 0; i < gameData.reelsCount; i++) {
            const positionX: number = config.reelConfig.x + (i * config.reelConfig.width  + (i * config.reelConfig.offsetX)); 
            const reel: Reel = new Reel(this.scene, positionX, config.reelConfig.y);
            if(i === gameData.reelsCount - 1) reel.onFinish(() => this._onFinishCallback());
            this._reels.push(reel);
        }
        
        this.add(this._reels);
    }

    private _playBackgroundAnimation(): void{
        this._background.setFrame("board-active.png");
        
        gsap.delayedCall(ANIMATION_DURATION, () => {
            this._background.setFrame("board-default.png");
        });
    }

    public play(): void {
        this._playBackgroundAnimation();
        this._reels.forEach((reel: Reel, index: number) => {
            reel.play(config.reelConfig.minSpinLoopsCount + index, -1);
        });
    }

    public setSpinResult(spinResult: SpinResult): void {
        this._reels.forEach((reel: Reel, index: number) => {
            reel.setResultIndex(spinResult.reels[index]);
        });
    }

    public setReelsInitialSymbols(reelsData: SymbolID[]): void {
        this._reels.forEach((reel: Reel, index: number) => {
            reel.setInitialSymbol(reelsData[index]);
        });
    }

    public onFinish(callback: () => void): Board {
        this._onFinishCallback = callback;

        return this;
    }

}