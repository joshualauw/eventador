<template>
    <div ref="leafletMap" class="flex-box bg-border">
        <p v-if="props.latitude == 0 && props.longitude == 0">-no location specified-</p>
        <div v-if="!map" class="flex-center text-center">
            <svg class="animate-spin h-8 w-8 mr-3 bg-gray-200" viewBox="0 0 24 24"></svg>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Marker, Map } from "leaflet";
const { $leaflet: leaflet } = useNuxtApp();

const props = defineProps<{
    latitude: number;
    longitude: number;
}>();

const leafletMap = ref();
let map: Map;
let marker: Marker;

watch(
    () => [props.latitude, props.longitude],
    () => plotMap()
);

watchEffect(
    useDebounce(() => {
        if (props.latitude != 0 && props.longitude != 0) {
            plotMap();
        }
    }, 1500)
);

function plotMap() {
    if (!map) map = leaflet.map(leafletMap.value).setView([props.latitude, props.longitude], 13);

    leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        })
        .addTo(map);

    if (marker) marker.remove();
    marker = leaflet.marker([props.latitude, props.longitude]).addTo(map);
    map.setView([props.latitude, props.longitude], 13);
}
</script>
