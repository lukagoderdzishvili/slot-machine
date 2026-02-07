import { gameData } from "@/data";

export const CENTER_X: number = gameData.width / 2;
export const CENTER_Y: number = gameData.height / 2;
export const ANIMATION_DURATION: number = 0.3;

export const SYMBOLS = [
  "symbol1",
  "symbol2",
  "symbol3",
] as const;

export type SymbolKey = typeof SYMBOLS[number];