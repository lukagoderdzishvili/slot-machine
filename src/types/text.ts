export interface TextConfig {
    text: string;
    x: number;
    y: number;
    origin: { x: number; y: number };
    resolution: number;
    style: {
        font: string;
        color: string;
        [key: string]: any;
    };
}


export interface TextButtonConfig extends TextConfig {
    backgroundColor?: string;
    padding?: number;
    shadow?: {
        offsetX: number;
        offsetY: number;
        color: string;
        blur: number;
    };
}