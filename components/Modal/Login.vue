<template>
    <UIModal v-slot="{ setOpen }" modal-id="login-modal">
        <div class="flex flex-col gap-2 mb-6">
            <h2 class="text-center text-2xl text-content1 font-semibold">{{ activeTab.title }}</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">{{ activeTab.tip }}</p>
        </div>
        <component :is="activeTab.component" @saved="setOpen(false)" @switch="switchTab" />
    </UIModal>
</template>

<script setup lang="ts">
const AuthLogin = shallowRef(resolveComponent("AuthLogin"));
const AuthRegister = shallowRef(resolveComponent("AuthRegister"));
const AuthVerify = shallowRef(resolveComponent("AuthVerify"));

const tabs = [
    {
        id: "login",
        title: "Login",
        tip: "Login to your account to continue",
        component: AuthLogin,
    },
    {
        id: "register",
        title: "Register",
        tip: "Create a new account",
        component: AuthRegister,
    },
    {
        id: "verify",
        title: "Verify Account",
        tip: "Check your email for verification code",
        component: AuthVerify,
    },
];
const activeTab = ref(tabs[0]);

function switchTab(to: string) {
    const tab = tabs.find((tab) => tab.id == to);
    if (tab) activeTab.value = tab;
}
</script>
