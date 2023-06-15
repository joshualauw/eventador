<template>
    <UIModal modal-id="edit-sponsor-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Sponsor
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Sponsor Logo</label>
                <input type="file" class="input-file max-w-full" />
            </div>
            <div class="form-group">
                <label class="form-label">Sponsor Name</label>
                <input type="text" class="input max-w-full" placeholder="sponsor name.." />
            </div>
            <div class="form-group">
                <label class="form-label">Sponsor Description</label>
                <textarea class="textarea max-w-full h-36 resize-none" placeholder="sponsor description.."></textarea>
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
