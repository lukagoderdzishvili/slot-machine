import { SpinState } from "@/types/spin";
import * as config from "@/config/mainScene";
import Symbol from "./Symbol";
import gsap from "gsap";
import { SYMBOLS, CENTER_X, SymbolKey } from "@/config/constants";
import { SymbolID } from "@/services/gameServer/gameServer.types";

export default class Reel extends Phaser.GameObjects.Container {
    private _symbols: Symbol[] = [];
    private _maskShape!: Phaser.GameObjects.Graphics;
    private _mask!: Phaser.Display.Masks.GeometryMask;
    private _state!: SpinState;
    private _onFinishCallback!: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this._createMask();
    }

    public play(spinLoops: number, resultIndex: number): void {
        this._state = {
            current: 0,
            total: spinLoops,
            resultIndex: resultIndex,
        };

        
        this._spinStep();
    }

    public setResultIndex(resultIndex: number): void{
        this._state.resultIndex = resultIndex;
    }

    private _spinStep(): void {
        gsap.to(this, {
            y: `+=${config.symbolConfig.height * 1.5}`,
            duration: config.reelConfig.spinStepDuration,
            ease: "linear",
            onUpdate: () => this._updateSymbols(),
            onComplete: () => {
                if (
                    this._state.current > this._state.total - 1 ||
                    this._state.resultIndex !== -1
                ) {
                    this._state.current++;
                }

                if (this._state.current <= this._state.total) {
                    this._spinStep();
                } else {
                    this._finishSpin(this._state.resultIndex);
                }
            },
        });
    }

    private _updateSymbols(): void {
        const topSymbol: Symbol = this._symbols[0];
        const bottomSymbol: Symbol = this._symbols[1];
        
        if (bottomSymbol.y + this.y >=  config.reelConfig.shapeMask.y / 2 + (config.symbolConfig.height * 1.5) / 2) {
            bottomSymbol.y = topSymbol.y - (config.symbolConfig.height * 1.5);

            const nextTexture: string =
                this._state.current < this._state.total - 1
                    ? this._getRandomSymbol()
                    : SYMBOLS[this._state.resultIndex];

            bottomSymbol.setFrame(nextTexture);

            this._symbols = [bottomSymbol, topSymbol];
        }
    }

    private _finishSpin(finalIndex: number): void {
        const bottomSymbol: Symbol = this._symbols[1];
        bottomSymbol.setFrame(SYMBOLS[finalIndex]);

        this._onFinishCallback && this._onFinishCallback();
    }

    private _getRandomSymbol(): SymbolKey {
        return Phaser.Math.RND.pick([...SYMBOLS]);
    }

    private _createMask(): void {
        this._maskShape = this.scene.add.graphics();
        this._maskShape.fillRect(
            CENTER_X + this.x,
            config.reelConfig.shapeMask.y,
            config.reelConfig.shapeMask.width,
            config.reelConfig.shapeMask.height
        );
        this._maskShape.setVisible(false);
        this._mask = this._maskShape.createGeometryMask();
    }

    private _applyMaskToSymbols(): void {
        this._symbols.forEach(symbol => symbol.setMask(this._mask));
    }


    public setInitialSymbol(currentSymbolID: SymbolID): void {
        const topSymbol: Symbol = new Symbol(this.scene, config.reelConfig.width / 2,  config.reelConfig.shapeMask.y / 2 - (config.symbolConfig.height * 1.5), "images", this._getRandomSymbol());
        const bottomSymbol: Symbol = new Symbol(this.scene, config.reelConfig.width / 2, config.reelConfig.shapeMask.y / 2, "images", SYMBOLS[currentSymbolID]);
        
        this._symbols.push(topSymbol, bottomSymbol);
        this._applyMaskToSymbols();


        this.add(this._symbols);
    }

    public onFinish(callback: () => void): void {
        this._onFinishCallback = callback;
    }
}
 