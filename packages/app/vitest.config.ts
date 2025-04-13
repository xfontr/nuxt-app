import { mergeConfig } from "vitest/config";
import configs from "@portfolio/configs/vitest";

export default mergeConfig(configs, {
    test: { environment: "happy-dom" },
});
