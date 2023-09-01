<template>
    <aside class="w-full max-w-[22rem] bg-blue-3 p-2 flex flex-col">
        <h1 class="text-lg text-white font-bold flex-center justify-center">
            <Icon name="material-symbols:android-messages" class="mr-2 w-6 h-6" />
            <span class="mr-4">Live Chat</span>
        </h1>
        <div class="mt-8 h-[400px] md:h-full px-4 space-y-4 overflow-y-auto">
            <div v-for="chat in stream?.chats" class="w-fit">
                <p v-if="chat.type == 'bot'" class="badge badge-sm badge-flat-primary">{{ chat.content }}</p>
                <div v-else class="p-1">
                    <p class="text-white font-semibold">{{ chat.username }}</p>
                    <p class="text-sm text-gray-300">{{ chat.content }}</p>
                </div>
            </div>
        </div>
        <div class="divider mt-12"></div>
        <div class="flex-center space-x-2 px-4 mb-8 mt-4">
            <input ref="sender" v-model="newMessage" type="text" class="input" placeholder="send a message.." />
            <button @click="sendMessage" :disabled="!newMessage" class="btn btn-sm btn-primary">
                <Icon name="material-symbols:send" class="w-5 h-5" />
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";

const route = useRoute();
const { loggedParticipant } = useParticipantStore();
const { stream, subscribe } = useStreamStore();
const newMessage = ref("");
const sender = ref();

onMounted(() => subscribe(route.params.id as string));

async function sendMessage() {
    const roomDoc = doc(getFirestore(), "rooms", route.params.id as string);
    await updateDoc(roomDoc, {
        chats: arrayUnion({
            id: genId(6),
            username: loggedParticipant.value?.user_id.username,
            content: newMessage.value,
            type: "user",
        }),
    });
    newMessage.value = "";
    sender.value.focus();
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background-color: rgb(var(--backgroundSecondary) / var(--tw-bg-opacity));
}

::-webkit-scrollbar-thumb {
    background-color: #69717451;
    border-radius: 5px;
    border: 1px solid transparent;
    background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #303a3b2c;
}
</style>
