<template>
    <div class="flex-box flex-col h-[500px] bg-backgroundSecondary shadow-md">
        <h2 v-if="!stream" class="text-center text-lg font-semibold text-content1 mb-5">Stream haven't started yet</h2>
        <div v-if="loggedParticipant?.type == 'owner'">
            <button @click="startStream" class="btn btn-primary w-full">Host Stream</button>
        </div>
        <div v-if="stream && loggedParticipant?.type != 'owner'" class="space-y-5">
            <h2 class="text-center text-xl font-semibold text-content1">Join Stream?</h2>
            <div class="avatar-group mx-auto">
                <div v-for="par in stream.participants.slice(0, 4)" class="avatar">
                    <img :src="par.user_id.profile || 'https://i.pravatar.cc/150?u=a042581f4e29026024d'" alt="avatar" />
                </div>
                <div v-if="stream.participants.length > 4" class="avatar">
                    <div>+{{ stream.participants.length - 4 }}</div>
                </div>
            </div>
            <p class="text-content2 text-center">{{ stream.participants.length }} people have joined</p>
            <button @click="startStream" class="btn btn-primary w-full">Join Now</button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { stream, subscribe } = useStreamStore();
const { loggedParticipant } = useParticipantStore();

onMounted(() => subscribe(route.params.id as string));

function startStream() {
    navigateTo(`/attending/${route.params.id}/stream`);
}
</script>
