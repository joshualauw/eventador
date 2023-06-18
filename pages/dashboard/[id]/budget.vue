<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Budgets</h1>
        <span class="text-sm text-content3">Last updated: 24/07/2023 16:54</span>
        <label @click="handleCreating" for="edit-budget-modal" class="btn btn-primary">+ Create Budget</label>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <OrganizerBudgetItem
            v-for="budget in budgets"
            @expensing="(id) => (actionId = id)"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="budget.name"
            :name="budget.name"
            :current="budget.current"
            :limit="budget.limit"
            :expense_count="budget.expenses.length"
        />
    </div>
    <OrganizerModalBudgetEdit :context="actionContext" :update-id="actionId" />
    <OrganizerModalBudgetDelete :label="actionLabel" :id="actionId" />
    <OrganizerModalBudgetExpense :update-id="actionId" />
</template>

<script setup lang="ts">
import budgets from "@/assets/json/budgets.json";

definePageMeta({
    layout: "dashboard",
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
</script>
