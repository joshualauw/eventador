<template>
    <section>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Email</label>
                <div class="flex-center space-x-1">
                    <input
                        v-model="verifyState.email"
                        placeholder="mail@example.com"
                        type="email"
                        class="input max-w-full"
                    />
                    <button class="btn btn-solid-secondary">Resend</button>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Code</label>
                <input
                    v-model="verifyState.code"
                    type="text"
                    placeholder="Verification Code.."
                    class="input max-w-full"
                />
            </div>
            <div class="form-control justify-between">
                <button @click="mutate(verifyState)" type="button" class="btn btn-primary w-full">Activate</button>
            </div>
        </div>
        <UIErrors v-if="error" :errors="errors" :message="error.message" class="mt-8" />
        <div class="divider divider-horizontal"></div>
        <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span class="text-content2">Account activated?</span>
            <span @click="emits('switch', 'login')" class="link link-primary text-xs">login</span>
        </div>
    </section>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "saved"): void; (e: "switch", to: string): void }>();

const verifyState = reactive({
    code: "",
    email: "",
});

const { activate } = useAuthStore();
const { errors, mutate, error } = useMutate(activate);
</script>
