<template>
    <UIModal modal-id="edit-budget-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Budget
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Budget Name</label>
                <input type="text" class="input max-w-full" placeholder="budget name.." />
            </div>
            <div class="form-group">
                <label class="form-label">Limit (Rp.)</label>
                <input type="number" class="input max-w-full" placeholder="budget limit.." />
            </div>
            <div v-if="context == 'update'" class="form-group">
                <label class="form-label">Expenses</label>
                <form>
                    <div v-for="(expense, i) in expenses" :key="i" class="flex-center space-x-1 mb-2">
                        <input v-model="expense.name" type="text" class="input input-sm" placeholder="Name.." />
                        <input v-model="expense.price" type="number" class="input input-sm" placeholder="Amount.." />
                        <span @click="deleteExpense(expense.key)"
                            ><Icon name="fa6-solid:xmark" class="text-red-500 cursor-pointer"
                        /></span>
                    </div>
                    <div class="flex-between mt-4 space-x-2">
                        <span class="font-semibold text-secondary">Total: Rp. {{ total }}</span>
                        <button @click="addExpense" type="button" class="btn btn-sm">+Add Expense</button>
                    </div>
                </form>
            </div>
            <div class="form-group pt-6">
                <button type="button" class="btn btn-primary w-full">Save</button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ context: "update" | "create"; updateId: string }>();
defineEmits<{ (e: "saved"): void }>();

const expenses = ref([{ key: genId(4), name: "", price: 0 }]);
const total = computed(() => expenses.value.reduce((sum, cur) => sum + cur.price, 0));

function addExpense() {
    expenses.value.push({ key: genId(4), name: "", price: 0 });
}

function deleteExpense(key: string) {
    expenses.value = expenses.value.filter((exp) => exp.key !== key);
}
</script>
