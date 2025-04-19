export type OnEventOptions = Partial<{
    /**
     * @description Calls the forwarded callback without an event object
     */
    immediate: boolean;
}> & {
    passive?: boolean;
};
