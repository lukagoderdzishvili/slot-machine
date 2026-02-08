import { SCENE_TRANSITION_DEFAULT_DURATION } from '@/config/constants';
import Phaser from 'phaser';

export default abstract class BaseScene extends Phaser.Scene {

    protected fadeToScene(sceneKey: string, duration = SCENE_TRANSITION_DEFAULT_DURATION, callBack?: () => void): void {
        this.cameras.main.fadeOut(duration, 0, 0, 0);
        this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            () => {
                this.scene.start(sceneKey);
                callBack && callBack()
            }
        );
    }

    protected playEnterTransition(duration: number = SCENE_TRANSITION_DEFAULT_DURATION): void {
        this.cameras.main.fadeIn(duration);
    }
}
