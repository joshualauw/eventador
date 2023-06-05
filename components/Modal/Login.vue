<template>
    <div class="modal text-black">
        <label class="modal-overlay" for="login-modal"></label>
        <div class="modal-content flex w-full flex-col gap-5 p-7">
            <label for="login-modal" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
            <div class="flex flex-col gap-2">
                <h2 class="text-center text-2xl font-semibold">Sign In</h2>
                <p class="mx-auto max-w-xs text-sm text-content2">Sign in to your account to continue.</p>
            </div>
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
                            <input placeholder="Password here" type="password" class="input max-w-full" />
                        </div>
                    </div>
                    <div class="form-field">
                        <div class="form-control justify-between">
                            <div>
                                <input type="checkbox" class="checkbox mr-1" />
                                Remember me
                            </div>
                            <label class="form-label">
                                <a class="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                            </label>
                        </div>
                    </div>
                    <div class="form-field pt-5">
                        <div class="form-control justify-between">
                            <button type="button" class="btn btn-primary w-full">Sign in</button>
                        </div>
                    </div>
                </div>
                <div class="divider divider-horizontal"></div>
                <div class="items-center justify-center text-xs dark:text-gray-5 sm:px-6 flex gap-2">
                    <span>Don't have an account?</span>
                    <a rel="noopener noreferrer" href="#" class="link link-primary text-xs">Sign up</a>
                </div>
            </section>
        </div>
    </div>
</template>
