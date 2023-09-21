<template>
    <div class="card max-h-fit w-full lg:w-3/4 mx-auto hover:scale-100">
        <div class="card-body p-6 relative">
            <p class="text-content2">Respondent:</p>
            <p class="font-semibold mb-2">{{ email }}</p>
            <p class="text-content2">Answers:</p>
            <div v-for="(answer, i) in answers" class="mb-2">
                <p class="font-semibold">
                    {{ i + 1 }}. <span class="ml-1 mb-1">{{ answer.name }}</span>
                </p>
                <p v-if="typeof answer.value == 'string'" class="text-content2">{{ answer.value }}</p>
                <p v-else class="text-content2">{{ answer.value.join(", ") }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ email: string; answers: IFormResponseAnswer[] }>();
</script>
