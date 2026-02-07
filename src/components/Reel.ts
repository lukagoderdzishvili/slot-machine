import { SpinState } from "@/types/spin";
import * as config from "@/config/mainScene";
import Symbol from "./Symbol";
import gsap from "gsap";
import { CENTER_X, SymbolKey } from "@/config/constants";
import { SYMBOLS } from "@/config/constants";

export default class Reel extends Phaser.GameObjects.Container {
    private _symbols: Symbol[] = [];
    private _maskShape!: Phaser.GameObjects.Graphics;
    private _mask!: Phaser.Display.Masks.GeometryMask;

    // FOR TESTING
    private _isSpinning = false;

    constructor(scene: Phaser.Scene, x: number, y: number, index: number) {
        super(scene, x, y);

        this._createMask();
        this._initializeSymbols();
        this._applyMaskToSymbols();

        scene.add.existing(this);

        // FOR TESTING
        document.addEventListener("keydown", (e) => {
            if (this._isSpinning) return;
            if (e.code === "Space") {
                this.play(config.reelConfig.minSpinLoopsCount + index, 1);
            }
        });
    }

    public play(spinLoops: number, resultIndex: number): void {
        if (this._isSpinning) return;

        this._isSpinning = true;

        this._spinStep({
            current: 0,
            total: spinLoops,
            resultIndex: resultIndex,
        });
    }

    private _spinStep(spinState: SpinState): void {
        gsap.to(this, {
            y: `+=${config.symbolConfig.height * 1.5}`,
            duration: config.reelConfig.spinStepDuration,
            ease: "linear",
            onUpdate: () => this._updateSymbols(spinState),
            onComplete: () => {
                spinState.current++;

                if (spinState.current <= spinState.total) {
                    this._spinStep(spinState);
                } else {
                    this._finishSpin(spinState.resultIndex);
                }
            },
        });
    }

    private _initializeSymbols(): void {
        const firstSymbol: Symbol = new Symbol(this.scene, config.reelConfig.width / 2,  config.reelConfig.shapeMask.y / 2 - (config.symbolConfig.height * 1.5), this._getRandomSymbol());
        const secondSymbol: Symbol = new Symbol(this.scene, config.reelConfig.width / 2, config.reelConfig.shapeMask.y / 2, this._getRandomSymbol());

        this._symbols.push(firstSymbol, secondSymbol);
        this.add(this._symbols);
    }

    // FOR TESTING
    private _updateSymbols(spinState: SpinState): void {
        const firstSymbol: Symbol = this._symbols[0];
        const secondSymbol: Symbol = this._symbols[1];
        
        if (secondSymbol.y + this.y >=  config.reelConfig.shapeMask.y / 2 + (config.symbolConfig.height * 1.5) / 2) {
            secondSymbol.y = firstSymbol.y - (config.symbolConfig.height * 1.5);

            const nextTexture: string =
                spinState.current < spinState.total - 1
                    ? this._getRandomSymbol()
                    : SYMBOLS[spinState.resultIndex];

            secondSymbol.setTexture(nextTexture);

            this._symbols = [secondSymbol, firstSymbol];
        }
    }

    private _finishSpin(finalIndex: number): void {
        const secondSymbol: Symbol = this._symbols[1];
        secondSymbol.setTexture(SYMBOLS[finalIndex]);
        this._isSpinning = false;
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
}
