<template>
    <UIModal v-slot="{ setOpen }" modal-id="edit-itinenary-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Itinenary
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Itinenary Day</label>
                <input
                    v-model="itinenaryState.day"
                    type="date"
                    class="input max-w-full"
                    placeholder="itinenary day.."
                />
            </div>
            <div v-if="context == 'update'" class="form-group mt-4">
                <label class="form-label">Schedules</label>
                <div v-for="(schedule, i) in schedules" :key="i" class="flex-center space-x-1">
                    <input v-model="schedule.name" type="text" class="input input-sm w-1/2" placeholder="Name.." />
                    <div class="flex w-1/2">
                        <input v-model="schedule.start_time" type="time" class="input input-sm" />
                        <input v-model="schedule.end_time" type="time" class="input input-sm" />
                    </div>
                    <span @click="deleteSchedule(schedule.key)"
                        ><Icon name="fa6-solid:xmark" class="text-red-500 cursor-pointer"
                    /></span>
                </div>
                <div class="flex-end mt-4">
                    <button @click="addSchedule" type="button" class="btn btn-sm">+Add Schedule</button>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="saveItinenary(setOpen)"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Save
                </button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{ context: "update" | "create"; updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const { getOneItinenary, createItinenary, updateItinenary } = useItinenaryStore();
const { mutate: createMutate, error, errors, pending } = useMutate(createItinenary);
const { mutate: updateMutate } = useMutate(updateItinenary);

const { value: itinenaryState, reset } = useStateHandler({
    day: dayjs().format("YYYY-MM-DD"),
});
const schedules = ref([{ key: genId(4), name: "", start_time: "", end_time: "" }]);

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        if (props.context == "update") {
            const res = await getOneItinenary(val);
            if (res) {
                itinenaryState.day = dayjs(res.data.day).format("YYYY-MM-DD");
                schedules.value = [];
                schedules.value.push(...res.data.schedules.map((sc) => ({ ...sc, key: genId(4) })));
            }
        } else {
            reset();
        }
    }
);

async function saveItinenary(setOpen: (state: boolean) => void) {
    if (props.context == "create") {
        const res = await createMutate(route.params.id as string, { ...itinenaryState });
        if (res.status) {
            emits("saved");
            reset();
            setOpen(false);
        }
    }
    if (props.context == "update") {
        pending.value = true;
        const res = await updateMutate(props.updateId, {
            ...itinenaryState,
            schedules: schedules.value.map((sc) => exclude(sc, ["key"])),
        });
        pending.value = false;

        if (res.status) {
            emits("saved");
            setOpen(false);
        } else {
            error.value = res.error;
            errors.value = [];
            errors.value.push(...res.errors);
        }
    }
}

function addSchedule() {
    schedules.value.push({ key: genId(4), name: "", start_time: "", end_time: "" });
}

function deleteSchedule(key: string) {
    schedules.value = schedules.value.filter((schedule) => schedule.key !== key);
}
</script>
