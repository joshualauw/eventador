<template>
    <div @click="$router.go(-1)" class="btn btn-ghost w-fit mb-8">
        <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
    </div>
    <div class="flex w-full space-x-8 md:space-x-12 lg:space-x-16">
        <img src="/images/default-user.png" class="w-24 h-24 lg:w-36 lg:h-36 xl:w-52 xl:h-52 rounded-full" />
        <div class="w-full text-sm md:text-base">
            <div class="form-group">
                <div class="grid grid-cols-3">
                    <div class="col-span-1">ID:</div>
                    <div class="col-span-2">#567aks91mb</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Name:</div>
                    <div class="col-span-2">Joshua William</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Email</div>
                    <div class="col-span-2">joshualauw@gmail.com</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Joined At</div>
                    <div class="col-span-2">11 June 2023</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Type</div>
                    <div class="col-span-2" :class="getTypeColor('reguler')">Reguler</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Role</div>
                    <div class="col-span-2 space-x-2">
                        <input type="text" class="input input-sm w-44" placeholder="custom role.." />
                        <button class="btn btn-primary btn-sm">Save</button>
                    </div>
                </div>
            </div>
            <div class="flex flex-center space-x-4 mt-8">
                <button class="btn btn-sm md:btn-md btn-success relative">
                    <input type="file" class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer" />
                    <Icon name="fa:mail-forward" class="mr-2" /> Email Certificate
                </button>
                <label for="ban-participant-modal" class="btn btn-sm md:btn-md btn-solid-error">Ban Participant</label>
            </div>
        </div>
    </div>
    <div class="mt-6">
        <h1 class="font-semibold text-lg mb-6">Organizer Access</h1>
        <OrganizerParticipantAccess />
    </div>
    <OrganizerModalParticipantBan :id="$route.params.pid as string" label="joshualauw" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "event-dashboard",
});
</script>
