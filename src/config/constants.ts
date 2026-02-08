import { gameData } from "@/data";

export const CENTER_X: number = gameData.width / 2;
export const CENTER_Y: number = gameData.height / 2;
export const ANIMATION_DURATION: number = 0.2;
export const SCENE_TRANSITION_DEFAULT_DURATION: number = 500;

export const SYMBOLS = [
  "symbol1.png",
  "symbol2.png",
  "symbol3.png",
] as const;

export type SymbolKey = typeof SYMBOLS[number];