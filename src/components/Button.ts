import { ButtonConfig } from "@/types/button.type";

export default class Button extends Phaser.GameObjects.Sprite {
    private _config: ButtonConfig;

    constructor(scene: Phaser.Scene, config: ButtonConfig){
        super(scene, config.x, config.y, config.texture, config.default_texture);
        this._config = config;
    }

    public onClick(callback: () => void): void{
        this.on("pointerdown", callback);
    }

    public enable(): void {
        this.setInteractive({ useuseHandCursor: true });
        this.setFrame(this._config.default_texture);
    }

    public disable(): void {
        this.removeInteractive(); 
        this.setFrame(this._config.disabled_texture);  
    }
} 