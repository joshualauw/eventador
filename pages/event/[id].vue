<template>
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
                                <p>
                                    By: <span class="font-bold">{{ eventDetail.data.event.owner.username }}</span>
                                </p>
                                <p class="text-content2 text-sm mt-1">
                                    {{ eventDetail.data.event.owner.followers_count }} followers
                                </p>
                            </div>
                        </div>
                        <button class="btn btn-solid-secondary">Follow +</button>
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
                            <p class="text-sm text-content2 mt-1">{{ eventDetail.data.event.location.name }}</p>
                            <p class="text-sm text-content2 mt-1">Venue: {{ eventDetail.data.event.location.venue }}</p>
                        </div>
                    </div>
                </div>
                <UIMap
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
                    <div class="card-body">
                        <p class="text-3xl text-success font-bold">
                            Rp. {{ formatNumber(eventDetail.data.event.price) }}
                        </p>
                        <p>{{ eventDetail.data.event.slotLeft }} Slots Left</p>
                        <label for="payment-modal" class="btn btn-primary mt-3">Register Now</label>
                        <div class="divider">-or-</div>
                        <div class="flex">
                            <input class="input max-w-full rounded-r-none" placeholder="invitation code.." />
                            <button type="button" class="btn btn-solid-primary rounded-l-none">Apply</button>
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
    <ModalPayment>
        <div class="flex space-x-4">
            <img src="/images/default-post.png" class="w-32 h-20 rounded-md" />
            <div class="text-left">
                <p class="font-semibold">Maximizing Productivity At Work</p>
                <p class="text-warning text-lg">Rp. 25.000</p>
                <p class="text-content2">Amount: x1</p>
            </div>
        </div>
    </ModalPayment>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const socialMediaLinks = [
    {
        tooltip: "Copy Link",
        icon: "material-symbols:share",
        callback: () => {},
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

const route = useRoute();
const { getEventDetail } = useEventStore();
const { data: eventDetail } = await useAsyncData("getEventDetail", () => getEventDetail(route.params.id as string));
console.log(eventDetail.value);
</script>
