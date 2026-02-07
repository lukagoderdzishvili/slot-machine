import { SpriteConfig } from "./sprite.type";

export interface BoardConfig {
    x: number;
    y: number;
    scale: number;
    background: SpriteConfig;
    reelsCount: number;
}