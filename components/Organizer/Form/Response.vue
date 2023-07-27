<template>
    <div class="card max-h-fit w-full lg:w-3/4 mx-auto hover:scale-100">
        <div class="card-body p-6 relative">
            <p class="text-content2">Respondent:</p>
            <p class="font-semibold mb-2">{{ email }}</p>
            <p class="text-content2">Answers:</p>
            <div v-for="(answer, i) in answers">
                <span class="mr-2"> {{ i + 1 }}.</span>
                <span v-if="typeof answer == 'string'">{{ answer }}</span>
                <span v-else>{{ answer.join(", ") }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ email: string; answers: any[] }>();
</script>
