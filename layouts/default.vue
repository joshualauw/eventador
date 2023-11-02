<template>
    <Html :data-theme="theme">
        <main class="min-h-screen max-w-full bg-backgroundPrimary">
            <slot />
        </main>
    </Html>
    <!-- <div v-else class="bg-gray-100 w-screen min-h-screen text-center">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-center flex-col">
            <svg class="animate-spin h-10 w-10 bg-gray-600 mb-5" viewBox="0 0 24 24"></svg>
            <p class="text-lg md:text-2xl font-bold">Please wait while our website is warming up</p>
            <p class="text-sm md:text-base">this should not take more than 1 minute</p>
        </div>
    </div> -->
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
const theme = computed(() => loggedUser.value?.preferences.theme || "light");
// const serverReady = useCookie("serverReady", { maxAge: 14 * 60 });

// async function healthcheck() {
//     const res = await executeRequest("/healthcheck");
//     if (res.data && res.status) {
//         serverReady.value = "yes";
//         console.log(`(server) ${res.data}`);
//     }
// }

// await useAsyncData("healthcheck", () => healthcheck(), {
//     server: false,
//     immediate: serverReady.value != "yes",
// });
</script>
