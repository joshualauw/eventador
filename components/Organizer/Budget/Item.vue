<template>
    <div class="card hover:scale-100">
        <div class="card-body p-6 relative">
            <p class="font-semibold text-lg">{{ name }}</p>
            <progress class="progress" :class="progressColor" :value="progressPercent" max="100"></progress>
            <span class="text-mute">Rp. {{ formatNumber(current) }} / Rp. {{ formatNumber(limit) }}</span>
            <label
                for="edit-expense-modal"
                @click="emits('expensing', id)"
                class="hover:underline cursor-pointer w-fit"
            >
                {{ expense_count }} Expenses <Icon name="icon-park-solid:transaction" />
            </label>
            <div class="flex-end space-x-1.5">
                <label for="edit-budget-modal" @click="emits('editing', id)" class="btn btn-sm btn-outline-warning">
                    Edit
                </label>
                <label for="delete-budget-modal" @click="emits('deleting', id, name)" class="btn btn-sm btn-error">
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
    current: number;
    limit: number;
    expense_count: number;
}>();
const emits = defineEmits<{
    (e: "editing", id: string): void;
    (e: "deleting", id: string, label: string): void;
    (e: "expensing", id: string): void;
}>();

const progressPercent = computed(() => calcPercent(props.current, props.limit));

const progressColor = computed(() => {
    if (progressPercent.value < 50) return "progress-success";
    else if (progressPercent.value < 80) return "progress-warning";
    else return "progress-error";
});
</script>
