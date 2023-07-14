<template>
    <UILoader v-if="pending" />
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Location</p>
            <p class="text-mute">
                Launch your event in real world venue? complete the maps detail to ease your audience navigation.
            </p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Location</p>
            <p class="text-content3">
                Launch your event in real world venue? complete the maps detail to ease your audience navigation.
            </p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <UIMap :latitude="coordinate[0]" :longitude="coordinate[1]" class="w-full h-60 rounded-xl" />
            <div class="form-group popover w-full">
                <label class="form-label justify-start">
                    Location Name <span class="text-mute ml-2">(full address)</span>
                </label>
                <input
                    @keyup="debounceSearchLocation"
                    v-model="locationState.name"
                    type="text"
                    placeholder="location name.."
                    class="input max-w-full popover-trigger"
                    tabindex="0"
                />
                <div class="popover-content w-full mt-2" tabindex="0">
                    <div v-if="fetchLocation" class="flex w-full flex-box">
                        <svg class="animate-spin h-4 w-4 mr-3 bg-gray-200" viewBox="0 0 24 24"></svg>
                        <p class="text-mute">Please Wait...</p>
                    </div>
                    <div v-if="suggestions.length == 0 && !fetchLocation" class="text-mute text-center">
                        --Search Something--
                    </div>
                    <div v-if="suggestions.length > 0 && !fetchLocation" class="h-64 overflow-y-auto">
                        <p
                            v-for="suggest in suggestions"
                            @click="selectLocation(suggest)"
                            class="hover:bg-border p-2 cursor-pointer"
                        >
                            {{ suggest.name }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label justify-start">
                    Venue Name <span class="text-mute ml-2">(will be displayed)</span>
                </label>
                <input v-model="locationState.venue" type="text" placeholder="venue name.." class="input max-w-full" />
            </div>
            <div class="form-group">
                <label class="form-label">Latitude & Longitude</label>
                <div class="flex-center space-x-2">
                    <input
                        v-model="locationState.latitude"
                        type="number"
                        placeholder="latitude"
                        class="input max-w-full"
                    />
                    <input
                        v-model="locationState.longitude"
                        type="number"
                        placeholder="longitude"
                        class="input max-w-full"
                    />
                    <button @click="applyCoordinate" type="button" class="btn btn-solid-secondary">Apply</button>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button @click="saveLocation" type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
interface Suggestion {
    name: string;
    coordinate: [number, number];
}

const route = useRoute();
const { eventDetail, updateEventLocation } = useEventStore();
const { error, errors, pending, mutate } = useMutate(updateEventLocation);
const fetchLocation = ref(false);

const locationState = reactive<IUpdateEventLocation.Body>({
    name: eventDetail.value?.location.name || "",
    venue: eventDetail.value?.location.venue || "",
    latitude: eventDetail.value?.location.latitude || 0,
    longitude: eventDetail.value?.location.longitude || 0,
});
const suggestions = ref<Suggestion[]>([]);
const coordinate = ref([locationState.latitude || 0, locationState.longitude || 0]);

function applyCoordinate() {
    coordinate.value[0] = locationState.latitude;
    coordinate.value[1] = locationState.longitude;
}

function selectLocation(suggest: Suggestion) {
    locationState.name = suggest.name;
    locationState.latitude = suggest.coordinate[0];
    locationState.longitude = suggest.coordinate[1];

    applyCoordinate();
}

const debounceSearchLocation = useDebounce(searchLocation, 800);

async function searchLocation() {
    fetchLocation.value = true;
    const data = await $fetch<OSMResponse[]>("https://nominatim.openstreetmap.org/search", {
        query: {
            q: locationState.name,
            format: "json",
            limit: 20,
        },
    });
    suggestions.value = [
        ...data.map((d) => ({
            name: d.display_name,
            coordinate: [Number(d.lat), Number(d.lon)] as [number, number],
        })),
    ];
    fetchLocation.value = false;
}

async function saveLocation() {
    await mutate(route.params.id as string, locationState);
}
</script>
