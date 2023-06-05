<template>
    <div class="fixed top-0 left-0 z-50 w-full flex-between px-8 md:px-36 py-4 bg-gray-800 text-gray-50">
        <div class="flex-center space-x-3">
            <img src="/images/eventador-logo.png" width="36" height="36" />
            <h2 class="text-xl font-bold tracking-widest">Eventador</h2>
        </div>
        <div class="flex-center space-x-4">
            <label for="login-modal" class="btn btn-primary">Sign In</label>
            <!-- <div class="flex space-x-3 text-sm">
                <div class="avatar avatar-ring">
                    <img src="images/default-user.png" alt="avatar" />
                </div>
                <div>
                    <p class="font-bold">Joshua William</p>
                    <p class="text-gray-400">joshualauw@gmail.com</p>
                </div>
            </div> -->
        </div>
        <input class="modal-state" id="login-modal" type="checkbox" />
        <ModalLogin />
    </div>
</template>
