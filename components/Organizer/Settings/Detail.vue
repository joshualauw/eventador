<template>
    <UILoader v-if="pending" />
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Details</p>
            <p class="text-mute">Customize general information to tell what's your event about to your audience</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Details</p>
            <p class="text-content3">Customize general information to tell what's your event about to your audience</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-group">
                <label class="form-label">Event Banner</label>
                <div class="flex-center space-x-5">
                    <div class="shrink-0">
                        <img
                            class="object-contain w-56 lg:w-72 h-28 rounded-lg bg-gray-3"
                            :src="preview ?? '/images/default-logo.png'"
                            alt="profile_photo"
                        />
                    </div>
                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input
                            @change="handleFileChange"
                            type="file"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:btn-solid-primary"
                        />
                    </label>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Event Name</label>
                <input v-model="detailState.name" placeholder="event name.." type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Event Description</label>
                <textarea
                    @keypress.enter.prevent="triggger"
                    v-model="detailState.description"
                    placeholder="event description.."
                    class="textarea h-56 resize-none max-w-full"
                ></textarea>
            </div>
            <div class="form-field">
                <label class="form-label">Event Category</label>
                <select v-model="detailState.category" class="select">
                    <option v-for="cat in categories" :value="cat.key">{{ cat.name }}</option>
                </select>
            </div>
            <div class="form-field">
                <label class="form-label">Event Price (Rp.)</label>
                <input v-model="detailState.price" placeholder="event price.." type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Event Capacity</label>
                <input
                    v-model="detailState.capacity"
                    placeholder="event capacity.."
                    type="number"
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Event Start Date</label>
                <input
                    v-model="detailState.start_date"
                    placeholder="event start date.."
                    type="date"
                    class="input max-w-full"
                />
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button v-if="is_owner" @click="saveDetail" type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import categories from "@/assets/json/categories.json";
import dayjs from "dayjs";
import { TYPE } from "vue-toastification";

defineProps<{ is_owner: boolean }>();

const route = useRoute();
const { eventDetail, updateEventDetail } = useEventStore();
const { mutate, pending, error, errors } = useMutate(updateEventDetail);

const preview = ref<string | null>(eventDetail.value?.banner || null);

const detailState = reactive<IUpdateEventDetail.Body>({
    banner: null,
    name: eventDetail.value?.name || "",
    description: eventDetail.value?.description.replaceAll("<br/>", "\n") || "",
    category: eventDetail.value?.category || "",
    price: eventDetail.value?.price || 0,
    start_date: dayjs(eventDetail.value?.start_date).format("YYYY-MM-DD") || dayjs().format("YYYY-MM-DD"),
    capacity: eventDetail.value?.capacity || 25,
});

function triggger() {
    detailState.description += "\n";
}
const formattedText = computed(() => detailState.description.replace(/\n/g, "<br/>"));

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        detailState.banner = file;
        preview.value = URL.createObjectURL(file);
    } else {
        createToast("file should be an image!", TYPE.ERROR);
    }
};

async function saveDetail() {
    await mutate(route.params.id as string, { ...detailState, description: formattedText.value });
}
</script>
