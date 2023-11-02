<template>
    <UILoader v-if="pending" />
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Gallery</p>
            <p class="text-mute">
                Elevate your event with a stunning gallery, capturing the essence and memorable moments your event
            </p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Gallery</p>
            <p class="text-content3">
                Elevate your event with a stunning gallery, capturing the essence and memorable moments your event
            </p>
        </div>
        <form class="w-full md:w-2/3 space-y-5">
            <div class="form-group">
                <label class="form-label">Upload Images</label>
                <div class="flex-center space-x-2">
                    <input @change="handleFileChange" type="file" class="input-file max-w-full" multiple />
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <img
                    @click="removeFile(img.key)"
                    v-for="img in gallery"
                    :src="img.preview"
                    class="rounded-lg h-full w-full hover:brightness-50 cursor-pointer"
                />
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button v-if="is_owner" @click="saveGallery" type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

defineProps<{ is_owner: boolean }>();

const route = useRoute();
const { eventDetail, updateEventGallery } = useEventStore();
const { error, errors, pending, mutate } = useMutate(updateEventGallery);

const gallery = ref<{ key: string; file?: File; preview: string }[]>([]);
if (eventDetail.value) {
    for (let i = 0; i < eventDetail.value.gallery.length; i++) {
        const image = eventDetail.value.gallery[i];
        const uniqueId = genId(4);
        gallery.value.push({
            key: uniqueId,
            file: await urlToFile(image, uniqueId),
            preview: image,
        });
    }
}

const handleFileChange = (event: any) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
            gallery.value.push({
                key: genId(4),
                file,
                preview: URL.createObjectURL(file),
            });
        } else {
            createToast("file should be an image!", TYPE.ERROR);
        }
    }
};

function removeFile(key: string) {
    gallery.value = gallery.value.filter((gal) => gal.key !== key);
}

async function saveGallery() {
    const galleryFiles: File[] = [];
    gallery.value.forEach((gal) => {
        if (gal.file) galleryFiles.push(gal.file);
    });

    await mutate(route.params.id as string, { gallery: galleryFiles });
}
</script>
