<template>
    <UIModal modal-id="edit-itinenary-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Itinenary
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Itinenary Day</label>
                <input type="date" class="input max-w-full" placeholder="itinenary day.." />
            </div>
            <div v-if="context == 'update'" class="form-group mt-4">
                <label class="form-label">Schedules</label>
                <div v-for="(schedule, i) in schedules" :key="i" class="flex-center space-x-1">
                    <input v-model="schedule.name" type="text" class="input input-sm" placeholder="Name.." />
                    <input
                        v-model="schedule.time"
                        type="text"
                        class="input input-sm"
                        placeholder="Time.. (ex: 15.00 - 16.00)"
                    />
                    <span @click="deleteSchedule(schedule.key)"
                        ><Icon name="fa6-solid:xmark" class="text-red-500 cursor-pointer"
                    /></span>
                </div>
                <div class="flex-end mt-4">
                    <button @click="addSchedule" type="button" class="btn btn-sm">+Add Schedule</button>
                </div>
            </div>
            <div class="form-group pt-6">
                <button type="button" class="btn btn-primary w-full">Save</button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ context: "update" | "create"; updateId: string }>();
defineEmits<{ (e: "saved"): void }>();

const schedules = ref([{ key: genId(4), name: "", time: "" }]);

function addSchedule() {
    schedules.value.push({ key: genId(4), name: "", time: "" });
}

function deleteSchedule(key: string) {
    schedules.value = schedules.value.filter((schedule) => schedule.key !== key);
}
</script>
