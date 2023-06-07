<template>
    <NuxtLayout name="default">
        <input type="checkbox" id="drawer-left" class="drawer-toggle" />
        <label for="drawer-left" class="btn btn-primary">Open Left</label>
        <label class="overlay" for="drawer-left"></label>
        <div class="drawer">
            <div class="drawer-content pt-10 flex flex-col h-full">
                <label for="drawer-left" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <div class="mt-10">
                    <Sidebar />
                </div>
            </div>
        </div>
        <div class="flex px-8 xl:px-24 pt-16 pb-8 xl:pb-16 xl:pt-24">
            <Sidebar class="w-60 fixed hidden md:block" />
            <div class="md:pl-[20rem] w-full">
                <slot></slot>
            </div>
        </div>
    </NuxtLayout>
</template>
