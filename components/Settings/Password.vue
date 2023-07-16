<template>
    <UILoader v-if="pending" />
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Change Password</p>
            <p class="text-mute">Update your password associated with this account</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Change Password</p>
            <p class="text-content3">Update your password associated with this account</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Current Password</label>
                <input
                    v-model="passwordState.old_password"
                    placeholder="current password"
                    type="password"
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">New Password</label>
                <input
                    v-model="passwordState.new_password"
                    placeholder="new password"
                    type="password"
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Confirm Password</label>
                <input
                    v-model="passwordState.confirm_password"
                    placeholder="confirm password"
                    type="password"
                    class="input max-w-full"
                />
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button @click="doChangePassword" type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const { value: passwordState, reset } = useStateHandler({
    old_password: "",
    new_password: "",
    confirm_password: "",
});

const { changePassword } = useAuthStore();
const { mutate, pending, error, errors } = useMutate(changePassword);

async function doChangePassword() {
    const res = await mutate(passwordState);
    if (res.status) {
        reset();
    }
}
</script>
