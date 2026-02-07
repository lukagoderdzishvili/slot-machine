import { gameData } from '@/data';
import BaseScene from './BaseScene';
import * as config from '@/config/mainScene';
import Board from '@/components/Board';
import { api } from '@/services/api';
import { GameState, SpinResult } from '@/services/gameServer/gameServer.types';
 
export default class MainScene extends BaseScene {
    private _board!: Board;
    private _background!: Phaser.GameObjects.Sprite;
    private _overlay!: Phaser.GameObjects.Rectangle;
    
    constructor() {
        super({ key: 'MainScene' });

        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.code === "Space") {
                this._playGame();
            }
        });
    }

    create(): void {
        this._createBackground();
        this._createBoard();
        this.playEnterTransition();

        this._initGameState();
    }

    private async _initGameState(): Promise<void> {
        try {
            const initialState: GameState = await api.getInitialState();

            this._board.setReelsInitialSymbols(initialState.reels);

        } catch (error: unknown) {
            console.error('Failed to fetch initial game state', error);
        }
    }

    private async _playGame(): Promise<void> {
        try {
            this._board.play();
            const spinResult: SpinResult = await api.playGame();
            this._board.setSpinResult(spinResult);


        } catch (error: unknown) {
            console.error('Failed to perform spin', error);
        }
    }

    private _createBackground(): void {
        this._background = this.add
            .sprite(config.backgroundConfig.x, config.backgroundConfig.y, config.backgroundConfig.key)
            .setDisplaySize(config.backgroundConfig.displayWidth, config.backgroundConfig.displayHeight);
        
        this._overlay = this.add.rectangle(
            config.overlayConfig.x, 
            config.overlayConfig.y, 
            config.overlayConfig.width, 
            config.overlayConfig.height, 
            config.overlayConfig.color, 
            config.overlayConfig.alpha
        );

    }

    private _createBoard(): void {
        this._board = new Board(this, config.boardConfig.x, config.boardConfig.y).setScale(config.boardConfig.scale);
    }
}