<template>
    <UILoader v-if="pending" />
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
                <p class="font-semibold text-xl">Danger Zone</p>
                <p class="text-mute">change event publicity, if published event can be viewed by other users</p>
            </div>
            <div class="hidden md:block md:w-1/3">
                <p class="font-semibold text-lg">Danger Zone</p>
                <p class="text-content3">change event publicity, if published event can be viewed by other users</p>
            </div>
            <form class="w-full flex-row flex-center md:w-2/3 form-group space-x-2">
                <button @click="tooglePublicity" type="button" class="btn btn-error w-fit">
                    <Icon name="solar:eye-bold" class="w-5 h-5 mr-2" />
                    {{ eventDetail?.is_published ? "Unpublish" : "Publish" }} Event
                </button>
                <span class="font-semibold" :class="eventDetail?.is_published ? 'text-success' : 'text-error'">
                    Status: {{ eventDetail?.is_published ? "Open" : "Closed" }}
                </span>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
    owner: true,
});

const route = useRoute();
const { eventDetail, getEventDetail, toogleEventPublicity } = useEventStore();
const { pending, mutate } = useMutate(toogleEventPublicity);

const { data: event } = await useAsyncData("getEventDetail", () => getEventDetail(route.params.id as string));

if (event.value) {
    eventDetail.value = event.value.data.event;
    console.log(eventDetail.value);
}

async function tooglePublicity() {
    const res = await mutate(route.params.id as string);
    if (res.status && res.data && eventDetail.value) {
        eventDetail.value.is_published = res.data.data.is_published;
    }
}
</script>
