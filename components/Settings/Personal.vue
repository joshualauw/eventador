<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Personal Information</p>
            <p class="text-mute">Use a permanent address where you can receive email</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Personal Information</p>
            <p class="text-content3">Use a permanent email address where you can receive email</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-group">
                <label class="form-label">Profile Photo</label>
                <div class="flex-center space-x-5">
                    <div class="shrink-0">
                        <img
                            class="object-cover w-20 h-20 rounded-full"
                            src="/images/default-camera.png"
                            alt="profile_photo"
                        />
                    </div>
                    <label class="block">
                        <span class="sr-only">Choose File</span>
                        <input
                            type="file"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:btn-solid-primary"
                        />
                    </label>
                </div>
            </div>
            <div class="form-field">
                <label class="form-label">Username</label>
                <input placeholder="username" type="text" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Email Address</label>
                <input placeholder="mail@example.com" type="email" class="input max-w-full" />
            </div>
            <div class="form-field">
                <label class="form-label">Phone Number</label>
                <input placeholder="phone number.." type="text" class="input max-w-full" />
            </div>
            <button type="button" class="btn btn-primary w-fit">Save</button>
        </form>
    </div>
</template>
