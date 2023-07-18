<template>
    <div>
        <div class="flex-between mb-8">
            <h2 class="font-bold text-xl">Find Users</h2>
            <div class="flex-center space-x-5">
                <input
                    v-model="followQuery.keyword"
                    type="text"
                    class="input input-sm lg:input-md w-40"
                    placeholder="Username.."
                />
                <span>
                    <input
                        v-model="followQuery.followed"
                        type="checkbox"
                        class="checkbox-primary checkbox-solid checkbox mr-1"
                    />
                    Followed</span
                >
            </div>
        </div>
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
    middleware: "auth",
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

const { getFollowableUsers } = useAuthStore();
const { data: followableUsers, refresh } = await useAsyncData("getFollowableUsers", () =>
    getFollowableUsers(followQuery)
);
</script>
