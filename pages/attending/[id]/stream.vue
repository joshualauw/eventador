<template>
    <p class="mb-4 text-lg font-semibold">Welcome, {{ loggedParticipant?.user_id.username }}</p>
    <div class="flex">
        <AttendingStreamScreen @joined="addParticipant" @leave="removeParticipant" :options="options" />
    </div>
    <p class="text-error mt-8 text-sm">*if video are not showing, try to refresh the page</p>
</template>

<script setup lang="ts">
import { doc, getFirestore, setDoc, arrayUnion, getDoc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";

definePageMeta({
    layout: "stream",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const config = useRuntimeConfig();
const { subscribe } = useStreamStore();
const { loggedParticipant, getLivestreamToken } = useParticipantStore();

const { data: token } = await useAsyncData("getLivestreamToken", () =>
    getLivestreamToken(route.params.id as string, loggedParticipant.value?._id || "")
);

const options: AgoraOptions = {
    appId: config.public.agora_appId,
    uid: loggedParticipant.value?._id || "",
    role: loggedParticipant.value?.type == "owner" ? "host" : "audience",
    channel: route.params.id as string,
    token: token.value?.data || "",
};

onMounted(async () => subscribe(route.params.id as string));

async function addParticipant(role: "host" | "audience") {
    const roomDoc = doc(getFirestore(), "rooms", route.params.id as string);
    const room = await getDoc(roomDoc);
    const newChat = {
        id: genId(6),
        content: loggedParticipant.value?.user_id.username + " has joined the stream",
        type: "bot",
    };

    //host start a stream
    if (!room.exists() && options.role == "host") {
        await setDoc(roomDoc, {
            id: route.params.id as string,
            participants: [loggedParticipant.value],
            chats: [newChat],
        });
    }
    //audience join
    if (room.exists() && options.role == "audience") {
        await updateDoc(roomDoc, {
            participants: arrayUnion(loggedParticipant.value),
            chats: arrayUnion(newChat),
        });
    }
}

async function removeParticipant(role: "host" | "audience") {
    const roomDoc = doc(getFirestore(), "rooms", route.params.id as string);
    const room = await getDoc(roomDoc);
    //host leave stream, ends stream for all
    if (role == "host") {
        await deleteDoc(roomDoc);
    }
    //audience left
    if (role == "audience" && room.exists()) {
        await updateDoc(roomDoc, {
            participants: arrayRemove(loggedParticipant.value),
            chats: arrayUnion({
                id: genId(6),
                content: loggedParticipant.value?.user_id.username + " has left the stream",
                type: "bot",
            }),
        });
    }
    navigateTo({ path: `/attending/${route.params.id}`, replace: true });
}
</script>
