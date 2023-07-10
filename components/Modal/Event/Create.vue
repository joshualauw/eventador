<template>
    <UIModal v-slot="{ setOpen }" modal-id="create-event-modal">
        <div class="flex flex-col gap-2">
            <h2 class="text-center text-2xl font-semibold text-content1">Create Event</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Create and Manage your own event</p>
        </div>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Name</label>
                <input v-model="createEventState.name" placeholder="Event name" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Start Date</label>
                <input v-model="createEventState.start_date" type="date" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Category</label>
                <select v-model="createEventState.category" class="select max-w-full">
                    <option v-for="cat in categories" :value="cat.key">{{ cat.name }}</option>
                </select>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-4" />
            <p class="text-mute">* you can edit event details later</p>
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button
                        @click="mutate(createEventState)"
                        type="button"
                        class="btn btn-primary w-full"
                        :class="{ 'btn-loading': pending }"
                    >
                        Create Now
                    </button>
                </div>
            </div>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
import categories from "@/assets/json/categories.json";
import dayjs from "dayjs";

const createEventState = reactive({
    name: "",
    category: "webinar",
    start_date: dayjs().format("YYYY-MM-DD"),
});

const { createEvent } = useEventStore();

const { error, errors, pending, mutate } = useMutate(createEvent);
</script>
