<template>
    <div class="fixed top-0 left-0 z-50 w-full flex-between px-8 xl:px-24 py-4 bg-gray-800 text-gray-50">
        <div class="flex-center space-x-3">
            <label for="drawer-left" class="flex md:hidden btn btn-sm btn-ghost btn-circle text-white hover:text-black">
                <Icon name="material-symbols:menu" class="w-6 h-6" />
            </label>
            <img src="/images/eventador-logo.png" class="w-7 h-7 md:w-10 md:h-10" />
            <h2 class="text-lg md:text-xl font-bold tracking-widest">Eventador</h2>
        </div>
        <div class="flex-center space-x-4">
            <label for="login-modal" class="btn btn-sm md:btn-md btn-primary">Sign In</label>
            <!-- <div class="dropdown">
                <label class="flex space-x-3 text-sm cursor-pointer" tabindex="0">
                    <div class="avatar avatar-sm md:avatar-md avatar-ring">
                        <img src="images/default-user.png" alt="avatar" />
                    </div>
                    <div class="hidden md:block">
                        <p class="font-bold">Joshua William</p>
                        <p class="text-gray-300">joshualauw@gmail.com</p>
                    </div>
                </label>
                <div class="dropdown-menu bg-white mt-3 w-40 md:w-full text-black dropdown-menu-bottom-left">
                    <a class="dropdown-item text-sm">Profile</a>
                    <a class="dropdown-item text-sm">Log Out</a>
                </div>
            </div> -->
        </div>
        <ModalLogin />
    </div>
</template>
