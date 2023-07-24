<template>
    <section>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Email address</label>
                <input
                    v-model="registerState.email"
                    placeholder="example@mail.com"
                    type="email"
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Username</label>
                <input v-model="registerState.username" placeholder="username" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    <span>Password</span>
                </label>
                <div class="form-control">
                    <input
                        v-model="registerState.password"
                        placeholder="password here"
                        type="password"
                        class="input max-w-full"
                    />
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">
                    <span>Password Confirmation</span>
                </label>
                <div class="form-control">
                    <input
                        v-model="registerState.confirm_password"
                        placeholder="password confirmation here"
                        type="password"
                        class="input max-w-full"
                    />
                </div>
            </div>
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button
                        @click="doRegister"
                        type="button"
                        class="btn btn-primary w-full"
                        :class="{ 'btn-loading': pending }"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
        <UIErrors v-if="error" :errors="errors" :message="error.message" class="mt-8" />
        <div class="divider divider-horizontal"></div>
        <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span class="text-content2">Already have an account?</span>
            <span @click="emits('switch', 'login')" class="link link-primary text-xs">login</span>
        </div>
    </section>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "saved"): void; (e: "switch", to: string): void }>();

const registerState = reactive({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
});

const { register } = useAuthStore();
const { errors, mutate, error, pending } = useMutate(register);

async function doRegister() {
    const res = await mutate(registerState);
    if (res.status) {
        emits("switch", "verify");
    }
}
</script>
