<template>
    <Navbar class="px-8 xl:px-24" />
    <NuxtLayout name="default">
        <input type="checkbox" id="drawer-left" class="drawer-toggle" />
        <label class="overlay" for="drawer-left"></label>
        <div class="drawer">
            <div class="drawer-content pt-10 flex flex-col h-full">
                <label for="drawer-left" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <div class="mt-10">
                    <Sidebar />
                </div>
            </div>
        </div>
        <div class="flex web-container">
            <Sidebar class="w-72 fixed hidden md:block bg-backgroundSecondary p-4" />
            <div class="md:pl-[21.5rem] w-full">
                <slot></slot>
            </div>
        </div>
    </NuxtLayout>
</template>
