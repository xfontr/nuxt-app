import TechImage from "./helpers/TechImage";
import TechText from "./helpers/TechText";

export const TECH_STROKE = 2;
export const FRICTION_AIR = [0.01, 0.02, 0.03, 0.05, 0.07];
export const GRID_SIZE = 13;

export const ASSETS = [
    {
        nuxt: TechImage("24eF8YVaoAR5"),
        vue: TechImage("rSpdgU9ntuoU"),
        react: TechImage("0Da6k7SMq0hs"),
        ts: TechImage("vMqgHSToxrJR"),
        js: TechImage("106036"),
        css: TechImage("38272"),
        html: TechImage("23028"),
    },
    {
        node: TechImage("FQlr_bFSqEdG"),
        c: TechText("C"),
        sql: TechImage("ywH6EJgZ7sm5"),
        mongo: TechText("MONGO"),
    },
    {
        testing: TechText("TESTS"),
        solid: TechText("SOLID"),
        design: TechText("UI/UX"),
        cro: TechText("CRO"),
        seo: TechText("SEO"),
    },
];
