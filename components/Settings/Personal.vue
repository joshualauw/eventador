<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Personal Information</p>
            <p class="text-mute">Use a permanent address where you can receive email</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Personal Information</p>
            <p class="text-content3">Use a permanent email address where you can receive email</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-group">
                <label class="form-label">Profile Photo</label>
                <div class="flex-center space-x-5">
                    <div class="shrink-0">
                        <img
                            class="object-cover w-20 h-20 rounded-full"
                            :src="preview ?? '/images/default-camera.png'"
                            alt="profile_photo"
                        />
                    </div>
                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input
                            @change="handleFileChange"
                            type="file"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:btn-solid-primary"
                        />
                    </label>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Username</label>
                <input v-model="personalState.username" placeholder="username" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Email Address</label>
                <input
                    v-model="personalState.email"
                    placeholder="mail@example.com"
                    type="email"
                    class="input max-w-full"
                />
            </div>
            <div class="form-field">
                <label class="form-label">Phone Number</label>
                <input
                    v-model="personalState.phone_number"
                    placeholder="phone number.."
                    type="text"
                    class="input max-w-full"
                />
            </div>
            <p>
                Premium Status:
                <span class="ml-2" :class="loggedUser?.is_premium ? 'text-warning' : 'text-primary'">
                    {{ loggedUser?.is_premium ? "Premium" : "Not Premium" }}
                </span>
            </p>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button
                @click="mutate(personalState)"
                type="button"
                class="btn btn-primary w-fit"
                :class="{ 'btn-loading': pending }"
            >
                Save
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

const { loggedUser, savePersonal } = useAuthStore();

const preview = ref<string | null>(loggedUser.value?.profile || null);

const personalState = reactive({
    profile: null as File | null,
    username: loggedUser.value?.username || "",
    email: loggedUser.value?.email || "",
    phone_number: loggedUser.value?.phone_number || "",
});

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        personalState.profile = file;
        preview.value = URL.createObjectURL(file);
    } else {
        createToast("file should be an image!", TYPE.ERROR);
    }
};

const { mutate, pending, error, errors } = useMutate(savePersonal);
</script>
