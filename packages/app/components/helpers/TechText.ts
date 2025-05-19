import { colors, fonts } from "@portfolio/ui";
import type { TechItem } from "../types/Tech";

const TechText = (text: string): TechItem => ({
    render: (context: Matter.Render["context"], size: number) => {
        context.fillStyle = colors.THEME_MAIN.colorsSecondary;
        context.font = `${Math.max(fonts.FONTS_SIZE_BASE, size / 2)}px ${
            fonts.FONTS_PRIMARY
        }`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(text, 0, 0);
    },
});

export default TechText;
