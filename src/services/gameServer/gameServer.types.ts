export type SymbolID = number;

export interface GameState {
  reels: SymbolID[];
}

export interface SpinResult {
  reels: SymbolID[];
}

export interface GameServer {
  getInitialState(): Promise<GameState>;
  playGame(bet: number): Promise<SpinResult>;
}
