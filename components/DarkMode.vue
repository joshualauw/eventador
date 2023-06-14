<template>
    <ClientOnly>
        <div v-if="colorMode.unknown">...</div>
        <div v-else @click="setColorMode" class="btn btn-circle btn-ghost text-content3">
            <Icon v-if="colorMode.value == 'light'" name="material-symbols:light-mode-outline" class="w-5 h-5" />
            <Icon v-else name="material-symbols:dark-mode-outline" class="w-5 h-5" />
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

//TODO: save theme settings in database
function setColorMode() {
    if (colorMode.value == "light") {
        colorMode.value = "dark";
        colorMode.preference = "dark";
    } else {
        colorMode.value = "light";
        colorMode.preference = "light";
    }
}
</script>
