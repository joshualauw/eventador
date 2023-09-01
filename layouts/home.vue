<template>
    <NuxtLayout name="default">
        <div>
            <Navbar class="px-6 xl:px-24" />
            <input type="checkbox" id="drawer-left" class="drawer-toggle" />
            <label class="overlay" for="drawer-left"></label>
            <div class="drawer max-w-[288px]">
                <div class="drawer-content pt-10 flex flex-col h-full">
                    <label for="drawer-left" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <div class="mt-10">
                        <Sidebar />
                    </div>
                </div>
            </div>
            <div class="flex web-container">
                <Sidebar class="w-72 h-[550px] fixed hidden md:block border-r-2 border-gray-5 pr-5" />
                <div class="md:pl-[21.5rem] w-full">
                    <slot></slot>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
