<template>
    <UIModal modal-id="edit-expense-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Add Expenses</h2>
        <form class="mt-4">
            <div v-for="(expense, i) in expenses" :key="i" class="flex-center space-x-1 mb-2">
                <input v-model="expense.name" type="text" class="input input-sm" placeholder="Name.." />
                <input v-model="expense.price" type="number" class="input input-sm" placeholder="Amount.." />
                <span @click="deleteExpense(expense.key)"
                    ><Icon name="fa6-solid:xmark" class="text-red-500 cursor-pointer"
                /></span>
            </div>
            <div class="flex-end mt-4 space-x-2">
                <button @click="addExpense" type="button" class="btn btn-sm">+Add Expense</button>
                <button type="button" class="btn btn-sm btn-primary">Save</button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ updateId: string }>();

const expenses = ref([{ key: genId(4), name: "", price: 0 }]);

function addExpense() {
    expenses.value.push({ key: genId(4), name: "", price: 0 });
}

function deleteExpense(key: string) {
    expenses.value = expenses.value.filter((exp) => exp.key !== key);
}
</script>
