import { coinRainConfig } from "@/config/mainScene";
import { SpineGameObject } from "@esotericsoftware/spine-phaser";

export default class CoinRain {

    constructor(private scene: Phaser.Scene) {}

    play(): void {
        const count: number = Phaser.Math.Between(coinRainConfig.count.min, coinRainConfig.count.max);

        for (let i = 0; i < count; i++) {
            this._spawnCoin();
        }
    }

    private _spawnCoin(): void {
        const coin: SpineGameObject = this.scene.add.spine(
            Phaser.Math.Between(0, this.scene.scale.width),
            coinRainConfig.initialY, 
            coinRainConfig.texture, 
            coinRainConfig.texture
        )

        coin.setScale(Phaser.Math.FloatBetween(coinRainConfig.scale.min, coinRainConfig.scale.max));
        coin.animationState.setAnimation(0, coinRainConfig.animation, true);


        this.scene.tweens.add({
            targets: coin,
            y: this.scene.scale.height + 100,
            ease: "linear",
            duration: Phaser.Math.Between(coinRainConfig.animationDuration.min, coinRainConfig.animationDuration.max),
            onComplete: () => coin.destroy(),
        });
    }
}
