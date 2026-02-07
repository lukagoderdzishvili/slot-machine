export interface ReelConfig {
    width: number;
    height: number;
    offsetX: number;
    x: number;
    y: number;
    shapeMask: {
        width: number;
        height: number;
        y: number;
    },
    minSpinLoopsCount: number,
    spinStepDuration: number;
}