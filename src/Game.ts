import Phaser from 'phaser';
import gameConfig from './config/gameConfig';

export default class Game {
    private _game: Phaser.Game;

    constructor() {
        this._game = new Phaser.Game(gameConfig);
    }

    public get phaserGame(): Phaser.Game {
        return this._game;
    }
}