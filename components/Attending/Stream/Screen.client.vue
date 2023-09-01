<template>
    <div class="w-full h-full overflow-y-auto">
        <div
            v-show="options.role == 'audience'"
            id="remotePlayerContainer"
            class="bg-border shadow-md w-full h-[300px] lg:h-[500px] flex-box rounded-xl"
        ></div>
        <div
            v-show="options.role == 'host'"
            id="localPlayerContainer"
            class="bg-border shadow-md w-full h-[300px] lg:h-[500px] flex-box rounded-xl"
        ></div>
        <div class="mt-8 w-full flex-between">
            <div class="space-x-3">
                <button
                    v-for="btn in toogleButtons"
                    v-if="options.role == 'host'"
                    @click="btn.callback"
                    class="btn btn-circle w-12 h-12 p-2"
                    :class="btn.state ? 'btn-solid-error' : 'btn-solid-secondary'"
                >
                    <Icon :name="btn.state ? btn.iconOff : btn.iconOn" class="w-6 h-6" />
                </button>
                <label for="leave-stream-modal" class="btn btn-circle btn-solid-error w-12 h-12 p-2">
                    <Icon name="material-symbols:call-end" class="w-6 h-6" />
                </label>
            </div>
            <label for="participant-stream-modal" class="cursor-pointer btn">
                <Icon name="material-symbols:person" class="w-6 h-6" />
                <span class="ml-1.5">{{ stream?.participants.length }}</span>
            </label>
        </div>
        <UIModal modal-id="participant-stream-modal">
            <div>
                <h2 class="text-lg font-semibold mb-4">All Participants</h2>
                <div class="grid grid-cols-1 gap-3 w-full">
                    <div v-for="par in stream?.participants" class="card hover:scale-100 shadow-none">
                        <div class="flex flex-row gap-4 p-4 card-body rounded-md bg-backgroundSecondary">
                            <div class="avatar avatar-ring avatar-md">
                                <img :src="par.user_id.profile ?? '/images/default-user.png'" alt="avatar" />
                            </div>
                            <div class="flex flex-col text-sm lg:text-base">
                                <span>{{ par.user_id.username }}</span>
                                <p class="text-sm text-success mb-1.5" v-if="par.role">As {{ par.role }}</p>
                                <span class="text-xs lg:text-sm" :class="getBadgeColor(par.type)">{{ par.type }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UIModal>
        <AttendingModalStreamLeave
            @leave="leaveStream"
            :host_label="options.role == 'host' ? 'End stream now? all participants will automatically kicked out' : ''"
        />
    </div>
</template>

<script setup lang="ts">
import AgoraRTC, { IRemoteAudioTrack, IRemoteVideoTrack, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import { TYPE } from "vue-toastification";

const props = defineProps<{ options: AgoraOptions }>();
const emits = defineEmits<{
    (e: "leave", role: "host" | "audience"): void;
    (e: "joined", role: "host" | "audience"): void;
}>();
const { stream } = useStreamStore();

const remoteVideoTrack = ref<IRemoteVideoTrack>();
const remoteAudioTrack = ref<IRemoteAudioTrack>();

const localVideoTrack = ref<ILocalVideoTrack>();
const localAudioTrack = ref<ILocalAudioTrack>();
const localScreenTrack = ref<ILocalVideoTrack>(); //for share screen

const remoteUid = ref("");
const shareScreen = ref(false);
const toogleButtons = computed(() => [
    {
        state: localAudioTrack.value?.muted,
        iconOn: "material-symbols:mic-rounded",
        iconOff: "material-symbols:mic-off-rounded",
        callback: () => toogleMic(),
    },
    {
        state: localVideoTrack.value?.muted,
        iconOn: "material-symbols:video-camera-front",
        iconOff: "material-symbols:video-camera-front-off",
        callback: () => toogleCamera(),
    },
    {
        state: shareScreen.value,
        iconOn: "mdi:monitor-share",
        iconOff: "mdi:monitor-off",
        callback: () => toogleScreen(),
    },
]);

const agoraEngine = AgoraRTC.createClient({ mode: "live", codec: "vp9" });

watch(stream, async (val) => {
    //force kick if host is leaving
    if (val == null) await leaveStream();
});

onMounted(async () => {
    const mediaDevices = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    if (!mediaDevices) createToast("no audio/video found or permission not granted", TYPE.ERROR);

    await joinStream();
    emits("joined", props.options.role);

    //audience subscribe published audio/video from host
    agoraEngine.on("user-published", async (user, mediaType) => {
        await agoraEngine.subscribe(user, mediaType);

        if (mediaType == "video") {
            remoteVideoTrack.value = user.videoTrack;
            remoteUid.value = user.uid.toString();

            if (props.options.role == "audience") {
                remoteVideoTrack.value?.play("remotePlayerContainer");
            }
        }
        if (mediaType == "audio") {
            remoteAudioTrack.value = user.audioTrack;
            remoteAudioTrack.value?.play();
        }
    });
});

async function joinStream() {
    await agoraEngine.setClientRole(props.options.role);
    await agoraEngine.join(props.options.appId, props.options.channel, props.options.token, props.options.uid);

    //host publish audio/video
    if (props.options.role == "host") {
        localAudioTrack.value = await AgoraRTC.createMicrophoneAudioTrack();
        localVideoTrack.value = await AgoraRTC.createCameraVideoTrack();

        await agoraEngine.publish([localAudioTrack.value, localVideoTrack.value]);
        localAudioTrack.value.setMuted(false);
        localVideoTrack.value.play("localPlayerContainer");
    }
}

async function leaveStream() {
    localAudioTrack.value?.close();
    localVideoTrack.value?.close();

    await agoraEngine.leave();
    emits("leave", props.options.role);
}

async function toogleMic() {
    if (localAudioTrack.value) {
        await localAudioTrack.value.setMuted(!localAudioTrack.value.muted);
    }
}

async function toogleCamera() {
    if (localVideoTrack.value) {
        await localVideoTrack.value.setMuted(!localVideoTrack.value.muted);
    }
}

async function toogleScreen() {
    if (shareScreen.value) {
        localScreenTrack.value?.stop();
        localVideoTrack.value?.play("localPlayerContainer");
        shareScreen.value = false;
    } else {
        //start a share screen
        localScreenTrack.value = (await AgoraRTC.createScreenVideoTrack({}, "enable"))[0];
        localVideoTrack.value?.stop();
        localScreenTrack.value.play("localPlayerContainer");
        shareScreen.value = true;
    }
}
</script>
