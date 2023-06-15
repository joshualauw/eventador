<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Event Gallery</p>
            <p class="text-mute">
                Elevate your event with a stunning gallery, capturing the essence and memorable moments your event
            </p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Event Gallery</p>
            <p class="text-content3">
                Elevate your event with a stunning gallery, capturing the essence and memorable moments your event
            </p>
        </div>
        <form class="w-full md:w-2/3 space-y-5">
            <div class="form-group">
                <label class="form-label">Upload Images</label>
                <div class="flex-center space-x-2">
                    <input type="file" class="input-file max-w-full" />
                    <button type="button" class="btn btn-solid-secondary w-24">+ Add</button>
                </div>
            </div>
            <div class="grid grid-cols-2 xl:grid-cols-3 gap-5">
                <img v-for="i in 6" src="/images/default-logo.png" class="rounded-lg" />
            </div>
            <button type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>
