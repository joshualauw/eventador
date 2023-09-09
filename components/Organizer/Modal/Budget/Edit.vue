<template>
    <UIModal v-slot="{ setOpen }" modal-id="edit-budget-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Budget
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Budget Name</label>
                <input v-model="budgetState.name" type="text" class="input max-w-full" placeholder="budget name.." />
            </div>
            <div class="form-group">
                <label class="form-label">Limit (Rp.)</label>
                <input
                    v-model="budgetState.limit"
                    type="number"
                    class="input max-w-full"
                    placeholder="budget limit.."
                />
            </div>
            <div v-if="context == 'update'" class="form-group">
                <label class="form-label">Expenses</label>
                <form>
                    <div v-for="(expense, i) in expenses" :key="i" class="flex-center space-x-1 mb-2">
                        <input v-model="expense.name" type="text" class="input input-sm w-[60%]" placeholder="Name.." />
                        <input
                            v-model="expense.amount"
                            type="number"
                            class="input input-sm w-[40%]"
                            placeholder="Amount.."
                        />
                        <span @click="deleteExpense(expense.key)"
                            ><Icon name="fa6-solid:xmark" class="text-red-500 cursor-pointer"
                        /></span>
                    </div>
                    <div class="flex-between mt-4 space-x-2">
                        <span class="font-semibold text-secondary">Total: Rp. {{ formatNumber(total) }}</span>
                        <button @click="addExpense" type="button" class="btn btn-sm">+Add Expense</button>
                    </div>
                </form>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="saveBudget(setOpen)"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Save
                </button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ context: "update" | "create"; updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const { createBudget, updateBudget, getOneBudget } = useBudgetStore();
const { mutate: createMutate, error, errors, pending } = useMutate(createBudget);
const { mutate: updateMutate } = useMutate(updateBudget);

const { value: budgetState, reset } = useStateHandler({
    name: "",
    limit: 0,
});
const expenses = ref<(IExpense & { key: string })[]>([{ key: genId(4), name: "", amount: 0 }]);
const total = computed(() => expenses.value.reduce((sum, cur) => sum + cur.amount, 0));

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        if (props.context == "update") {
            const res = await getOneBudget(val);
            if (res && res.data) {
                budgetState.name = res.data.name;
                budgetState.limit = res.data.limit;
                expenses.value = [];
                expenses.value.push(...res.data.expenses.map((ex) => ({ ...ex, key: genId(5) })));
            }
        } else {
            reset();
        }
    }
);

async function saveBudget(setOpen: (open: boolean) => void) {
    if (props.context == "create") {
        const res = await createMutate(route.params.id as string, budgetState);
        if (res.status) {
            emits("saved");
            reset();
            setOpen(false);
        }
    }
    if (props.context == "update") {
        pending.value = true;
        const res = await updateMutate(props.updateId, {
            ...budgetState,
            expenses: expenses.value.map((ex) => exclude(ex, ["key"])),
        });
        pending.value = false;
        if (res.status) {
            emits("saved");
            setOpen(false);
        } else {
            error.value = res.error;
            errors.value = [];
            errors.value.push(...res.errors);
        }
    }
}

function addExpense() {
    expenses.value.push({ key: genId(4), name: "", amount: 0 });
}

function deleteExpense(key: string) {
    expenses.value = expenses.value.filter((exp) => exp.key !== key);
}
</script>
