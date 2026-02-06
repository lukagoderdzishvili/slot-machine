import { gameData } from "@/data";
import { SpinState } from "@/types/spin";
import config from "@/config/mainSceneConfig";
import Symbol from "./Symbol";
import gsap from "gsap";

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
            duration: 0.3,
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
        const posX = config.reelConfig.width / 2;

        const firstSymbol = new Symbol(this.scene, posX, -70, "symbol1");
        const secondSymbol = new Symbol(this.scene, posX, 72, "symbol2");

        this._symbols.push(firstSymbol, secondSymbol);
        this.add(this._symbols);
    }

    // FOR TESTING
    private _updateSymbols(spinState: SpinState): void {
        const firstSymbol = this._symbols[0];
        const secondSymbol = this._symbols[1];
        
        if (secondSymbol.y + this.y >= 72 + (config.symbolConfig.height * 1.5) / 2) {
            secondSymbol.y = firstSymbol.y - (config.symbolConfig.height * 1.5);

            const nextTexture =
                spinState.current < spinState.total - 1
                    ? this._getRandomSymbol()
                    : config.reelConfig.symbols[spinState.resultIndex];

            secondSymbol.setTexture(nextTexture);

            this._symbols = [secondSymbol, firstSymbol];
        }
    }

    private _finishSpin(finalIndex: number): void {
        const secondSymbol = this._symbols[1];
        secondSymbol.setTexture(config.reelConfig.symbols[finalIndex]);
        this._isSpinning = false;
    }

    private _getRandomSymbol(): string {
        return Phaser.Math.RND.pick(config.reelConfig.symbols);
    }

    private _createMask(): void {
        this._maskShape = this.scene.add.graphics();
        this._maskShape.fillRect(
            gameData.width / 2 + this.x,
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
