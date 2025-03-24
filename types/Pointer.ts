import type { Location } from "./Location";

export type PointerOptions = Partial<{
    alwaysVisible: boolean;
    start: Location;
    enabled: boolean;
    canOverflow: boolean;
    size: number;
}>;
