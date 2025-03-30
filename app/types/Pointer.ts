import type { Location } from "./Location";

export type PointerOptions = {
    alwaysVisible: boolean;
    start?: Location;
    enabled: boolean;
    canOverflow: boolean;
    size: number;
    unit: "vh" | "vw" | "%" | "px";
};
