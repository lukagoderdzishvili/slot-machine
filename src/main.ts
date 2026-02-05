import "./styles/main.scss";
import Game from "./Game";

document.addEventListener('DOMContentLoaded', (): void => {

    const game: Game = new Game();
    globalThis.__PHASER_GAME__ = game.phaserGame;

});