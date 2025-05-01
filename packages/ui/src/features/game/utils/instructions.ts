import type { i18n } from "../types";
import type { Instruction, InstructionName } from "../types/Instruction";

export const getInstruction = (
    t: i18n,
    name: InstructionName,
): Instruction => ({
    instruction: t(`game.instructions.${name}.instruction`),
    asset: t(`game.instructions.${name}.asset`),
});
