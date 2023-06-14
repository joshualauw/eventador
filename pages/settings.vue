<template>
    <div class="space-y-12">
        <div class="flex space-x-5 w-full">
            <div class="w-1/3">
                <p class="font-semibold text-lg">Personal Information</p>
                <p class="text-content3">Use a permanent address where you can receive email</p>
            </div>
            <form class="w-2/3 form-group space-y-4">
                <div class="form-group">
                    <label class="form-label">Profile Photo</label>
                    <div class="flex-center space-x-5">
                        <div class="shrink-0">
                            <img
                                class="object-cover w-20 h-20 rounded-full"
                                src="/images/default-camera.png"
                                alt="profile_photo"
                            />
                        </div>
                        <label class="block">
                            <span class="sr-only">Choose File</span>
                            <input
                                type="file"
                                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </label>
                    </div>
                </div>
                <div class="form-field">
                    <label class="form-label">Username</label>
                    <input placeholder="username" type="text" class="input max-w-full" />
                </div>
                <div class="form-field">
                    <label class="form-label">Email Address</label>
                    <input placeholder="mail@example.com" type="email" class="input max-w-full" />
                </div>
                <div class="form-field">
                    <label class="form-label">Timezone</label>
                    <select class="select">
                        <option value="all">Pacific Standard Time</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary w-fit">Save</button>
            </form>
        </div>
        <div class="divider"></div>
        <div class="flex space-x-5 w-full">
            <div class="w-1/3">
                <p class="font-semibold text-lg">Change Password</p>
                <p class="text-content3">Update your password associated with this account</p>
            </div>
            <form class="w-2/3 form-group space-y-4">
                <div class="form-field">
                    <label class="form-label">Current Password</label>
                    <input placeholder="current password" type="password" class="input max-w-full" />
                </div>
                <div class="form-field">
                    <label class="form-label">New Password</label>
                    <input placeholder="new password" type="password" class="input max-w-full" />
                </div>
                <div class="form-field">
                    <label class="form-label">Confirm Password</label>
                    <input placeholder="confirm password" type="password" class="input max-w-full" />
                </div>
                <button type="button" class="btn btn-primary w-fit">Save</button>
            </form>
        </div>
        <div class="divider"></div>
        <div class="flex space-x-5 w-full">
            <div class="w-1/3">
                <p class="font-semibold text-lg">Delete Account</p>
                <p class="text-content3">this account and all data related to it will be deleted permanently</p>
            </div>
            <form class="w-2/3 form-group space-y-4">
                <label for="delete-account-modal" type="button" class="btn btn-error w-fit">
                    <Icon name="solar:danger-triangle-bold" class="w-5 h-5 mr-2" /> Delete Account
                </label>
            </form>
        </div>
    </div>
    <ModalAccountDelete id="123" label="account" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});
</script>
