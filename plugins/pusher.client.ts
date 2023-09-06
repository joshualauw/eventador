import Pusher from "pusher-js";

export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig();
    const pusher = new Pusher(config.public.pusher.key, {
        cluster: config.public.pusher.cluster,
    });

    const { subscribe } = usePusher();
    subscribe(pusher);

    return {
        provide: {
            pusher,
        },
    };
});
