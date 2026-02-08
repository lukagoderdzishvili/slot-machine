import { CharacterAnimation, characterConfig } from "@/config/mainScene/character.config";
import { SpineGameObject } from "@esotericsoftware/spine-phaser";
import gsap from "gsap";

export default class Character {
    private _spineObject!: SpineGameObject; 

    constructor(private scene: Phaser.Scene, x: number, y: number, flip: boolean){
        this._create(flip, x, y);
        this.playAnimation(characterConfig.animations.IDLE);
    }


    private _create(flip: boolean, x: number, y: number): void {
        this._spineObject = this.scene.add
            .spine(x, y, characterConfig.texture, characterConfig.texture)
            .setScale(flip ? -characterConfig.scale : characterConfig.scale, characterConfig.scale);
    }

    public playAnimation(animation: CharacterAnimation, duration?: number){
        this._spineObject.animationState.setAnimation(0, animation, true);

        if(duration) gsap.delayedCall(duration, () => this._spineObject.animationState.setAnimation(0, characterConfig.animations.IDLE, true));

    }
}