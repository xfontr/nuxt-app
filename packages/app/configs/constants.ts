import type { Themes } from "~/types/Themes";

/**
 * Must restart server after update
 */
export const THEME: Themes = "theme-main";

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
