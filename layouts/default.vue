<template>
    <Html :data-theme="loggedUser?.preferences.theme || 'light'">
        <main class="min-h-screen bg-backgroundPrimary">
            <slot />
        </main>
    </Html>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
const token = useCookie("token");

if (token.value && !loggedUser.value) {
    const res = await fetcher<ILogin.Data>("/auth/myself");
    if (res.data) {
        loggedUser.value = res.data;
    }
}

usePusherSubsribe();
</script>
