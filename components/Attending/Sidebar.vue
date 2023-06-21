<template>
    <div class="w-full max-w-[18rem]">
        <aside class="sidebar bg-green-900 text-gray-100 sidebar-fixed-left justify-start">
            <section class="sidebar-title text-gray-100 items-center space-x-3 p-4">
                <ClientOnly>
                    <img src="/images/logo/eventador-light.png" class="w-9 h-9" />
                </ClientOnly>
                <div class="flex flex-col">
                    <span class="tracking-wider text-lg">Eventador</span>
                    <span class="font-normal">Event Lounge</span>
                </div>
                <DarkMode />
            </section>
            <div class="divider"></div>
            <section class="sidebar-content h-full overflow-visible">
                <nav class="menu rounded-lg">
                    <section class="menu-section px-4">
                        <ul class="menu-items space-y-2">
                            <li
                                v-for="menu in menus"
                                @click="navigateTo(menu.link)"
                                :class="getBordered(menu.link)"
                                class="menu-item text-gray-100 text-base hover:bg-green-700"
                            >
                                <Icon :name="menu.icon" /><span class="ml-2">{{ menu.name }}</span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </section>
            <section class="sidebar-footer justify-end">
                <div class="divider my-0"></div>
                <div class="dropdown z-50 flex h-fit w-full cursor-pointer">
                    <label class="mx-2 flex h-fit w-full cursor-pointer p-0" tabindex="0">
                        <div class="flex flex-row gap-4 p-4">
                            <div class="avatar avatar-ring avatar-md">
                                <img src="/images/default-user.png" alt="avatar" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-white">Joshua William</span>
                                <span class="text-xs font-normal text-gray-100">@joshualauw</span>
                            </div>
                        </div>
                    </label>
                    <div class="dropdown-menu dropdown-menu-top-center ml-3">
                        <NuxtLink to="/" class="dropdown-item text-sm">Profile</NuxtLink>
                        <NuxtLink to="/" class="dropdown-item text-sm">Settings</NuxtLink>
                        <NuxtLink to="/" class="dropdown-item text-sm">Back to Home</NuxtLink>
                    </div>
                </div>
            </section>
        </aside>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

function getBordered(link: string) {
    const splitLink = route.path.split("/");
    const splitRoute = link.split("/");
    return splitLink[splitLink.length - 1] == splitRoute[splitRoute.length - 1] ? "bg-green-700" : "";
}

const menus = [
    {
        icon: "material-symbols:chat-outline",
        name: "Group Chat",
        link: `/attending/123`,
    },
    {
        icon: "material-symbols:info",
        name: "Overview",
        link: `/attending/123/overview`,
    },
    {
        icon: "material-symbols:live-tv",
        name: "Livestream",
        link: `/attending/123/stream`,
    },
];
</script>
