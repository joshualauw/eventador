<template>
    <UILoader v-if="pending" />
    <div>
        <div class="flex-between gap-3">
            <div class="flex-between space-x-6 lg:space-x-12">
                <div class="flex space-x-3 text-sm cursor-pointer">
                    <div class="avatar avatar-md lg:avatar-lg avatar-ring">
                        <img :src="userDetail?.data.user.profile || '/images/default-user.png'" alt="avatar" />
                    </div>
                    <div class="">
                        <p class="font-bold lg:text-lg">{{ userDetail?.data.user.username }}</p>
                        <p class="lg:text-content2">{{ userDetail?.data.user.email }}</p>
                    </div>
                </div>
                <span class="font-semibold hidden lg:inline text-lg">
                    {{ userDetail?.data.userEvents.length }} Events
                </span>
                <span class="font-semibold hidden lg:inline text-lg">
                    {{ userDetail?.data.user.followers.length }} Followers
                </span>
                <span class="font-semibold hidden lg:inline text-lg">
                    {{ userDetail?.data.user.followings.length }} Followings
                </span>
                <div class="dropdown">
                    <div class="btn btn-circle btn-ghost" tabindex="0">
                        <Icon name="mdi:dots-horizontal" />
                    </div>
                    <div class="dropdown-menu w-20 border dropdown-menu-bottom-left">
                        <label for="report-user-modal" class="dropdown-item text-sm">Report</label>
                    </div>
                </div>
            </div>
            <div v-if="loggedUser">
                <button
                    v-if="userDetail?.data.user._id !== loggedUser._id"
                    @click="doFollowUser"
                    class="btn btn-sm w-full lg:w-fit lg:btn-md"
                    :class="userDetail?.data.user.is_followed ? 'btn-error' : 'btn-primary'"
                >
                    <Icon
                        :name="
                            userDetail?.data.user.is_followed
                                ? 'material-symbols:person-remove'
                                : 'material-symbols:person-add'
                        "
                        class="w-5 h-5 mr-2"
                    />
                    {{ userDetail?.data.user.is_followed ? "Unfollow" : "Follow" }}
                </button>
                <button
                    v-else
                    @click="navigateTo('/settings')"
                    class="btn btn-sm w-full lg:w-fit lg:btn-md btn-primary"
                >
                    <Icon name="material-symbols:settings" class="w-5 h-5 mr-2" /> Settings
                </button>
            </div>
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
                        <div class="w-full">
                            <PostItem
                                v-for="post in userDetail?.data.userPosts"
                                :id="post._id"
                                :content="post.content"
                                :image="post.image"
                                :tags="post.tags"
                                :author="{
                                    id: post.user_id._id,
                                    name: post.user_id.username,
                                    avatar: post.user_id.profile,
                                }"
                                :likes="post.likes.length"
                                :comments="post.comments.length"
                                :created-at="post.createdAt"
                                hide-likes
                                hide-edit
                                class="py-4 border-b-2 border-gray-6"
                            />
                        </div>
                        <p v-if="userDetail?.data.userPosts.length == 0" class="text-content-2">
                            -user have no created posts-
                        </p>
                    </div>
                    <div v-if="activeTab == 1">
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ExploreItem
                                v-for="event in userDetail?.data.userEvents"
                                :key="event._id"
                                :id="event._id"
                                :name="event.name"
                                :price="event.price"
                                :category="event.category"
                                :slot="event.capacity"
                                :location_name="event.location?.venue || '-'"
                                :banner="event.banner"
                                :date="event.start_date"
                            />
                        </div>
                        <p v-if="userDetail?.data.userEvents.length == 0" class="text-content-2">
                            -user have no created events-
                        </p>
                    </div>
                    <div v-if="activeTab == 2">
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
                    <div v-if="activeTab == 3">
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
    <ModalReportUser v-if="userDetail" :id="($route.params.id as string)" :label="userDetail?.data.user.username" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const tabs = [{ name: "Posts" }, { name: "Events" }, { name: "Followers" }, { name: "Followings" }];
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
