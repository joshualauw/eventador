<template>
    <div class="flex flex-col lg:flex-row h-full gap-10">
        <div class="card h-fit hover:scale-100 w-3/4 mx-auto">
            <img src="/images/default-post.png" alt="" class="w-full h-68" />
            <div class="card-body space-y-4">
                <h2 class="card-header">Maximizing Your Productivity at Work</h2>
                <p class="text-content2">
                    Welcome to our event! Please have fun and chatting and watch the stream! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Dolorum odit soluta ex dolore minus officia eum quidem dignissimos
                    quam eveniet, ipsam quaerat, hic quasi nemo. Eos inventore consectetur harum reiciendis.
                </p>
                <div class="card-footer flex-col items-start w-full">
                    <p class="card-header mb-4">Participants</p>
                    <div class="grid grid-cols-2 gap-4 w-full">
                        <div v-for="i in 5" class="card hover:scale-100 shadow-none">
                            <div class="flex flex-row gap-4 p-4 card-body bg-backgroundPrimary">
                                <div class="avatar avatar-ring avatar-md">
                                    <img src="/images/default-user.png" alt="avatar" />
                                </div>
                                <div class="flex flex-col text-sm lg:text-base">
                                    <span>Joshua William</span>
                                    <span class="text-xs lg:text-sm text-primary">Organizer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 w-full justify-end mt-4">
                        <label for="edit-overview-modal" class="btn btn-solid-secondary">
                            <Icon name="fa:edit" class="mr-2" /> Edit Overview
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AttendingModalOverviewEdit />
</template>

<script setup lang="ts">
import rundown from "@/assets/json/itinenaries.json";

definePageMeta({
    layout: "attending",
});
</script>
