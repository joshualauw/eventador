export default defineNuxtPlugin(() => {
    const { subscribe } = usePusher();
    subscribe();
});
