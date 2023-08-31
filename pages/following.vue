<template>
    <div>
        <div class="flex-between mb-4 md:mb-8">
            <h2 class="font-bold text-lg md:text-xl">Find Users</h2>
            <div class="flex-center space-x-5">
                <input
                    v-model="followQuery.keyword"
                    type="text"
                    class="input input-md w-48 hidden md:block"
                    placeholder="Username.."
                />
                <div v-if="loggedUser" class="flex-center">
                    <input
                        v-model="followQuery.followed"
                        type="checkbox"
                        class="checkbox-primary checkbox-solid checkbox checkbox-sm md:checkbox-md mr-1.5"
                    />
                    <span class="text-sm md:text-base">Followed</span>
                </div>
            </div>
        </div>
        <input
            v-model="followQuery.keyword"
            type="text"
            class="input input-md block md:hidden max-w-full mb-8"
            placeholder="Username.."
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <FollowItem
                v-for="user in followableUsers?.data"
                :key="user._id"
                :id="user._id"
                :name="user.username"
                :profile="user.profile"
                :followers_count="user.followers_count"
                :events_count="user.events_count"
                :is_followed="user.is_followed"
                class="hover:bg-none"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "home",
});

const followQuery = reactive({
    keyword: "",
    followed: false,
});

watch(
    () => followQuery.keyword,
    useDebounce((val) => {
        refresh();
    }, 500)
);

watch(
    () => followQuery.followed,
    () => refresh()
);

const { loggedUser, getFollowableUsers } = useAuthStore();
const { data: followableUsers, refresh } = await useAsyncData("getFollowableUsers", () =>
    getFollowableUsers(followQuery)
);
</script>
