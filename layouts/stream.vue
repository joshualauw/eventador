<template>
    <NuxtLayout name="default">
        <div class="flex flex-row h-screen">
            <div class="flex flex-col p-5 lg:p-14 w-full bg-backgroundPrimary">
                <label
                    for="chatbar"
                    class="flex lg:hidden btn btn-sm btn-ghost btn-circle w-12 h-12 p-2 absolute bottom-4 right-4"
                >
                    <Icon name="material-symbols:chat" class="w-6 h-6" />
                </label>
                <slot />
            </div>
            <AttendingStreamChatbar class="hidden lg:flex h-screen" />
            <input type="checkbox" id="chatbar" class="drawer-toggle" />
            <label class="overlay" for="chatbar"></label>
            <div class="drawer drawer-right max-w-[20rem]">
                <div class="p-0 flex flex-col">
                    <label for="chatbar" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <AttendingStreamChatbar class="h-screen" />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
