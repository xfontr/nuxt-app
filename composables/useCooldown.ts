type CooldownCallback = <T>(...args: unknown[]) => T | void;

const useCooldown = () => {
    const cooldownTimer = ref<ReturnType<typeof setTimeout>>();
    const callback = ref<CooldownCallback>();

    const reset = (): void => {
        clearTimeout(cooldownTimer.value);
        cooldownTimer.value = undefined;
    };

    const runCooldownCallbackWhenDone = (span: number): void => {
        cooldownTimer.value = setTimeout(() => {
            callback.value?.();
            reset();
        }, span);
    };

    const cooldown = (action: CooldownCallback, span: number = 50): void => {
        if (cooldownTimer.value) return;
        callback.value = action;
        runCooldownCallbackWhenDone(span);
    };

    onScopeDispose(reset);

    return { cooldown };
};

export default useCooldown;
