import Pusher from "pusher-js";
import { POSITION, TYPE } from "vue-toastification";

function mapType(type: "error" | "info" | "success" | "warning") {
    if (type == "error") return TYPE.ERROR;
    else if (type == "success") return TYPE.SUCCESS;
    else if (type == "info") return TYPE.INFO;
    else if (type == "warning") return TYPE.WARNING;
    else return TYPE.DEFAULT;
}

export default function usePusherSubscribe() {
    // const config = useRuntimeConfig();
    // const { loggedUser } = useAuthStore();
    // const pusher = new Pusher(config.public.pusher.key, {
    //     cluster: config.public.pusher.cluster,
    // });
    // if (loggedUser.value) {
    //     const channel_name = loggedUser.value._id;
    //     if (!pusher.channels.find(channel_name)) {
    //         const channel = pusher.subscribe(channel_name);
    //         console.log("(pusher) subscribed to " + channel_name);
    //         loggedUser.value.preferences.notifications.forEach((pref) => {
    //             channel.bind(pref, (data: IPusherNotifyPayload) => {
    //                 createToast(data.message, TYPE.INFO, { position: POSITION.TOP_CENTER });
    //             });
    //         });
    //     }
    // }
}
