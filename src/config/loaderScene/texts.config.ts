import { TextConfig } from "@/types/text";
import { CENTER_X, CENTER_Y } from "../constants";

export const loadingTextConfig: TextConfig = {
    x: CENTER_X,
    y: CENTER_Y - 50,
    text: "Loading...",
    origin: { x: 0.5, y: 0.5 },
    resolution: 1,
    style: {
        font: "20px Arial",
        color: "#ffffff",
    },
};

export const percentTextConfig: TextConfig = {
    x: CENTER_X,
    y: CENTER_Y,
    text: "0%",
    origin: { x: 0.5, y: 0.5 },
    resolution: 1,
    style: {
        font: "18px Arial",
        color: "#2afa00",
    },
};

export default {
    loadingTextConfig,
    percentTextConfig
}