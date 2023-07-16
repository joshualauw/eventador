<template>
    <div class="flex-between mb-8">
        <h1 class="font-semibold text-lg">Budgets</h1>
        <label v-if="accessible" @click="handleCreating" for="edit-budget-modal" class="btn btn-primary"
            >+ Create Budget</label
        >
    </div>
    <p v-if="budgets && budgets.data.length == 0" class="text-center font-semibold text-lg text-content2 mt-8">
        -no budgets-
    </p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <OrganizerBudgetItem
            v-for="budget in budgets?.data"
            @editing="handleUpdating"
            @deleting="handleDeleting"
            :id="budget._id"
            :name="budget.name"
            :limit="budget.limit"
            :expenses="budget.expenses"
        />
    </div>
    <OrganizerModalBudgetEdit @saved="refresh" :context="actionContext" :update-id="actionId" />
    <OrganizerModalBudgetDelete @deleted="refresh" :label="actionLabel" :id="actionId" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "participant",
});

const { actionContext, actionId, actionLabel, handleCreating, handleDeleting, handleUpdating } = useCrudManager();
const { loggedParticipant } = useParticipantStore();
const { getAllBudget } = useBudgetStore();
const route = useRoute();

const accessible = computed(
    () => loggedParticipant.value?.access.includes("budget") || loggedParticipant.value?.type == "owner"
);

const { data: budgets, refresh } = await useAsyncData("getAllBudget", () => getAllBudget(route.params.id as string));
</script>
