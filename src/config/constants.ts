import { gameData } from "@/data";

export const CENTER_X = gameData.width / 2;
export const CENTER_Y = gameData.height / 2;


export const SYMBOLS = [
  "symbol1",
  "symbol2",
  "symbol3",
] as const;

export type SymbolKey = typeof SYMBOLS[number];