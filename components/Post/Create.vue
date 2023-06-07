<template>
    <div class="flex space-x-6 w-full">
        <div class="avatar avatar-lg border">
            <img src="images/default-user.png" alt="avatar" />
        </div>
        <div class="textarea relative max-w-none w-full h-24">
            <textarea disabled class="resize-none w-full h-full outline-none" placeholder="What's on your mind?" />
            <label for="edit-post-modal" class="btn px-3 btn-solid-primary absolute right-2 bottom-2">
                Create Post <Icon name="material-symbols:send" class="w-5 h-5 ml-2" />
            </label>
        </div>
    </div>
    <ModalPostEdit />
</template>

<script setup lang="ts"></script>
