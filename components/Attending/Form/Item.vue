<template>
    <div class="card hover:scale-100">
        <div class="card-body min-h-full p-6 relative">
            <p class="font-semibold text-base md:text-lg">{{ name }}</p>
            <p class="text-mute">
                <Icon name="material-symbols:dynamic-form" class="mr-1" /> {{ fields_length }} fields
            </p>
            <p class="text-mute"><Icon name="ph:users-three-bold" class="mr-1" /> {{ response_length }} responses</p>
            <div class="flex-end space-x-1.5">
                <button
                    v-if="!is_filled"
                    @click="navigateTo(`/attending/${route.params.id}/form/${id}`)"
                    class="btn btn-solid-secondary"
                >
                    <Icon name="fa:external-link" class="font-semibold mr-2" /> Fill Now
                </button>
                <p v-else class="text-success flex-center"><Icon name="fa:check" class="mr-2" /> filled</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    name: string;
    fields_length: number;
    response_length: number;
    is_filled: boolean;
}>();

const route = useRoute();
</script>
