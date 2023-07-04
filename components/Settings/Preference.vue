<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Preferences</p>
            <p class="text-mute">Switch Theme to your likings and control system notifications</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Preferences</p>
            <p class="text-content3">Switch Theme to your likings and control system notifications</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Theme</label>
                <select v-model="colorMode.value" class="select max-w-full">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div class="form-field">
                <label class="form-label">Notifications</label>
                <div class="flex flex-col">
                    <span> <input type="checkbox" class="mr-1" /> New Follower</span>
                    <span> <input type="checkbox" class="mr-1" /> Followed users new event</span>
                    <span> <input type="checkbox" class="mr-1" /> User joined event</span>
                    <span> <input type="checkbox" class="mr-1" /> Track Transaction History</span>
                </div>
            </div>
            <button type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
</script>
