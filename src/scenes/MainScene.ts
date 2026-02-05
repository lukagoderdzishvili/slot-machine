import { gameData } from '@/data';
import BaseScene from './BaseScene';
import { Board } from '@/components/Board';
 
export default class MainScene extends BaseScene {
    private _board!: Board;
    
    constructor() {
        super({ key: 'MainScene' });
    }

    create(): void {
        this.playEnterTransition();
        
        this._board = new Board(this, gameData.width / 2, gameData.height / 2);
    }
}