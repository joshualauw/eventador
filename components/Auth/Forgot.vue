<template>
    <section>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Email</label>
                <div class="flex-center space-x-1">
                    <input v-model="resetState.email" placeholder="mail@example.com" type="email" class="input" />
                    <button
                        @click="doResend"
                        class="btn btn-solid-secondary w-1/3"
                        :class="{ 'btn-loading': resendPending }"
                    >
                        sent code
                    </button>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">New Password</label>
                <input
                    v-model="resetState.password"
                    type="password"
                    placeholder="new password.."
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Confirm New Password</label>
                <input
                    v-model="resetState.confirm_password"
                    type="password"
                    placeholder="confirm new password.."
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Token</label>
                <input
                    v-model="resetState.token"
                    type="text"
                    placeholder="reset password token.."
                    class="input max-w-full"
                />
            </div>

            <div class="form-control justify-between">
                <button
                    @click="doReset"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Reset
                </button>
            </div>
        </div>
        <UIErrors v-if="error" :errors="errors" :message="error.message" class="mt-8" />
        <div class="divider divider-horizontal"></div>
        <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span @click="emits('switch', 'login')" class="link link-primary text-xs">back to login</span>
        </div>
    </section>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "saved"): void; (e: "switch", to: string): void }>();

const resetState = reactive({
    email: "",
    password: "",
    confirm_password: "",
    token: "",
});

const { resetPass, resendPasswordToken } = useAuthStore();
const { errors, mutate, error, pending } = useMutate(resetPass);
const { mutate: resendMutate, pending: resendPending } = useMutate(resendPasswordToken);

async function doReset() {
    const res = await mutate(resetState);
    if (res.status) {
        emits("switch", "login");
    }
}

async function doResend() {
    errors.value = [];
    error.value = null;

    const res = await resendMutate({ email: resetState.email });

    if (!res.status) {
        error.value = res.error;
        errors.value.push(...res.errors);
    }
}
</script>
