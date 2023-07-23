<template>
    <UILoader v-if="pending" />
    <div>
        <div class="flex-between flex-col lg:flex-row gap-3">
            <div class="flex-center space-x-5 lg:space-x-12 text-center lg:text-left">
                <div class="flex space-x-3 text-sm cursor-pointer">
                    <div class="avatar avatar-md lg:avatar-lg avatar-ring">
                        <img :src="userDetail?.data.user.profile || '/images/default-user.png'" alt="avatar" />
                    </div>
                    <div class="hidden lg:block">
                        <p class="font-bold text-lg">{{ userDetail?.data.user.username }}</p>
                        <p class="text-content2">{{ userDetail?.data.user.email }}</p>
                    </div>
                </div>
                <span class="font-semibold text-base lg:text-lg">{{ userDetail?.data.userEvents.length }} Events</span>
                <span class="font-semibold text-base lg:text-lg">
                    {{ userDetail?.data.user.followers.length }} Followers
                </span>
                <span class="font-semibold text-base lg:text-lg">
                    {{ userDetail?.data.user.followings.length }} Followings
                </span>
            </div>
            <button
                v-if="userDetail?.data.user._id !== loggedUser?._id"
                @click="doFollowUser"
                class="btn btn-sm w-full lg:w-fit lg:btn-md"
                :class="userDetail?.data.user.is_followed ? 'btn-error' : 'btn-primary'"
            >
                {{ userDetail?.data.user.is_followed ? "Unfollow" : "Follow" }}
            </button>
        </div>
        <div class="card hover:scale-100 mt-8">
            <div class="card-body p-6">
                <div class="tabs">
                    <div
                        v-for="(tab, i) in tabs"
                        @click="activeTab = i"
                        class="tab tab-bordered px-4 lg:px-8"
                        :class="{ 'tab-active': i == activeTab }"
                    >
                        {{ tab.name }}
                    </div>
                </div>
                <div class="mt-4">
                    <div v-if="activeTab == 0">
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ExploreItem
                                v-for="event in userDetail?.data.userEvents"
                                :key="event._id"
                                :id="event._id"
                                :name="event.name"
                                :price="event.price"
                                :category="event.category"
                                :slot="event.capacity"
                                :location_name="event.location.venue"
                                :banner="event.banner"
                                :date="event.start_date"
                            />
                        </div>
                        <p v-if="userDetail?.data.userEvents.length == 0" class="text-content-2">
                            -user have no created events-
                        </p>
                    </div>
                    <div v-if="activeTab == 1">
                        <NuxtLink
                            v-for="follower in userDetail?.data.user.followers"
                            :to="`/profile/${follower._id}`"
                            class="card hover:scale-100 h-fit cursor-pointer"
                        >
                            <div class="card-body p-4 flex-row flex-center hover:bg-slate-3 relative">
                                <div class="avatar avatar-ring">
                                    <img :src="follower.profile || '/images/default-user.png'" alt="avatar" />
                                </div>
                                <p class="font-semibold">{{ follower.username }}</p>
                            </div>
                        </NuxtLink>
                        <p v-if="userDetail?.data.user.followers.length == 0" class="text-content-2">
                            -user have no followers-
                        </p>
                    </div>
                    <div v-if="activeTab == 2">
                        <NuxtLink
                            v-for="following in userDetail?.data.user.followings"
                            :to="`/profile/${following._id}`"
                            class="card hover:scale-100 h-fit cursor-pointer"
                        >
                            <div class="card-body p-4 flex-row flex-center hover:bg-slate-3 relative">
                                <div class="avatar avatar-ring">
                                    <img :src="following.profile || '/images/default-user.png'" alt="avatar" />
                                </div>
                                <p class="font-semibold">{{ following.username }}</p>
                            </div>
                        </NuxtLink>
                        <p v-if="userDetail?.data.user.followings.length == 0" class="text-content-2">
                            -user have no followings-
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const tabs = [{ name: "Events" }, { name: "Followers" }, { name: "Followings" }];
const activeTab = ref(0);

const route = useRoute();
const { getOneUser, followUser, loggedUser } = useAuthStore();
const { pending, mutate } = useMutate(followUser);

const { data: userDetail, refresh } = await useAsyncData("getOneUser", () => getOneUser(route.params.id as string));

async function doFollowUser() {
    const res = await mutate(route.params.id as string);
    if (res.status) {
        refresh();
    }
}
</script>
