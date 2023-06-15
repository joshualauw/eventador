<template>
    <NuxtLayout name="default">
        <div class="flex flex-row">
            <OrganizerSidebar class="hidden lg:flex" />
            <input type="checkbox" id="organizer-drawer-left" class="drawer-toggle" />
            <label class="overlay" for="organizer-drawer-left"></label>
            <div class="drawer max-w-[18rem]">
                <div class="drawer-content pt-10 flex flex-col h-full">
                    <label for="organizer-drawer-left" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >✕</label
                    >
                    <div class="mt-10">
                        <OrganizerSidebar />
                    </div>
                </div>
            </div>
            <div class="flex flex-col px-6 md:px-12 py-6 md:py-8 w-full bg-backgroundPrimary">
                <label for="organizer-drawer-left" class="flex lg:hidden btn btn-sm btn-ghost btn-circle mb-3">
                    <Icon name="material-symbols:menu" class="w-6 h-6" />
                </label>
                <slot />
            </div>
        </div>
    </NuxtLayout>
</template>
