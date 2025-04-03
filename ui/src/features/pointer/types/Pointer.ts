import type { Unit } from "../../../types/Unit";
import type { Location } from "../../../types/Location";

export type PointerOptions = {
    alwaysVisible: boolean;
    start?: Location;
    enabled: boolean;
    canOverflow: boolean;
    size: number;
    unit: Unit;
};
