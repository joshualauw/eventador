<template>
    <div class="card hover:scale-100 mb-8">
        <div class="card-body relative flex-row space-x-3">
            <Icon
                v-if="is_announcement"
                name="mdi:exclamation-thick"
                class="w-5 h-5 absolute top-2 left-2 text-warning"
            />
            <div @click="navigateTo(`/profile/${user_id}`)" class="cursor-pointer">
                <div class="avatar avatar-ring">
                    <img :src="profile ?? '/images/default-user.png'" alt="avatar" />
                </div>
            </div>
            <div class="w-full">
                <div class="w-full flex-between">
                    <p class="font-semibold flex-center">
                        <span>{{ username }} </span>
                        <span class="badge ml-2" :class="badgeColor">{{ type }}</span>
                    </p>
                    <div v-if="isEditable" class="flex space-x-3">
                        <label
                            for="edit-discussion-modal"
                            @click="emits('editing', id)"
                            class="btn btn-xs btn-solid-warning"
                        >
                            Edit
                        </label>
                        <label
                            for="delete-discussion-modal"
                            @click="emits('deleting', id, 'this discussion')"
                            class="btn btn-xs btn-solid-error"
                        >
                            Delete
                        </label>
                        <p class="text-mute">{{ dayjs(createdAt).format("DD-MM-YY") }}</p>
                    </div>
                </div>
                <p class="text-sm text-success font-semibold mb-2" v-if="role">As {{ role }}</p>
                <p class="text-content2 text-sm">
                    {{ content }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
    id: string;
    user_id: string;
    profile?: string;
    username: string;
    type: IParticipantType;
    is_announcement: boolean;
    createdAt: string;
    role: string;
    content: string;
    isEditable: boolean;
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();

const badgeColor = computed(() => {
    if (props.type == "owner") return "badge-outline-secondary";
    if (props.type == "organizer") return "badge-outline-secondary";
    if (props.type == "invited") return "badge-outline-warning";
    else return "badge-outline-primary";
});
</script>
