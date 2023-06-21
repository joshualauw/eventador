<template>
    <UIModal modal-id="edit-form-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Form
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Form Name</label>
                <input type="text" placeholder="form name.." class="input max-w-full" />
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
</script>
