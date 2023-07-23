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
                    v-if="options.role == 'host'"
                    @click="toogleMic"
                    class="btn btn-circle w-12 h-12 p-2"
                    :class="localAudioTrack?.muted ? 'btn-solid-error' : 'btn-solid-secondary'"
                >
                    <Icon
                        :name="
                            localAudioTrack?.muted ? 'material-symbols:mic-off-rounded' : 'material-symbols:mic-rounded'
                        "
                        class="w-6 h-6"
                    />
                </button>
                <button
                    v-if="options.role == 'host'"
                    @click="toogleCamera"
                    class="btn btn-circle w-12 h-12 p-2"
                    :class="localVideoTrack?.muted ? 'btn-solid-error' : 'btn-solid-secondary'"
                >
                    <Icon
                        :name="
                            localVideoTrack?.muted
                                ? 'material-symbols:video-camera-front-off'
                                : 'material-symbols:video-camera-front'
                        "
                        class="w-6 h-6"
                    />
                </button>
                <label for="leave-stream-modal" class="btn btn-circle btn-solid-error w-12 h-12 p-2">
                    <Icon name="material-symbols:call-end" class="w-6 h-6" />
                </label>
            </div>
            <div>
                <Icon name="material-symbols:person" class="w-6 h-6" />
                <span>{{ stream?.participants.length }} participant(s)</span>
            </div>
        </div>
        <AttendingModalStreamLeave
            @leave="leaveStream"
            :host_label="options.role == 'host' ? 'End stream now? all participants will automatically kicked out' : ''"
        />
    </div>
</template>

<script setup lang="ts">
import AgoraRTC, { IRemoteAudioTrack, IRemoteVideoTrack, ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";

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

const remoteUid = ref("");

const agoraEngine = AgoraRTC.createClient({ mode: "live", codec: "vp9" });

watch(stream, async (val) => {
    //force leave if host is leaving
    if (val == null) await leaveStream();
});

onMounted(async () => {
    await joinStream();
    emits("joined", props.options.role);

    agoraEngine.on("user-published", async (user, mediaType) => {
        await agoraEngine.subscribe(user, mediaType);

        if (mediaType == "video" && user.videoTrack && user.audioTrack) {
            remoteVideoTrack.value = user.videoTrack;
            remoteAudioTrack.value = user.audioTrack;
            remoteUid.value = user.uid.toString();

            if (props.options.role != "host") {
                localVideoTrack.value?.stop();
                remoteVideoTrack.value.play("remotePlayerContainer");
            }
        }
        if (mediaType == "audio" && user.audioTrack) {
            remoteAudioTrack.value = user.audioTrack;
            remoteAudioTrack.value.play();
        }
    });

    agoraEngine.on("user-unpublished", (user) => console.log(user.uid + " has left the channel"));
});

async function joinStream() {
    await agoraEngine.setClientRole(props.options.role);
    await agoraEngine.join(props.options.appId, props.options.channel, props.options.token, props.options.uid);

    localAudioTrack.value = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrack.value = await AgoraRTC.createCameraVideoTrack();

    if (props.options.role == "host") {
        await agoraEngine.publish([localAudioTrack.value, localVideoTrack.value]);
        localVideoTrack.value.play("localPlayerContainer");
        remoteVideoTrack.value?.stop();
    }
}

async function leaveStream() {
    localAudioTrack.value?.close();
    localVideoTrack.value?.close();

    await agoraEngine.leave();
    console.log("you leave the channel");
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
</script>