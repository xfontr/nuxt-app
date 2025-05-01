import type { UiAssetName } from "./UiAsset";

export type Instruction = {
    instruction: string;
    asset: UiAssetName;
};

export type InstructionName =
    | "up"
    | "left"
    | "right"
    | "space"
    | "tap"
    | "tap_hold"
    | "start_desktop"
    | "restart_desktop"
    | "start_mobile"
    | "restart_mobile";
