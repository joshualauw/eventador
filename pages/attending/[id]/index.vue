<template>
    <div>
        <div class="w-full lg:w-3/4 mx-auto">
            <div class="mb-8">
                <textarea
                    v-model="discusssionState.content"
                    class="textarea h-28 resize-none"
                    placeholder="what do you want to write?"
                ></textarea>
                <div class="flex-end w-full mt-2 space-x-4">
                    <div
                        v-show="loggedParticipant?.type == 'owner' || loggedParticipant?.type == 'organizer'"
                        class="flex-center"
                    >
                        <input
                            v-model="discusssionState.is_announcement"
                            type="checkbox"
                            class="checkbox checkbox-bordered-secondary mr-2"
                        />
                        <span>Announcement</span>
                    </div>
                    <button @click="doCreateDiscusssion" class="btn btn-primary" :class="{ 'btn-loading': pending }">
                        Send <Icon name="material-symbols:send" class="ml-2" />
                    </button>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-4" />
            <div class="divider my-4"></div>
            <div class="my-4 flex-between">
                <p class="text-lg">Discussions</p>
                <div class="flex items-center space-x-3">
                    <select v-model="discussionQuery.type" class="select w-32">
                        <option value="">All</option>
                        <option value="owner">Owner</option>
                        <option value="organizer">Organizer</option>
                        <option value="reguler">Reguler</option>
                    </select>
                    <span>
                        <input v-model="discussionQuery.yours" type="checkbox" class="switch switch-primary mr-2" />
                        <span>Yours</span>
                    </span>
                </div>
            </div>
            <p v-if="discusssions?.data.length == 0" class="mt-8 text-center text-lg font-semibold">
                -no discussions here-
            </p>
            <AttendingDiscussionItem
                v-for="disc in discusssions?.data"
                @editing="handleUpdating"
                @deleting="handleDeleting"
                :id="disc._id"
                :user_id="disc.user_id._id"
                :username="disc.user_id.username"
                :profile="disc.user_id.profile"
                :role="disc.participant_id.role"
                :type="disc.participant_id.type"
                :created-at="disc.createdAt"
                :content="disc.content"
                :is_announcement="disc.is_announcement"
                :is-editable="disc.participant_id._id == loggedParticipant?._id"
            />
        </div>
        <AttendingModalDiscussionEdit @saved="refresh" :update-id="actionId" />
        <AttendingModalDiscussionDelete @deleted="refresh" :id="actionId" :label="actionLabel" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { loggedParticipant } = useParticipantStore();
const { getAllDiscussion, createDiscussion } = useDiscussionStore();
const { mutate, pending, error, errors } = useMutate(createDiscussion);
const { actionId, actionLabel, handleDeleting, handleUpdating } = useCrudManager();

const { value: discusssionState, reset } = useStateHandler({
    content: "",
    is_announcement: false,
});

const discussionQuery = reactive({
    yours: false,
    type: "",
});

const { data: discusssions, refresh } = await useAsyncData(
    "getAllDiscussion",
    () =>
        getAllDiscussion(route.params.id as string, {
            type: discussionQuery.type,
            participant_id: discussionQuery.yours ? loggedParticipant.value?._id || "" : "",
        }),
    { watch: [discussionQuery] }
);

async function doCreateDiscusssion() {
    if (loggedParticipant.value) {
        const res = await mutate(route.params.id as string, {
            ...discusssionState,
            participant_id: loggedParticipant.value._id,
        });
        if (res.status) {
            reset();
            refresh();
        }
    }
}
</script>
