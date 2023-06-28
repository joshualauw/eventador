<template>
    <UIModal modal-id="create-event-modal">
        <div class="flex flex-col gap-2">
            <h2 class="text-center text-2xl font-semibold text-content1">Create Event</h2>
            <p class="mx-auto max-w-xs text-sm text-content2">Create and Manage your own event</p>
        </div>
        <div class="form-group">
            <div class="form-field">
                <label class="form-label">Name</label>
                <input placeholder="Event name" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Start Date</label>
                <input type="date" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Category</label>
                <select class="select max-w-full">
                    <option value="seminar">Seminar</option>
                </select>
            </div>
            <p class="text-mute">* you can edit event details later</p>
            <div class="form-field pt-5">
                <div class="form-control justify-between">
                    <button type="button" class="btn btn-primary w-full">Create Now</button>
                </div>
            </div>
        </div>
    </UIModal>
</template>
