<template>
    <div>
        <div class="flex-between flex-col lg:flex-row gap-3">
            <div class="flex-center space-x-5 lg:space-x-12 text-center lg:text-left">
                <div class="flex space-x-3 text-sm cursor-pointer">
                    <div class="avatar avatar-md lg:avatar-lg avatar-ring">
                        <img src="images/default-user.png" alt="avatar" />
                    </div>
                    <div class="hidden lg:block">
                        <p class="font-bold text-lg">Joshua William</p>
                        <p class="text-gray-500">joshualauw@gmail.com</p>
                    </div>
                </div>
                <span class="font-bold text-base lg:text-lg">8 Posts</span>
                <span class="font-bold text-base lg:text-lg">101 Followers</span>
                <span class="font-bold text-base lg:text-lg">9 Following</span>
                <span class="font-bold text-base lg:text-lg">8 Events</span>
            </div>
            <!-- <button class="btn btn-sm lg:btn-md btn-primary">Follow</button> -->
            <button class="btn btn-sm lg:btn-md btn-success flex-center">
                Edit <Icon name="material-symbols:settings" class="ml-2 w-4 h-4" />
            </button>
        </div>
        <div class="card hover:scale-100 mt-8">
            <div class="card-body p-6">
                <div class="tabs">
                    <div
                        v-for="(tab, i) in tabs"
                        @click="activeTab = i"
                        class="tab tab-bordered px-6"
                        :class="{ 'tab-active': i == activeTab }"
                    >
                        {{ tab.name }}
                    </div>
                </div>
                <div class="mt-4">
                    <div v-if="activeTab == 0">
                        <PostItem v-for="i in 3" />
                    </div>
                    <div v-if="activeTab == 1">
                        <FollowItem v-for="i in 5" class="shadow-none hover:bg-gray-200 hover:scale-100" />
                    </div>
                    <div v-if="activeTab == 2">
                        <FollowItem v-for="i in 2" class="shadow-none hover:scale-100" />
                    </div>
                    <div v-if="activeTab == 3">
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ExploreItem v-for="i in 3" class="mb-2" />
                        </div>
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

const tabs = [{ name: "Posts" }, { name: "Followers" }, { name: "Followings" }, { name: "Events" }];

const activeTab = ref(0);
</script>
