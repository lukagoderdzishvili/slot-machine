
export const characterConfig = {
    scale: 0.3,
    texture: "character",
    animations: {
        IDLE: "run",
        WIN: "shoot",
        LOSE: "death",
    } as const
};

export type CharacterAnimation = typeof characterConfig.animations[keyof typeof characterConfig.animations];