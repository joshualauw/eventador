<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Details</p>
            <p class="text-mute">Customize general information to tell what's your event about to your audience</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Details</p>
            <p class="text-content3">Customize general information to tell what's your event about to your audience</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-group">
                <label class="form-label">Event Banner</label>
                <div class="flex-center space-x-5">
                    <div class="shrink-0">
                        <img
                            class="object-contain w-56 lg:w-72 h-28 rounded-lg bg-gray-3"
                            src="/images/default-logo.png"
                            alt="profile_photo"
                        />
                    </div>
                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input
                            type="file"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:btn-solid-primary"
                        />
                    </label>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Event Name</label>
                <input placeholder="event name.." type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Event Description</label>
                <textarea placeholder="event description.." class="textarea h-44 resize-none max-w-full"></textarea>
            </div>
            <div class="form-field">
                <label class="form-label">Event Category</label>
                <select class="select">
                    <option value="all">Seminar</option>
                </select>
            </div>
            <div class="form-field">
                <label class="form-label">Event Price (Rp.)</label>
                <input placeholder="event price.." type="number" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Event Capacity</label>
                <input placeholder="event capacity.." type="number" class="input max-w-full" />
            </div>
            <button type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>
