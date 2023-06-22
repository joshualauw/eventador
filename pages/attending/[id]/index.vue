<template>
    <div class="w-full lg:w-3/4 mx-auto">
        <div class="mb-8">
            <textarea class="textarea h-28 resize-none" placeholder="what do you want to write?"></textarea>
            <div class="flex-end w-full mt-2 space-x-4">
                <div class="flex-center">
                    <input type="checkbox" class="checkbox checkbox-bordered-secondary mr-2" checked />
                    <span>Announcement</span>
                </div>
                <button class="btn btn-primary">Send <Icon name="material-symbols:send" class="ml-2" /></button>
            </div>
        </div>
        <div class="divider my-4"></div>
        <div v-for="i in 4" class="card hover:scale-100 mb-8">
            <div class="card-body flex-row space-x-3">
                <div @click="navigateTo(`/profile/123`)" class="cursor-pointer">
                    <div class="avatar avatar-ring">
                        <img :src="'/images/default-user.png'" alt="avatar" />
                    </div>
                </div>
                <div class="space-y-2 w-full">
                    <div class="w-full flex-between">
                        <p class="font-semibold flex-center">
                            Joshualauw <span class="badge badge-outline-primary ml-2">reguler</span>
                        </p>
                        <p class="text-mute">12/08/23</p>
                    </div>
                    <p class="text-content2 text-sm">
                        Very nice event! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora aspernatur ea
                        modi inventore ut quos, dolorum eos nulla eius exercitationem labore placeat culpa incidunt quia
                        perferendis quisquam dolorem nesciunt asperiores!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
});
</script>
