/**
 * Fixes strange dev tools server warning
 * Ideally we should try to get the root cause, but it seems to be a mistery
 *
 * A few reports on this issue:
 * https://github.com/nuxt/nuxt/issues/31978
 *
 * The suggested fix is to create a fake page, but properly proxying the request
 * seems like a cleaner approach
 */
export default defineEventHandler(async (event) => {
    if (useRuntimeConfig().public.nodeEnv !== "production") return;
    await proxyRequest(event, event.path);
});
