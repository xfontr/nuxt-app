export type Instructions = {
    outDir: string;
    compile: {
        name: string;
        path: string;
        type?: "THEME";
    }[];
};
