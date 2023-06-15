<template>
    <div class="flex space-x-3">
        <div @click="navigateTo('/profile/123')" class="cursor-pointer">
            <div class="avatar avatar-lg hidden md:block">
                <img src="/images/default-user.png" alt="avatar" />
            </div>
        </div>
        <div>
            <div class="flex-between w-full">
                <div @click="navigateTo('/profile/123')" class="font-bold hover:underline cursor-pointer">
                    <div class="md:hidden avatar avatar-sm mr-2">
                        <img src="/images/default-user.png" alt="avatar" />
                    </div>
                    Joshua William -<span class="text-gray-400 font-medium ml-2">23/10/23</span>
                </div>
                <div class="dropdown">
                    <label class="btn btn-circle btn-ghost"><Icon name="mdi:dots-horizontal" tabindex="0" /></label>
                    <div class="dropdown-menu mt-1 w-20 border dropdown-menu-bottom-left">
                        <a class="dropdown-item text-sm">Report</a>
                    </div>
                </div>
            </div>
            <p>Bing & Chilling</p>
            <div @click="navigateTo('/post/123')" class="my-4 space-y-3 cursor-pointer">
                <img src="/images/default-post.png" class="rounded-xl" />
                <p>Lets Bing Chilling Guys~</p>
            </div>
            <div v-if="showTags">
                <span
                    v-for="i in 4"
                    class="badge badge-md lg:badge-lg badge-flat-secondary cursor-pointer inline-flex w-fit m-1.5"
                >
                    #test
                </span>
            </div>
            <div class="mt-5 flex w-full justify-end">
                <button class="btn btn-ghost text-red-400 text-base"><Icon name="fa:heart" class="mr-2" /> 10</button>
                <label for="post-comments-modal" class="btn btn-ghost text-green-400 text-base">
                    <Icon name="fa:comment" class="mr-2" /> 5
                </label>
                <button class="btn btn-ghost text-blue-400 text-base"><Icon name="fa:eye" class="mr-2" /> 29</button>
            </div>
        </div>
        <ModalPostComment />
    </div>
</template>

<script setup lang="ts">
defineProps<{ showTags?: boolean }>();
</script>
