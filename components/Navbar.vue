<template>
    <div class="fixed top-0 left-0 z-50 w-full flex-between text-gray-200 py-4 bg-blue-3">
        <div class="flex-center space-x-4">
            <label for="drawer-left" class="flex md:hidden btn btn-sm btn-ghost btn-circle text-white hover:text-black">
                <Icon name="material-symbols:menu" class="w-6 h-6" />
            </label>
            <img @click="navigateTo('/')" src="/images/logo/eventador-light.png" class="w-10 h-10 cursor-pointer" />
            <h2 class="hidden md:block md:text-xl font-bold tracking-widest">Eventador</h2>
        </div>
        <div class="flex-center space-x-4">
            <label v-if="!loggedUser" for="login-modal" class="btn btn-sm md:btn-md btn-primary"> Sign In </label>
            <div v-else>
                <label
                    @click="navigateTo('/settings')"
                    class="flex-center space-x-3 text-sm cursor-pointer"
                    tabindex="0"
                >
                    <div class="avatar avatar-sm lg:avatar-md avatar-ring">
                        <img :src="loggedUser.profile ?? '/images/default-user.png'" alt="avatar" />
                    </div>
                    <div class="hidden md:block">
                        <p class="font-bold">{{ loggedUser.username }}</p>
                        <p class="text-gray-300">{{ loggedUser.email }}</p>
                    </div>
                </label>
            </div>
        </div>
        <ModalLogin />
    </div>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
</script>
