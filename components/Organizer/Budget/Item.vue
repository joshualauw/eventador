<template>
    <div class="card hover:scale-100">
        <div class="card-body p-6 relative">
            <p class="font-semibold text-lg">{{ name }}</p>
            <progress class="progress" :class="progressColor" :value="progressPercent" max="100"></progress>
            <span class="text-mute">Rp. {{ formatNumber(current) }} / Rp. {{ formatNumber(limit) }}</span>
            <p>{{ expenses.length }} Expenses <Icon name="icon-park-solid:transaction" /></p>
            <div v-if="accessible" class="flex-end space-x-1.5">
                <label for="edit-budget-modal" @click="emits('editing', id)" class="btn btn-sm btn-solid-secondary">
                    Edit
                </label>
                <label
                    for="delete-budget-modal"
                    @click="emits('deleting', id, name)"
                    class="btn btn-sm btn-solid-error"
                >
                    Delete
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string;
    name: string;
    expenses: IExpense[];
    limit: number;
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
}>();

const { loggedParticipant } = useParticipantStore();
const accessible = computed(
    () => loggedParticipant.value?.access.includes("budget") || loggedParticipant.value?.type == "owner"
);

const current = computed(() => props.expenses.reduce((sum, curr) => sum + curr.amount, 0));
const progressPercent = computed(() => calcPercent(current.value, props.limit));

const progressColor = computed(() => {
    if (progressPercent.value < 50) return "progress-success";
    else if (progressPercent.value < 80) return "progress-warning";
    else return "progress-error";
});
</script>
