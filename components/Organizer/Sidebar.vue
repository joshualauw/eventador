<template>
    <div class="w-full max-w-[18rem]">
        <aside class="sidebar bg-gray-3 border border-gray-4 text-content1 sidebar-fixed-left justify-start">
            <section class="sidebar-title items-center space-x-3 p-4">
                <ClientOnly>
                    <img :src="logoColor" class="w-9 h-9" />
                </ClientOnly>
                <div class="flex flex-col">
                    <span class="tracking-wider text-lg">Eventador</span>
                    <span class="text-sm font-normal">Organizer Dashboard</span>
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
                                class="menu-item text-base"
                            >
                                <Icon :name="menu.icon" /><span class="ml-2">{{ menu.name }}</span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </section>
            <section class="sidebar-footer h-full justify-end pt-2">
                <div class="divider my-0"></div>
                <div class="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
                    <label class="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabindex="0">
                        <div class="flex flex-row gap-4 p-4">
                            <div class="avatar avatar-ring avatar-md">
                                <img src="/images/default-user.png" alt="avatar" />
                            </div>
                            <div class="flex flex-col">
                                <span>Joshua William</span>
                                <span class="text-xs font-normal text-content2">@joshualauw</span>
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
const colorMode = useColorMode();

const logoColor = computed(() =>
    colorMode.value == "light" ? "/images/logo/eventador-dark.png" : "/images/logo/eventador-light.png"
);
const route = useRoute();

function getBordered(link: string) {
    const splitLink = route.path.split("/");
    const splitRoute = link.split("/");
    return splitLink[splitLink.length - 1] == splitRoute[splitRoute.length - 1] ? "bg-border" : "";
}

const menus = [
    {
        icon: "material-symbols:bar-chart",
        name: "Overview",
        link: `/dashboard/123`,
    },
    {
        icon: "majesticons:user-group",
        name: "Participant",
        link: `/dashboard/123/participant`,
    },
    {
        icon: "uis:schedule",
        name: "Itinenary",
        link: `/dashboard/123/itinenary`,
    },
    {
        icon: "material-symbols:account-balance-wallet",
        name: "Budget",
        link: `/dashboard/123/budget`,
    },
    {
        icon: "mdi:hand-heart",
        name: "Sponsor",
        link: `/dashboard/123/sponsor`,
    },
    {
        icon: "material-symbols:edit-document-rounded",
        name: "Form Builder",
        link: `/dashboard/123/form`,
    },
    {
        icon: "mdi:certificate",
        name: "Certificate Builder",
        link: `/dashboard/123/certificate`,
    },
    {
        icon: "material-symbols:settings",
        name: "Settings",
        link: `/dashboard/123/settings`,
    },
];
</script>
