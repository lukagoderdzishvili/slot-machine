import Phaser from 'phaser';

export default abstract class BaseScene extends Phaser.Scene {

    protected fadeToScene(sceneKey: string, duration = 500, callBack?: () => void): void {
        this.cameras.main.fadeOut(duration, 0, 0, 0);
        this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            () => {
                this.scene.start(sceneKey);
                callBack && callBack()
            }
        );
    }

    protected playEnterTransition(duration: number = 500): void {
        this.cameras.main.fadeIn(duration);
    }
}
