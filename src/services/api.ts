import { gameServer } from "./gameServer";
import { GameState, SpinResult } from "./gameServer/gameServer.types";

class ApiService {
  async getInitialState(): Promise<GameState> {
    return await gameServer.getInitialState();
  }

  async playGame(): Promise<SpinResult> {
    return await gameServer.playGame();
  }
}

export const api = new ApiService();
