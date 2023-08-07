<template>
    <UILoader v-if="pending" />
    <Navbar class="px-8 xl:px-24" />
    <div v-if="eventDetail" class="web-container">
        <div class="flex flex-col lg:flex-row">
            <img
                :src="eventDetail.data.event.banner ?? '/images/default-post.png'"
                class="max-h-72 lg:max-h-[525px] w-full rounded-lg border border-backgroundSecondary"
            />
        </div>

        <h1 class="text-xl lg:text-3xl font-extrabold mt-8">{{ eventDetail.data.event.name }}</h1>

        <div class="mt-8 flex flex-col lg:flex-row w-full lg:space-x-16">
            <div class="w-full lg:w-[60%] space-y-8 lg:space-y-10 lg:border-r-2 border-gray-4 lg:pr-16">
                <div class="card hover:scale-100">
                    <div class="card-body flex-row flex-between p-5">
                        <div
                            @click="navigateTo(`/profile/${eventDetail.data.event.owner._id}`)"
                            class="flex-center space-x-4 cursor-pointer"
                        >
                            <div class="avatar">
                                <img :src="eventDetail.data.event.owner.profile ?? '/images/default-user.png'" />
                            </div>
                            <div>
                                <p class="font-bold">
                                    {{ eventDetail.data.event.owner.username }}
                                </p>
                                <p class="text-content2 text-sm mt-1">
                                    {{ eventDetail.data.event.owner.followers_count }} followers
                                </p>
                            </div>
                        </div>
                        <div class="dropdown">
                            <div class="btn btn-circle btn-ghost" tabindex="0">
                                <Icon name="mdi:dots-horizontal" />
                            </div>
                            <div class="dropdown-menu w-20 border dropdown-menu-bottom-left">
                                <label for="report-event-modal" class="dropdown-item text-sm">Report</label>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="text-lg lg:text-xl font-semibold">Description</h2>
                <p v-html="eventDetail.data.event.description" class="text-content2 text-sm lg:text-base"></p>

                <h2 class="text-lg lg:text-xl font-semibold">When & Where</h2>
                <div class="flex flex-col gap-8 lg:flex-row">
                    <div class="flex items-start w-full lg:w-1/3">
                        <div class="p-3 rounded-lg bg-backgroundSecondary mr-3">
                            <icon name="material-symbols:timer" size="20" />
                        </div>
                        <div>
                            <p class="font-bold">Date & Time</p>
                            <p class="text-sm text-content2 mt-1">
                                {{ dayjs(eventDetail.data.event.start_date).format("DD MMM YYYY") }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start w-full lg:w-2/3">
                        <div class="p-3 rounded-lg bg-backgroundSecondary mr-3">
                            <icon name="material-symbols:location-on" size="20" />
                        </div>
                        <div>
                            <p class="font-bold">Location</p>
                            <p class="text-sm text-content2 mt-1">{{ eventDetail.data.event.location?.name || "-" }}</p>
                            <p class="text-sm text-content2 mt-1">
                                Venue: {{ eventDetail.data.event.location?.venue ?? "not specified" }}
                            </p>
                        </div>
                    </div>
                </div>
                <UIMap
                    v-if="eventDetail.data.event.location"
                    :latitude="eventDetail.data.event.location.latitude"
                    :longitude="eventDetail.data.event.location.longitude"
                    class="w-full h-64 lg:h-72 rounded-lg"
                />
                <h2 class="text-xl font-semibold">Image Gallery</h2>
                <div class="flex flex-wrap">
                    <img v-for="img in eventDetail.data.event.gallery" :src="img" class="w-36 h-36 rounded-lg m-4" />
                </div>
            </div>

            <div class="w-full lg:w-[40%] space-y-8 mt-8 lg:mt-0">
                <div class="card hover:scale-100 text-center">
                    <div v-if="!eventDetail.data.event.is_joined" class="card-body">
                        <p class="text-3xl text-success font-bold">
                            Rp. {{ formatNumber(eventDetail.data.event.price) }}
                        </p>
                        <p>{{ eventDetail.data.event.slotLeft }} Slots Left</p>
                        <div v-if="loggedUser">
                            <label for="payment-modal-register" class="btn w-full btn-primary mt-3">Register Now</label>
                            <div class="divider">-or-</div>
                            <div class="flex">
                                <input
                                    v-model="code"
                                    class="input max-w-full rounded-r-none"
                                    placeholder="invitation code.."
                                />
                                <button
                                    @click="doApplyInvite"
                                    type="button"
                                    class="btn btn-solid-primary rounded-l-none"
                                >
                                    Apply
                                </button>
                            </div>
                            <UIErrors
                                v-if="inviteError"
                                :errors="inviteErrors"
                                :message="inviteError.message"
                                class="my-4"
                            />
                        </div>
                    </div>
                    <div v-else class="card-body space-y-3">
                        <p class="text-success text-center">already registered</p>
                        <button @click="navigateTo(`/attending/${eventDetail.data.event._id}`)" class="btn btn-primary">
                            Go to Event
                        </button>
                        <div v-if="loggedUser?._id != eventDetail.data.event.owner._id">
                            <label for="payment-modal-refund" class="btn btn-solid-error w-full flex-center mb-2">
                                <Icon name="ri:refund-2-fill" class="w-5 h-5 mr-2" /> Issue Refund
                            </label>
                            <p class="text-mute">*event can only be refunded within 12 hours of purchase</p>
                        </div>
                    </div>
                </div>
                <h2 class="text-xl font-semibold">Sponsored By</h2>
                <div class="flex flex-wrap">
                    <img
                        v-for="sponsor in eventDetail.data.eventSponsor"
                        :src="sponsor.logo"
                        class="w-28 h-28 rounded-lg m-4"
                    />
                </div>
                <h2 class="text-xl font-semibold">Share Now</h2>
                <div class="flex space-x-3">
                    <div v-for="link in socialMediaLinks" :content="link.tooltip" placement="top">
                        <button @click="link.callback" class="btn btn-circle btn-solid-secondary">
                            <icon :name="link.icon" size="24" />
                        </button>
                    </div>
                </div>
                <h2 class="text-xl font-semibold">Itinenary</h2>
                <EventRundown :itinenaries="eventDetail.data.eventItinenaries" />
            </div>
        </div>
    </div>

    <ModalPayment
        @pay="doRegisterParticipant"
        unique-id="payment-modal-register"
        :amount="eventDetail?.data.event.price ?? 0"
    >
        <div v-if="eventDetail" class="flex space-x-5">
            <img :src="eventDetail.data.event.banner ?? '/images/default-post.png'" class="w-36 h-20 rounded-md" />
            <div class="text-left">
                <p class="font-semibold">{{ eventDetail.data.event.name }}</p>
                <p class="text-warning text-lg">Rp. {{ formatNumber(eventDetail.data.event.price) }}</p>
                <p class="text-content2">Amount: x1</p>
            </div>
        </div>
        <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-4" />
    </ModalPayment>

    <ModalPayment
        @pay="doRefundEvent"
        unique-id="payment-modal-refund"
        message="do you want to refund this event?"
        :amount="eventDetail?.data.event.price ?? 0"
        reverse
    >
        <div v-if="eventDetail" class="flex space-x-5">
            <img :src="eventDetail.data.event.banner ?? '/images/default-post.png'" class="w-36 h-20 rounded-md" />
            <div class="text-left">
                <p class="font-semibold">{{ eventDetail.data.event.name }}</p>
                <p class="text-warning text-lg">Rp. {{ formatNumber(eventDetail.data.event.price) }}</p>
                <p class="text-content2">Amount: x1</p>
            </div>
        </div>
    </ModalPayment>

    <ModalReportEvent v-if="eventDetail" :id="($route.params.id as string)" :label="eventDetail?.data.event.name" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

const socialMediaLinks = [
    {
        tooltip: "Copy Link",
        icon: "material-symbols:share",
        callback: () => {
            navigator.clipboard.writeText(linkUrl);
            createToast("event URL copied", TYPE.SUCCESS);
        },
    },
    {
        tooltip: "Facebook Share",
        icon: "mdi:facebook",
        callback: () => {},
    },
    {
        tooltip: "Whatsapp Share",
        icon: "mdi:whatsapp",
        callback: () => {},
    },
];

const code = ref("");

const route = useRoute();
const { loggedUser, getMe } = useAuthStore();
const { getEventDetail, refundEvent } = useEventStore();
const { registerParticipant, applyInvite } = useParticipantStore();

const { pending, error, errors, mutate: registerMutate } = useMutate(registerParticipant);
const { mutate: inviteMutate, error: inviteError, errors: inviteErrors } = useMutate(applyInvite);
const { mutate: refundMutate } = useMutate(refundEvent);

const { data: eventDetail, refresh } = await useAsyncData("getEventDetail", () =>
    getEventDetail(route.params.id as string)
);
const linkUrl = useRuntimeConfig().public.baseURL + "/event/" + route.params.id;

useHead({
    meta: [
        { property: "og:title", content: eventDetail.value?.data.event.name },
        { property: "og:description", content: "Join to our event!" },
        { property: "og:image", content: eventDetail.value?.data.event.banner || "" },
        { property: "og:url", content: linkUrl },
    ],
});

async function doRegisterParticipant() {
    const res = await registerMutate(route.params.id as string);
    if (res.status) {
        await getMe();
        refresh();
    }
}

async function doApplyInvite() {
    pending.value = true;

    const res = await inviteMutate(route.params.id as string, { code: code.value });
    if (res.status) {
        await getMe();
        refresh();
    }
    pending.value = false;
}

async function doRefundEvent() {
    pending.value = true;

    const res = await refundMutate(route.params.id as string);
    if (res.status) {
        await getMe();
        refresh();
    }
    pending.value = false;
}
</script>
