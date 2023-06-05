<template>
    <div>
        <PostCreate />
        <div class="mt-8 flex-between">
            <h2 class="text-xl font-semibold">All Posts</h2>
            <select class="select w-40">
                <option>Latest</option>
                <option>Trending</option>
                <option>Most Liked</option>
            </select>
        </div>
        <div class="mt-8 space-y-5">
            <div v-for="i in 5">
                <PostItem />
                <div class="divider divider-horizontal"></div>
            </div>
        </div>
    </div>
</template>
