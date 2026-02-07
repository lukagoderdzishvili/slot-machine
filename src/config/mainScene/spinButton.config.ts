import { ButtonConfig } from "@/types/button.type";
import { CENTER_X, CENTER_Y } from "../constants";

const spinButtonConfig: ButtonConfig = {
    x: CENTER_X,
    y: CENTER_Y * 1.65,
    texture: "images",
    default_texture: "spin-button-default.png",
    disabled_texture: "spin-button-disabled.png"
}

export { spinButtonConfig }