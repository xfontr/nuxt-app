/**
 * Fixes strange dev tools server warning. A few reports on this issue:
 * https://github.com/nuxt/nuxt/issues/31978
 *
 * As of now, this is basically a Nuxt bug pending to be addressed.
 * We should review this proxy in a few weeks/months and consider its removal
 * if the bug is finally fixed.
 */
export default defineEventHandler(async (event) => {
    if (useRuntimeConfig().public.nodeEnv !== "production") return;
    await proxyRequest(event, event.path);
});
