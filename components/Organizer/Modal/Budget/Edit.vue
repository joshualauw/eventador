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
            <div class="form-group pt-6">
                <button type="button" class="btn btn-primary btn-rounded w-full">Save</button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
defineProps<{ context: "update" | "create"; updateId?: string }>();
defineEmits<{ (e: "saved"): void }>();
</script>
