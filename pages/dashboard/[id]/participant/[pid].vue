<template>
    <UILoader v-if="pending" />
    <div @click="$router.go(-1)" class="btn btn-ghost w-fit mb-8">
        <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
    </div>
    <div v-if="participant" class="flex w-full space-x-8 md:space-x-12 lg:space-x-16">
        <img
            :src="participant.data.user_id.profile ?? '/images/default-user.png'"
            class="w-24 h-24 lg:w-36 lg:h-36 xl:w-52 xl:h-52 rounded-full"
        />
        <div class="w-full text-sm md:text-base">
            <div class="form-group">
                <div class="grid grid-cols-3">
                    <div class="col-span-1">ID:</div>
                    <div class="col-span-2">#{{ participant.data._id }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Name:</div>
                    <div class="col-span-2">{{ participant.data.user_id.username }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Email</div>
                    <div class="col-span-2">{{ participant.data.user_id.email }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Joined At</div>
                    <div class="col-span-2">{{ dayjs(participant.data.joinedDate).format("DD-MM-YYYY") }}</div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Type</div>
                    <div class="col-span-2" :class="getTypeColor(participant.data.type)">
                        {{ participant.data.type }}
                    </div>
                </div>
                <div class="grid grid-cols-3">
                    <div class="col-span-1">Status:</div>
                    <div class="col-span-2" :class="participant.data.is_banned ? 'text-error' : 'text-success'">
                        {{ participant.data.is_banned ? "Banned" : "Active" }}
                    </div>
                </div>
                <div
                    v-if="participant.data.type == 'reguler' || participant.data.type == 'invited'"
                    class="grid grid-cols-3"
                >
                    <div class="col-span-1">Role</div>
                    <div class="col-span-2 space-x-2">
                        <input v-model="role" type="text" class="input input-sm w-44" placeholder="custom role.." />
                        <button @click="doApplyRole" class="btn btn-primary btn-sm">Save</button>
                    </div>
                </div>
            </div>
            <div
                v-if="participant.data.type == 'reguler' || participant.data.type == 'invited'"
                class="flex flex-center space-x-4 mt-8"
            >
                <button class="btn btn-sm md:btn-md btn-success relative">
                    <input type="file" class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer" />
                    <Icon name="fa:mail-forward" class="mr-2" /> Email Certificate
                </button>
                <label
                    for="ban-participant-modal"
                    class="btn btn-sm md:btn-md"
                    :class="participant.data.is_banned ? 'btn-solid-warning' : 'btn-solid-error'"
                >
                    {{ participant.data.is_banned ? "Unban" : "Ban" }} Participant</label
                >
            </div>
        </div>
    </div>
    <div v-if="participant?.data.type == 'organizer'" class="mt-6">
        <h1 class="font-semibold text-lg mb-6">Organizer Access</h1>
        <OrganizerParticipantAccess :id="route.params.pid as string" :access="participant.data.access" />
    </div>
    <OrganizerModalParticipantBan
        @banned="refresh"
        :id="route.params.pid as string"
        :label="participant?.data.user_id.username ?? ''"
        :context="participant?.data.is_banned ? 'unban' : 'ban'"
    />
    <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
</template>

<script setup lang="ts">
import dayjs from "dayjs";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
    owner: true,
});

const route = useRoute();
const { getOneParticipant, applyRole } = useParticipantStore();
const { mutate, pending, error, errors } = useMutate(applyRole);

const { data: participant, refresh } = await useAsyncData("getOneParticipant", () =>
    getOneParticipant(route.params.pid as string)
);

const role = ref(participant.value?.data.role || "");

async function doApplyRole() {
    await mutate(route.params.pid as string, { role: role.value });
}
</script>
