import TechImage from "./helpers/TechImage";
import TechText from "./helpers/TechText";

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

export const TECH = [
    [
        TechImage("24eF8YVaoAR5"), // nuxt
        TechImage("rSpdgU9ntuoU"), // vue
        TechImage("0Da6k7SMq0hs"), // react
        TechImage("vMqgHSToxrJR"), // ts
        TechImage("106036"), // js
        TechImage("38272"), // css
        TechImage("23028"), // html
        TechText("VUE"),
    ],
    [
        TechImage("FQlr_bFSqEdG"), // node
        TechText("C"),
        TechImage("ywH6EJgZ7sm5"), // sql
        TechText("MONGO"),
    ],
    [
        TechText("TESTS"),
        TechText("SOLID"),
        TechText("UI/UX"),
        TechText("CRO"),
        TechText("SEO"),
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
