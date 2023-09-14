<template>
    <div>
        <UILoader v-if="pending" />
        <div @click="$router.go(-1)" class="btn btn-ghost w-fit mb-8">
            <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1" /> Back
        </div>
        <div v-if="participant" class="flex-center justify-center w-full mb-6">
            <img
                :src="participant?.data.user_id.profile ?? '/images/default-user.png'"
                class="rounded-full w-40 h-40 bg-border p-2 block lg:hidden aspect-square"
            />
        </div>
        <div v-if="participant" class="flex w-full space-x-8 md:space-x-12 lg:space-x-16">
            <img
                :src="participant.data.user_id.profile ?? '/images/default-user.png'"
                class="rounded-full h-48 w-48 bg-border p-2 hidden lg:block aspect-square"
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
                        <div class="col-span-2">
                            {{
                                userIsPremium(participant.data.type)
                                    ? emailCensor(participant.data.user_id.email)
                                    : participant.data.user_id.email
                            }}
                        </div>
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
                        <div class="col-span-2 flex-center flex-col md:flex-row gap-4 md:gap-1.5">
                            <input
                                v-model="role"
                                type="text"
                                class="input input-sm max-w-full md:max-w-[12rem]"
                                placeholder="custom role.."
                            />
                            <button @click="doApplyRole" class="btn btn-primary btn-sm w-full md:w-fit">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="participant?.data.type == 'reguler' || participant?.data.type == 'invited'"
            class="flex flex-col md:flex-row flex-center gap-4 mt-8"
        >
            <button class="btn btn-sm md:btn-md btn-solid-success relative w-full md:w-fit">
                <input
                    @change="handleFileChange"
                    type="file"
                    class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                />
                <Icon name="fa:upload" class="w-5 h-5 mr-2" /> Upload Certificate
            </button>
            <label
                for="ban-participant-modal"
                class="btn btn-sm md:btn-md w-full md:w-fit"
                :class="participant.data.is_banned ? 'btn-solid-warning' : 'btn-solid-error'"
            >
                {{ participant.data.is_banned ? "Unban" : "Ban" }} Participant</label
            >
        </div>
        <div v-if="certificate?.preview" class="mt-12">
            <div class="w-full flex-between mb-6">
                <p class="font-semibold text-lg">Certificate Preview</p>
                <button @click="doEmailCertificate" class="btn btn-primary">
                    <Icon name="fa:mail-forward" class="mr-2" /> Sent Via Email
                </button>
            </div>
            <img :src="certificate.preview" class="rounded-md w-full h-full" />
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
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

definePageMeta({
    layout: "dashboard",
    middleware: ["auth", "participant"],
    owner: true,
});

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getOneParticipant, applyRole, emailCertificate } = useParticipantStore();
const { mutate: roleMutate, pending, error, errors } = useMutate(applyRole);
const { mutate: emailMutate } = useMutate(emailCertificate);

const { data: participant, refresh } = await useAsyncData("getOneParticipant", () =>
    getOneParticipant(route.params.pid as string)
);

const role = ref(participant.value?.data.role || "");
const certificate = ref<{ file: File | null; preview: string }>();

async function doApplyRole() {
    await roleMutate(route.params.pid as string, { role: role.value });
}

async function doEmailCertificate() {
    if (certificate.value) {
        pending.value = true;
        await emailMutate(route.params.pid as string, { certificate: certificate.value.file });
        pending.value = false;
    }
}

function handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        certificate.value = { file, preview: URL.createObjectURL(file) };
    } else {
        createToast("File should be an image!", TYPE.ERROR);
    }
}

function userIsPremium(type: IParticipantType) {
    return type != "organizer" && type != "owner" && !loggedUser?.value?.is_premium;
}
</script>
