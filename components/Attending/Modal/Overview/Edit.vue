<template>
    <UIModal classes="max-w-[700px]" modal-id="edit-overview-modal">
        <h2 class="text-center text-xl font-semibold text-content1">Edit Overview</h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Overview Description</label>
                <textarea class="textarea w-full h-64" placeholder="description.."></textarea>
            </div>
            <div class="form-group pt-6">
                <button type="button" class="btn btn-primary w-full">Save</button>
            </div>
        </form>
    </UIModal>
</template>
