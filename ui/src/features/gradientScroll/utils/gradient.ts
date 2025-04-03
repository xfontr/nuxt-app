/**
 * Determines the next or previous threshold value based on direction.
 *
 * @param {number[]} thresholds - The list of threshold values.
 * @param {number | undefined} closestThreshold - The closest threshold to the target.
 * @param {boolean} isDown - Whether to move to the next (true) or previous (false) threshold.
 * @returns {number | undefined} The determined threshold value or the closestThreshold if no next/previous value exists.
 */

export const getGradient = (
    thresholds: number[],
    closestThreshold: number | undefined,
    isDown: boolean,
): number | undefined => {
    const closestKeyIndex = closestThreshold
        ? thresholds.indexOf(closestThreshold)
        : -1;

    return thresholds[closestKeyIndex + (isDown ? 1 : -1)] ?? closestThreshold;
};
