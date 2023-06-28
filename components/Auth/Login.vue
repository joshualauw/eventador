<template>
    <section>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Email address</label>
                <input placeholder="example@mail.com" type="email" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">
                    <span>Password</span>
                </label>
                <div class="form-control">
                    <input placeholder="password here" type="password" class="input max-w-full" />
                </div>
            </div>
            <div class="form-field">
                <div class="form-control justify-between">
                    <div>
                        <input type="checkbox" class="checkbox mr-2" />
                        <span class="text-content2">Remember me</span>
                    </div>
                    <label class="form-label">
                        <a class="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                    </label>
                </div>
            </div>
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button @click="emits('saved')" type="button" class="btn btn-primary w-full">Login</button>
                </div>
            </div>
        </div>
        <div class="divider divider-horizontal"></div>
        <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2 mb-1">
            <span class="text-content2">Doesn't have an account?</span>
            <span @click="emits('switch', 'register')" class="link link-primary text-xs">Register</span>
        </div>
        <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
            <span class="text-content2">verify an account?</span>
            <span @click="emits('switch', 'verify')" class="link link-primary text-xs">Verify</span>
        </div>
    </section>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "saved"): void; (e: "switch", to: string): void }>();
</script>
