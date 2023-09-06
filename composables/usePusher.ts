import Pusher from "pusher-js";
import { POSITION, TYPE } from "vue-toastification";

export default function usePusher() {
    function subscribe(pusher: Pusher) {
        const { loggedUser, getMe } = useAuthStore();

        if (loggedUser.value) {
            const channel_name = loggedUser.value._id;
            if (!pusher.channels.find(channel_name)) {
                const channel = pusher.subscribe(channel_name);
                console.log("(pusher) subscribed to " + channel_name);

                loggedUser.value.preferences.notifications.forEach((pref) => {
                    channel.bind(pref, async (data: IPusherNotifyPayload) => {
                        createToast(data.message, TYPE.INFO, {
                            position: POSITION.TOP_CENTER,
                            onClick: () => {
                                navigateTo("/notification");
                            },
                        });
                        if (pref == "user:transaction") await getMe();
                    });
                });
            }
        }
    }

    function unsubscribe(pusher: Pusher, channel_name: string) {
        if (pusher) {
            pusher.unsubscribe(channel_name);
            console.log("(pusher) unsubscribed from " + channel_name);
        }
    }

    return { subscribe, unsubscribe };
}
