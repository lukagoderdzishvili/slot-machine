import { GameServer, SpinResult, GameState, SymbolID } from "./gameServer.types";

export class MockGameServer implements GameServer {
  private _initialState: GameState;

  constructor() {
    this._initialState = {
      reels: [this._pickSymbol(), this._pickSymbol(), this._pickSymbol()],
    };
  }

  async getInitialState(): Promise<GameState> {
    await this._delay(100);
    return { ...this._initialState };
  }

  async playGame(): Promise<SpinResult> {
    await this._delay(Math.floor(Math.random() * 2000));

    const newReels: SymbolID[] = [
      this._pickSymbol(),
      this._pickSymbol(),
      this._pickSymbol(),
    ];

    return { reels: newReels };
  }

  private _pickSymbol(): SymbolID  {
    return Math.floor(Math.random() * 3); 
  }

  private _delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
