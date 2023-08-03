<template>
    <div class="absolute right-2 top-2 max-w-[350px] bg-backgroundPrimary shadow-md rounded-xl p-4 z-30">
        <img :src="image.preview" class="w-24 h-24 mx-auto rounded-md" />
        <button class="btn btn-circle absolute top-4 right-4">
            <Icon name="fa:edit" class="w-4 h-4" />
        </button>
        <input @change="handleFileChange" type="file" class="opacity-0 cursor-pointer absolute top-4 right-4 w-8 h-8" />
        <div class="w-full">
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">x position</span>
                    <input
                        v-model="imageState.state.x"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="x"
                    />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">y position</span>
                    <input
                        v-model="imageState.state.y"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="y"
                    />
                </div>
            </div>
            <div class="flex mt-4 space-x-3">
                <div class="form-group gap-1">
                    <span class="form-label">width</span>
                    <input
                        v-model="imageState.state.width"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="x"
                    />
                </div>
                <div class="form-group gap-1">
                    <span class="form-label">height</span>
                    <input
                        v-model="imageState.state.height"
                        type="number"
                        class="input input-sm max-w-full"
                        placeholder="y"
                    />
                </div>
            </div>
            <div class="flex justify-end w-full mt-4 space-x-2">
                <button @click="emits('closed')" class="btn btn-ghost">OK</button>
                <button @click="emits('deleted', image.id)" class="btn btn-error">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

const props = defineProps<{ image: ICertificateImageExtra }>();
const emits = defineEmits<{ (e: "closed"): void; (e: "deleted", id: string): void }>();

const imageState = ref();
watchEffect(() => (imageState.value = props.image));

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result?.toString()?.split(",")[1];
            if (base64String) {
                props.image.preview = URL.createObjectURL(file);
                props.image.url = file.type + "," + base64String;
            }
        };
        reader.readAsDataURL(file);
    } else {
        createToast("File should be an image!", TYPE.ERROR);
    }
};
</script>
