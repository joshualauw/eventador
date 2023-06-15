<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Location</p>
            <p class="text-mute">
                Launch your event in real world venue? complete the maps detail to ease your audience navigation.
            </p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Location</p>
            <p class="text-content3">
                Launch your event in real world venue? complete the maps detail to ease your audience navigation.
            </p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <UIMap :latitude="-7.291157003579892" :longitude="112.75878608015607" class="w-full h-60 rounded-xl" />
            <div class="form-group">
                <label class="form-label">Location Name (full address)</label>
                <input type="text" placeholder="location name.." class="input max-w-full" />
            </div>
            <div class="form-group">
                <label class="form-label">Venue Name</label>
                <input type="text" placeholder="venue name.." class="input max-w-full" />
            </div>
            <div class="form-group">
                <label class="form-label">Latitude & Longitude</label>
                <div class="flex-center space-x-2">
                    <input type="number" placeholder="latitude" class="input max-w-full" />
                    <input type="number" placeholder="longitude" class="input max-w-full" />
                    <button type="button" class="btn btn-solid-secondary">Apply</button>
                </div>
            </div>
            <button type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>
