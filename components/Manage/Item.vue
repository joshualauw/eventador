<template>
    <NuxtLink :to="context == 'managed' ? `/dashboard/${id}` : `/attending/${id}`" class="card cursor-pointer">
        <div class="card-body min-h-full flex-center text-center">
            <div class="space-x-2">
                <span class="badge" :class="badgeColor">{{ publicity }}</span>
                <span v-if="is_organizer" class="badge badge-flat-primary">organizer</span>
            </div>
            <h2 class="card-header text-lg font-bold">{{ name }}</h2>
            <p class="text-content2">{{ total_participants }}/{{ capacity }} people attended</p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string;
    publicity: string;
    name: string;
    total_participants: number;
    capacity: number;
    is_organizer?: boolean;
    context: "managed" | "attended";
}>();

const badgeColor = computed(() => {
    if (props.publicity == "open") return "badge-flat-success";
    if (props.publicity == "public") return "badge-flat-secondary";
    else return "badge-flat-error";
});
</script>
