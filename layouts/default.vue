<template>
    <Html :data-theme="theme">
        <main class="min-h-screen bg-backgroundPrimary">
            <slot />
        </main>
    </Html>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
const theme = computed(() => loggedUser.value?.preferences.theme || "light");
</script>
