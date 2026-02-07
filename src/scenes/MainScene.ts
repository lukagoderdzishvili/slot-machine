import BaseScene from './BaseScene';
import * as config from '@/config/mainScene';
import Board from '@/components/Board';
import { api } from '@/services/api';
import { GameState, SpinResult } from '@/services/gameServer/gameServer.types';
import Button from '@/components/Button';
import Reel from '@/components/Reel';
import { gameData } from '@/data';
import AudioManager from '@/services/audio/AudioManager';
 
export default class MainScene extends BaseScene {
    private _container!: Phaser.GameObjects.Container;
    private _board!: Board;
    private _background!: Phaser.GameObjects.Sprite;
    private _overlay!: Phaser.GameObjects.Rectangle;
    private _spinButton!: Button;
    private _spinResult!: SpinResult;
    
    constructor() {
        super({ key: 'MainScene' });
    }

    public create(): void {
        gameData.audioManager = new AudioManager(this.game);
        gameData.audioManager.backgroundMusic.play();


        this._container = this.add.container(0, 0);

        this._createBackground();
        this._createBoard();
        this._createSpinButton();

        this.playEnterTransition();
        this._initGameState();

        this._addEvents();
    }

    private _addEvents(): void {
        this.events.on("reel:finish", (reel: Reel) => {
            if(reel.parentContainer.getIndex(reel) == gameData.reelsCount) this._finishGame();
        });

        this._spinButton.onClick(() => {
            this._spinButton.disable(); 
            this._playGame();
        });
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
            this._spinResult = await api.playGame();

            this._board.setSpinResult(this._spinResult);


        } catch (error: unknown) {
            console.error('Failed to perform spin', error);
        }
    }

    private _isWinningSpin(): boolean {
        return (new Set(this._spinResult.reels).size === 1);
    }

    private _finishGame(): void {
        if(this._isWinningSpin()) gameData.audioManager?.win.play();
        this._spinButton.enable();
    }

    private _createBackground(): void {
        this._background = this.make
            .sprite({...config.backgroundConfig})
            .setDisplaySize(config.backgroundConfig.displayWidth, config.backgroundConfig.displayHeight);
        
        this._overlay = this.add.rectangle(
            config.overlayConfig.x, 
            config.overlayConfig.y, 
            config.overlayConfig.width, 
            config.overlayConfig.height, 
            config.overlayConfig.color, 
            config.overlayConfig.alpha
        );

        this._container.add([this._background, this._overlay]);
    }

    private _createBoard(): void {
        this._board = new Board(this, config.boardConfig.x, config.boardConfig.y).setScale(config.boardConfig.scale);
        this._container.add(this._board);
    }

    private _createSpinButton(): void {
        this._spinButton = new Button(this, config.spinButtonConfig);
        this._spinButton.enable();
        
        this._container.add(this._spinButton);
    }
}  