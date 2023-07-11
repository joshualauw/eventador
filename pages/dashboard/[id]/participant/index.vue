<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Participants</h1>
        <label for="invite-participant-modal" class="btn btn-primary">+ Invite Participant</label>
    </div>
    <div class="flex flex-center flex-col md:flex-row gap-3 mb-8">
        <Icon name="fa:search" />
        <input type="text" class="input max-w-full md:w-56" placeholder="participant name.." />
        <select class="select w-full md:w-36">
            <option class="all">All</option>
            <option class="reguler">Reguler</option>
            <option class="invited">Invited</option>
            <option class="organizer">Organizer</option>
        </select>
        <select class="select w-full md:w-36">
            <option class="new">Newest</option>
            <option class="old">Oldest</option>
        </select>
    </div>
    <OrganizerParticipantList />
    <OrganizerModalParticipantInvite />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "event-dashboard",
});
</script>
