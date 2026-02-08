import { soundButtonConfig } from "@/config/mainScene/soundButton.config";
import Button from "./Button";
import { spinButtonConfig } from "@/config/mainScene";
import { gameData } from "@/data";

export default class ControlPanel extends Phaser.GameObjects.Container {
    private _spinButton!: Button;
    private _soundButton!: Button;

    private _onPlayCallback!: () => void;

    constructor(scene: Phaser.Scene){
        super(scene);

        this._create();
        this._addEvents();
    }


    private _create(): void {
        this._createSpinButton();
        this._createSoundButton();
    }

    private _addEvents(): void {
        this._spinButton.onClick( () => {
            this._spinButton.disable();
            this._onPlayCallback() 
        });

        this._soundButton.onClick( () => {
            if(this.scene.sound.mute){
                this._soundButton.setEnabledFrame();
                gameData.audioManager?.enable();
            } else {
                this._soundButton.setDisabledFrame();
                gameData.audioManager?.disable();
            }

        });
    }

    private _createSpinButton(): void {
        this._spinButton = new Button(this.scene, spinButtonConfig);
        this._spinButton.enable();
        
        this.add(this._spinButton);
    }

    private _createSoundButton(): void {
        this._soundButton = new Button(this.scene, soundButtonConfig);
        this._soundButton.enable();

        this.add(this._soundButton);
    }


    public onPlayCallback(callback: () => void): void {
        this._onPlayCallback = callback;
    }

    public finishGame(): void {
        this._spinButton.enable();
    }
}