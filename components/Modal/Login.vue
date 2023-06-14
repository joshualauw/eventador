<template>
    <UIModal v-slot="{ setOpen }" modal-id="login-modal">
        <div class="flex flex-col gap-2 mb-6">
            <h2 class="text-center text-2xl text-content1 font-semibold">{{ isLogin ? "Login" : "Register" }}</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">
                {{ isLogin ? "Login to your account to continue" : "Create a new account" }}
            </p>
        </div>
        <section v-if="isLogin">
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
                        <button @click="setOpen(false)" type="button" class="btn btn-primary w-full">Login</button>
                    </div>
                </div>
            </div>
            <div class="divider divider-horizontal"></div>
            <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
                <span class="text-content2">Doesn't have an account?</span>
                <span @click="isLogin = false" class="link link-primary text-xs">Register</span>
            </div>
        </section>
        <section v-else>
            <div class="form-group">
                <div class="form-field">
                    <label class="form-label">Email address</label>
                    <input placeholder="example@mail.com" type="email" class="input max-w-full" />
                </div>
                <div class="form-field">
                    <label class="form-label">Username</label>
                    <input placeholder="username" type="text" class="input max-w-full" />
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
                    <label class="form-label">
                        <span>Password Confirmation</span>
                    </label>
                    <div class="form-control">
                        <input placeholder="password confirmation here" type="password" class="input max-w-full" />
                    </div>
                </div>
                <div class="form-field pt-5">
                    <div class="form-control justify-between">
                        <button @click="setOpen(false)" type="button" class="btn btn-primary w-full">Register</button>
                    </div>
                </div>
            </div>
            <div class="divider divider-horizontal"></div>
            <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
                <span class="text-content2">Already have an account?</span>
                <span @click="isLogin = true" class="link link-primary text-xs">login</span>
            </div>
        </section>
    </UIModal>
</template>

<script setup lang="ts">
const isLogin = ref(true);
</script>
