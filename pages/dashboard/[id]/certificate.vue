<template>
    <div class="relative w-screen h-screen">
        <div class="flex flex-col gap-4 flex-center absolute top-2 left-2 p-2 z-50">
            <div @click="$router.go(-1)" class="btn btn-solid-secondary w-fit">
                <Icon name="material-symbols:arrow-back" class="w-5 h-5 mr-1 font-extrabold" /> Back
            </div>
            <label for="certificate-template" class="btn btn-primary w-12 h-12 btn-circle">
                <Icon name="eos-icons:templates-outlined" class="w-6 h-6" />
            </label>
            <button class="dropdown">
                <label class="btn btn-secondary w-12 h-12 btn-circle" tabindex="0">
                    <Icon name="material-symbols:add" class="w-6 h-6" />
                </label>
                <div class="dropdown-menu dropdown-menu-right ml-2">
                    <p class="dropdown-item text-sm">
                        <span class="flex-center"><Icon name="fa:image" class="mr-2" /> Add Image</span>
                    </p>
                    <p class="dropdown-item text-sm">
                        <span class="flex-center">
                            <Icon name="material-symbols:text-fields" class="mr-2" /> Add Text
                        </span>
                    </p>
                </div>
            </button>
        </div>
        <div
            class="relative grid grid-cols-4 grid-rows-4 md:grid-cols-7 md:grid-rows-5 xl:grid-cols-10 xl:grid-rows-6 w-full h-full divide-x-2 divide-y-2"
        >
            <img :src="activeTemplate" class="absolute top-0 left-0 w-full h-full z-10" />
            <OrganizerCertificateText
                v-for="text in texts"
                :id="genId()"
                :color="text.color"
                :content="text.content"
                :options="text.options"
                :state="text.state!"
            />
            <div v-for="i in 60" class="bg-transparent z-20"></div>
        </div>
    </div>
    <OrganizerCertificateTemplate @applied="handleApplied" />
</template>

<script setup lang="ts">
import texts from "@/assets/json/certificate-texts.json";

const activeTemplate = ref("/images/certificate/white.jpg");

function handleApplied(img: string) {
    activeTemplate.value = img;
}
</script>
