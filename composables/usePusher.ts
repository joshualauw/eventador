import Pusher from "pusher-js";
import { POSITION, TYPE } from "vue-toastification";

export default function usePusher() {
    const config = useRuntimeConfig();
    const { loggedUser } = useAuthStore();
    const pusher = useState<Pusher | null>("pusher", () => null);

    if (!pusher.value) {
        pusher.value = new Pusher(config.public.pusher.key, {
            cluster: config.public.pusher.cluster,
        });
    }

    function subscribe() {
        if (loggedUser.value && pusher.value) {
            const channel_name = loggedUser.value._id;
            if (!pusher.value.channels.find(channel_name)) {
                const channel = pusher.value.subscribe(channel_name);
                console.log("(pusher) subscribed to " + channel_name);

                loggedUser.value.preferences.notifications.forEach((pref) => {
                    channel.bind(pref, (data: IPusherNotifyPayload) => {
                        createToast(data.message, TYPE.INFO, { position: POSITION.TOP_CENTER });
                    });
                });
            }
        }
    }

    function unsubscribe(channel_name: string) {
        if (pusher.value) {
            pusher.value.unsubscribe(channel_name);
            console.log("(pusher) unsubscribed from " + channel_name);
        }
    }

    return { subscribe, unsubscribe };
}