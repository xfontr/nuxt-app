export const THROWER_LOCATION_XS = 90;
export const THROWER_LOCATION_MD = 150;
export const THROWER_LOCATION_LG = 100;

export const TECH_STROKE = 2;
export const FRICTION_AIR = [0.01, 0.02, 0.03, 0.05, 0.07];

export const GRID_SIZE = 13;

export const BODY_MIN_SIZE = 60;
export const BODY_MAX_SIZE = 250;

export const IMG_MIN_SIZE = 20;
export const IMG_MAX_SIZE = 84;

export const TECH: { type: "IMAGE" | "TEXT"; id: string }[][] = [
    [
        { id: "24eF8YVaoAR5", type: "IMAGE" },
        { id: "rSpdgU9ntuoU", type: "IMAGE" },
        { id: "0Da6k7SMq0hs", type: "IMAGE" },
        { id: "vMqgHSToxrJR", type: "IMAGE" },
        { id: "106036", type: "IMAGE" },
        { id: "38272", type: "IMAGE" },
        { id: "23028", type: "IMAGE" },
        { id: "VUE", type: "TEXT" },
    ],
    [
        { id: "FQlr_bFSqEdG", type: "IMAGE" },
        { id: "C", type: "TEXT" },
        { id: "ywH6EJgZ7sm5", type: "IMAGE" },
        { id: "MONGO", type: "TEXT" },
    ],
    [
        { id: "TESTS", type: "TEXT" },
        { id: "SOLID", type: "TEXT" },
        { id: "UI/UX", type: "TEXT" },
        { id: "CRO", type: "TEXT" },
        { id: "SEO", type: "TEXT" },
    ],
];
export const EXPLOSION = {
    power: 20,
    minAngleDeg: 20,
    maxAngleDeg: 70,
    minSpeed: 20,
    maxSpeed: 40,
    delay: 200,
};
