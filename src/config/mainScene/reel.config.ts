import { ReelConfig } from "@/types/reelConfig.type";
import { ANIMATION_DURATION, CENTER_Y } from "../constants";

const reelConfig: ReelConfig = {
    width: 100,
    height: 154,
    offsetX: 46,
    x: -195,
    y: -50,
    shapeMask: {
        width: 100,
        height: 154,
        y: CENTER_Y - 156
    },
    minSpinLoopsCount: 2,
    spinStepDuration: ANIMATION_DURATION
};

export { reelConfig };