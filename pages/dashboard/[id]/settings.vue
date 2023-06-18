<template>
    <h1 class="font-semibold text-lg mb-8">Settings</h1>
    <div class="space-y-12">
        <OrganizerSettingsDetail />
        <div class="divider"></div>
        <OrganizerSettingsLocation />
        <div class="divider"></div>
        <OrganizerSettingsGallery />
        <div class="divider"></div>
        <div class="flex flex-col md:flex-row md:space-x-5 w-full">
            <div class="block md:hidden mb-8">
                <p class="font-semibold text-xl">Delete Event</p>
                <p class="text-mute">this event and all data related to it will be deleted permanently</p>
            </div>
            <div class="hidden md:block md:w-1/3">
                <p class="font-semibold text-lg">Danger Zone</p>
                <p class="text-content3">this event and all data related to it will be deleted permanently</p>
            </div>
            <form class="w-full flex-row flex-center md:w-2/3 form-group space-x-2">
                <label for="delete-event-modal" type="button" class="btn btn-error w-fit">
                    <Icon name="solar:danger-triangle-bold" class="w-5 h-5 mr-2" /> Delete Event
                </label>
                <label type="button" class="btn btn-warning w-fit">
                    <Icon name="solar:eye-bold" class="w-5 h-5 mr-2" /> Publish Event
                </label>
            </form>
        </div>
    </div>
    <OrganizerModalSettingsDelete id="123" label="event name" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
});
</script>
