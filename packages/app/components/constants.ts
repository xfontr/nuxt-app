const getAsset = (id: string): string =>
    `https://img.icons8.com/?size=100&id=${id}&format=png&color=ffffff`;

export const ASSETS = {
    nuxt: getAsset("24eF8YVaoAR5"),
    vue: getAsset("rSpdgU9ntuoU"),
    react: getAsset("0Da6k7SMq0hs"),
    ts: getAsset("vMqgHSToxrJR"),
    js: getAsset("106036"),
    css: getAsset("38272"),
    html: getAsset("23028"),
    node: getAsset("FQlr_bFSqEdG"),
    c: getAsset("40669"),
};

export const ICON_KEYS = Object.keys(ASSETS);
