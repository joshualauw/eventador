<template>
    <UIModal classes="max-w-[800px]" modal-id="edit-post-modal">
        <div class="flex flex-col gap-2">
            <h2 class="text-center text-2xl font-semibold text-content1">Create Post</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Tell your thoughts to the public</p>
        </div>
        <div class="form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Post Title</label>
                <input placeholder="post title.." type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Post Content</label>
                <div class="form-control flex-col">
                    <textarea placeholder="post content.." class="textarea h-40 resize-none"></textarea>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Post Tags</label>
                <div>
                    <span class="badge badge-lg badge-flat-secondary inline-flex w-fit m-1.5">#test</span>
                    <span class="badge badge-lg badge-outline relative h-full w-40">
                        <input type="text" class="outline-none text-sm bg-backgroundPrimary" placeholder="tag" />
                        <button class="btn btn-sm btn-solid-secondary btn-rounded absolute right-2">
                            <Icon name="material-symbols:add" />
                        </button>
                    </span>
                </div>
            </div>
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button type="button" class="btn btn-primary btn-rounded w-full">Create Post</button>
                </div>
            </div>
        </div>
    </UIModal>
</template>

<script setup lang="ts"></script>
