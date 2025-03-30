import { Instructions } from "./Instructions.js";

export type File = {
    name: string;
    rawContent: string;
    extension: "scss" | "css";
    type?: Instructions["compile"][number]["type"];
};
