<template>
    <div class="flex space-x-3 relative mb-9">
        <div @click="navigateTo(`/profile/${commenter.id}`)" class="cursor-pointer">
            <div class="avatar avatar-ring">
                <img :src="commenter.avatar ?? '/images/default-user.png'" alt="avatar" />
            </div>
        </div>
        <div class="space-y-3 w-full">
            <div class="w-full flex-between">
                <div>
                    <p class="font-semibold text-sm md:text-base">{{ commenter.name }}</p>
                    <p class="text-xs md:text-sm text-content2">
                        commented at {{ dayjs(createdAt).format("DD/MM/YY, HH:mm") }}
                    </p>
                </div>
                <div class="flex-center space-x-2">
                    <div v-if="commenter.id == loggedUser?._id && !hide_edit" class="dropdown">
                        <label class="btn btn-circle btn-ghost" tabindex="0"><Icon name="mdi:pencil" /></label>
                        <div class="dropdown-menu mt-1 w-20 border dropdown-menu-bottom-left">
                            <label
                                for="edit-comment-modal"
                                @click="emits('editing', id)"
                                class="dropdown-item text-sm text-warning"
                                >Edit</label
                            >
                            <label
                                for="delete-comment-modal"
                                @click="emits('deleting', id, 'this comment')"
                                class="dropdown-item text-sm text-error"
                            >
                                Delete
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-sm md:text-base">
                {{ content }}
            </p>
            <div @click="doLikeComment" class="flex-center space-x-3">
                <Icon
                    :name="is_liked ? 'mdi:thumb-up' : 'mdi:thumb-up-outline'"
                    class="w-4 h-4 text-content2 mr-1 cursor-pointer"
                />{{ likes }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

const props = defineProps<{
    id: string;
    commenter: { id: string; name: string; avatar?: string };
    likes: number;
    content: string;
    createdAt: string;
    is_liked?: boolean;
    hide_edit?: boolean;
}>();
const emits = defineEmits<{
    (e: "liked"): void;
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();

const route = useRoute();
const { loggedUser } = useAuthStore();
const { likeComment } = usePostStore();
const { mutate } = useMutate(likeComment);

async function doLikeComment() {
    if (loggedUser.value) {
        const res = await mutate(route.params.id as string, props.id);
        if (res.status) {
            emits("liked");
        }
    } else {
        createToast("you must login first", TYPE.ERROR);
    }
}
</script>
