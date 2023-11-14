<template>
    <div>
        <UILoader v-if="pending" />
        <div class="flex-between flex-col md:flex-row mb-12 text-base md:text-lg">
            <div class="flex-between flex-col md:flex-row mb-8 w-full">
                <h1 class="font-semibold">Settings {{ !isOwner ? `(View Only)` : "" }}</h1>
                <div v-if="!isOwner" class="border-2 p-2 rounded-md">
                    <p>
                        Your Role:
                        <span class="text-success font-semibold">{{ loggedParticipant?.role || "co-organizer" }}</span>
                    </p>
                    <p>
                        Owner:
                        <span
                            class="cursor-pointer text-success font-semibold"
                            @click="navigateTo(`/profile/${event?.data.event.owner._id}`)"
                        >
                            {{ event?.data.event.owner.username }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="space-y-12">
            <OrganizerSettingsDetail :is_owner="isOwner" />
            <div class="divider"></div>
            <OrganizerSettingsLocation :is_owner="isOwner" />
            <div class="divider"></div>
            <OrganizerSettingsGallery :is_owner="isOwner" />
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
                    <button v-if="isOwner" @click="tooglePublicity" type="button" class="btn btn-error w-fit">
                        <Icon name="solar:eye-bold" class="w-5 h-5 mr-2" />
                        {{ eventDetail?.is_published ? "Unpublish" : "Publish" }} Event
                    </button>
                    <span class="font-semibold" :class="eventDetail?.is_published ? 'text-success' : 'text-error'">
                        Status: {{ eventDetail?.is_published ? "Open" : "Closed" }}
                    </span>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const config = useRuntimeConfig();
const { loggedParticipant } = useParticipantStore();
const { loggedUser } = useAuthStore();
const { eventDetail, getEventDetail, toogleEventPublicity } = useEventStore();
const { pending, mutate } = useMutate(toogleEventPublicity);

const { data: event } = await useAsyncData("getEventDetail", () => getEventDetail(route.params.id as string));

const isOwner = computed(() => loggedUser.value?._id == event.value?.data.event.owner._id);
if (event.value) {
    eventDetail.value = event.value.data.event;
}

const linkUrl = config.public.baseURL + "/event/" + route.params.id;

useServerSeoMeta({
    ogTitle: eventDetail.value?.name || "Eventador",
    ogDescription: eventDetail.value?.description.slice(0, 150) + "..." || "click this link to join event",
    ogImage: eventDetail.value?.banner || "/images/default-event.jpg",
    ogUrl: linkUrl,
});

function copyLink() {
    navigator.clipboard.writeText(linkUrl);
    createToast("event URL copied", TYPE.SUCCESS);
}

async function tooglePublicity() {
    const res = await mutate(route.params.id as string);
    if (res.status && res.data && eventDetail.value) {
        eventDetail.value.is_published = res.data.data.is_published;
    }
}
</script>
