import Pusher from "pusher-js";
import { POSITION, TYPE } from "vue-toastification";

export default function usePusherSubscribe() {
    const config = useRuntimeConfig();
    const { loggedUser } = useAuthStore();

    if (loggedUser.value) {
        const pusher = new Pusher(config.public.pusher.key, {
            cluster: config.public.pusher.cluster,
        });

        const channel_name = loggedUser.value._id;
        if (!pusher.channels.find(channel_name)) {
            const channel = pusher.subscribe(channel_name);
            console.log("(pusher) subscribed to " + channel_name);

            loggedUser.value.preferences.notifications.forEach((pref) => {
                channel.bind(pref, (data: IPusherNotifyPayload) => {
                    createToast(data.message, TYPE.INFO, { position: POSITION.TOP_CENTER });
                });
            });
        }
    }
}
