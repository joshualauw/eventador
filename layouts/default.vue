<template>
    <Html :data-theme="loggedUser?.preferences.theme || 'light'">
        <main class="min-h-screen bg-backgroundPrimary">
            <slot />
        </main>
    </Html>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();

usePusherSubsribe();
</script>
