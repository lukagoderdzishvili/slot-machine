import BaseScene from './BaseScene';
import * as config from '@/config/mainScene';
import Board from '@/components/Board';
import { api } from '@/services/api';
import { GameState, SpinResult } from '@/services/gameServer/gameServer.types';
import Button from '@/components/Button';
import Reel from '@/components/Reel';
import { gameData } from '@/data';
import AudioManager from '@/services/audio/AudioManager';
import CoinRain from '@/components/CoinRain';
import Character from '@/components/Character';
import { CENTER_X, CENTER_Y } from '@/config/constants';
import { CharacterAnimation, characterConfig } from '@/config/mainScene/character.config';
import ControlPanel from '@/components/ControlPanel';
 
export default class MainScene extends BaseScene {
    private _container!: Phaser.GameObjects.Container;
    private _board!: Board;
    private _background!: Phaser.GameObjects.Sprite;
    private _overlay!: Phaser.GameObjects.Rectangle;
    private _controlPanel!: ControlPanel;
    private _spinResult!: SpinResult;

    private _rain!: CoinRain;
    private _leftCharacter!: Character;
    private _rightCharacter!: Character;
    
    constructor() {
        super({ key: 'MainScene' });

    }
    
    public create(): void {
        this._container = this.add.container(0, 0);
        
        this._createAudioManager();
        this._createBackground();
        this._createBoard();
        this._createControlPanel();
        this._createCoinRain();
        this._createCharacters();
        
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
            this._spinResult = await api.playGame();

            this._board.setSpinResult(this._spinResult);


        } catch (error: unknown) {
            console.error('Failed to perform spin', error);
        }
    }

    private _isWinningSpin(): boolean {
        const reels: number[] = this._spinResult.reels;
        return reels.every(reel => reel === reels[0]);
    }

    private _finishGame(): void {
        const isWin: boolean = this._isWinningSpin();

        isWin ? this._handleWin() : this._handleLose();

        this._controlPanel.finishGame();
    }


    private _handleWin(): void {
        gameData.audioManager?.win.play();
        this._playCharacters(characterConfig.animations.WIN, 2);
        this._rain.play();
    }

    private _handleLose(): void {
        this._playCharacters(characterConfig.animations.LOSE, 1);
    }


    private _playCharacters(animation: CharacterAnimation, repeat: number): void {
        this._leftCharacter.playAnimation(animation, repeat);
        this._rightCharacter.playAnimation(animation, repeat);
    }


    private _createAudioManager(): void {
        gameData.audioManager = new AudioManager(this.game);
        gameData.audioManager.backgroundMusic.play();
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
        this._board = new Board(this, config.boardConfig.x, config.boardConfig.y)
            .setScale(config.boardConfig.scale)
            .onFinish(() => this._finishGame());

        this._container.add(this._board);
    }

    private _createControlPanel(): void {
        this._controlPanel = new ControlPanel(this);
        this._container.add(this._controlPanel);

        this._controlPanel.onPlayCallback(() => this._playGame());
    }

    private _createCoinRain(): void {
        this._rain = new CoinRain(this);
    }

    private _createCharacters(): void {
        this._leftCharacter = new Character(this, CENTER_X * 0.25, CENTER_Y * 1.85, false);
        this._rightCharacter = new Character(this, CENTER_X * 1.75, CENTER_Y * 1.85, true);
    }
}  