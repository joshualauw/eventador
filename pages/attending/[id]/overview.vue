<template>
    <div>
        <div class="flex flex-col lg:flex-row h-full gap-10">
            <div class="card h-fit hover:scale-100 w-full lg:w-3/4 mx-auto">
                <img
                    :src="eventDetail?.data.event.banner ?? '/images/default-post.png'"
                    alt=""
                    class="w-full h-[225px] md:h-[350px]"
                />
                <div class="card-body space-y-4">
                    <h2 class="card-header">{{ eventDetail?.data.event.name }}</h2>
                    <p v-html="eventDetail?.data.event.overview" class="text-content2"></p>
                    <div class="card-footer flex-col items-start w-full">
                        <p class="card-header mb-4">Participants</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <div
                                v-for="par in eventDetail?.data.eventParticipants"
                                @click="navigateTo(`/profile/${par.user_id._id}`)"
                                class="card hover:scale-100 cursor-pointer shadow-none"
                            >
                                <div class="flex flex-row gap-4 p-4 card-body h-full bg-backgroundPrimary">
                                    <div class="avatar avatar-ring avatar-md">
                                        <img :src="par.user_id.profile ?? '/images/default-user.png'" alt="avatar" />
                                    </div>
                                    <div class="flex flex-col">
                                        <p>
                                            {{ par.user_id.username }}
                                            <span class="text-success text-sm ml-1.5" v-if="par.role">
                                                as {{ par.role }}
                                            </span>
                                        </p>
                                        <p class="text-sm" :class="getBadgeColor(par.type)">{{ par.type }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="loggedParticipant?.type == 'owner' || loggedParticipant?.type == 'organizer'"
                            class="flex space-x-2 w-full justify-end mt-4"
                        >
                            <label for="edit-overview-modal" class="btn btn-solid-secondary">
                                <Icon name="fa:edit" class="mr-2" /> Edit Overview
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AttendingModalOverviewEdit @saved="refresh" :content="eventDetail?.data.event.overview" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { getEventDetail } = useEventStore();
const { loggedParticipant } = useParticipantStore();

const { data: eventDetail, refresh } = await useAsyncData("getEventDetail", () =>
    getEventDetail(route.params.id as string)
);
</script>
