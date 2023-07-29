<template>
    <div class="flex space-x-3">
        <div @click="navigateTo(`/profile/${author.id}`)" class="cursor-pointer">
            <div class="avatar avatar-lg hidden md:block">
                <img :src="author.avatar ?? '/images/default-user.png'" alt="avatar" />
            </div>
        </div>
        <div class="w-full">
            <div class="flex-between w-full">
                <div class="cursor-pointer">
                    <div class="md:hidden avatar avatar-sm mr-2">
                        <img :src="author.avatar ?? '/images/default-user.png'" alt="avatar" />
                    </div>
                    <span class="font-semibold">{{ author.name }} -</span>
                    <span class="text-mute ml-2 text-xs">{{ dayjs(createdAt).format("DD/MM/YY - HH:mm") }}</span>
                </div>
                <div>
                    <div v-if="!hideEdit" class="dropdown">
                        <div class="btn btn-circle btn-ghost" tabindex="0">
                            <Icon name="mdi:dots-horizontal" />
                        </div>
                        <div class="dropdown-menu w-20 border dropdown-menu-bottom-left">
                            <label for="report-post-modal" class="dropdown-item text-sm"> Report </label>
                        </div>
                    </div>
                    <div v-if="author.id == loggedUser?._id && !hideEdit" class="dropdown">
                        <label class="btn btn-circle btn-ghost" tabindex="0"><Icon name="mdi:pencil" /></label>
                        <div class="dropdown-menu mt-1 w-20 border dropdown-menu-bottom-left">
                            <label
                                for="edit-post-modal"
                                @click="emits('editing', id)"
                                class="dropdown-item text-sm text-warning"
                                >Edit</label
                            >
                            <label
                                for="delete-post-modal"
                                @click="emits('deleting', id, 'this post')"
                                class="dropdown-item text-sm text-error"
                            >
                                Delete
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div @click="navigateTo(`/post/${id}`)" class="my-4 space-y-6 cursor-pointer">
                <div v-if="image" class="max-w-full h-60 rounded-xl bg-backgroundSecondary flex-center">
                    <img :src="image" class="mx-auto max-w-full max-h-full" />
                </div>
                <p v-html="content"></p>
            </div>
            <div>
                <span
                    v-for="tag in tags"
                    @click="navigateTo(`/tags/${tag}`)"
                    class="badge badge-md lg:badge-lg badge-flat-secondary cursor-pointer inline-flex w-fit m-1.5"
                >
                    #{{ tag }}
                </span>
            </div>
            <div v-if="!hideLikes" class="mt-5 flex w-full justify-end">
                <button @click="doLikePost" class="btn btn-ghost text-secondary text-base">
                    <Icon :name="is_liked ? 'mdi:thumb-up' : 'mdi:thumb-up-outline'" class="mr-2" /> {{ likes }}
                </button>
                <label
                    @click="emits('commenting', id)"
                    for="post-comments-modal"
                    class="btn btn-ghost text-success text-base"
                >
                    <Icon name="fa:comment" class="mr-2" /> {{ comments }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

const props = defineProps<{
    id: string;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    likes: number;
    comments: number;
    content: string;
    image?: string;
    createdAt: string;
    tags: string[];
    hideLikes?: boolean;
    hideEdit?: boolean;
    is_liked?: boolean;
}>();
const emits = defineEmits<{
    (e: "commenting", id: string): void;
    (e: "liked"): void;
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();

const { loggedUser } = useAuthStore();
const { likePost } = usePostStore();
const { mutate } = useMutate(likePost);

async function doLikePost() {
    if (loggedUser.value) {
        const res = await mutate(props.id);
        if (res.data) {
            emits("liked");
        }
    } else {
        createToast("you must login first", TYPE.ERROR);
    }
}
</script>
