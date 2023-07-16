<template>
    <div class="w-full max-w-[18rem]">
        <aside class="sidebar bg-blue-3 text-gray-200 sidebar-fixed-left justify-start">
            <section class="sidebar-title text-gray-200 items-center space-x-3 p-4">
                <ClientOnly>
                    <img src="/images/logo/eventador-light.png" class="w-9 h-9" />
                </ClientOnly>
                <div class="flex flex-col">
                    <span class="tracking-wider text-lg">Eventador</span>
                    <span class="text-sm font-normal">Organizer Dashboard</span>
                </div>
            </section>
            <div class="divider"></div>
            <section class="sidebar-content h-full overflow-visible">
                <nav class="menu rounded-lg">
                    <section class="menu-section px-4">
                        <ul class="menu-items space-y-2">
                            <li
                                v-for="menu in menus.filter((m) => m.show)"
                                @click="navigateTo(menu.link)"
                                :class="getBordered(menu.link)"
                                class="menu-item text-base text-gray-200 hover:bg-neutral"
                            >
                                <Icon :name="menu.icon" /><span class="ml-2">{{ menu.name }}</span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </section>
            <section class="sidebar-footer h-full justify-end pt-2">
                <div class="divider my-0"></div>
                <div class="dropdown z-50 flex h-fit w-full cursor-pointer">
                    <label class="mx-2 flex h-fit w-full cursor-pointer p-0" tabindex="0">
                        <div class="flex flex-row gap-4 p-4">
                            <div class="avatar avatar-ring avatar-md">
                                <img :src="loggedUser?.profile || '/images/default-user.png'" alt="avatar" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-white">{{ loggedUser?.username }}</span>
                                <span class="text-xs font-normal text-gray-200">{{ loggedUser?.email }}</span>
                            </div>
                        </div>
                    </label>
                    <div class="dropdown-menu dropdown-menu-top-center ml-3">
                        <NuxtLink to="/" class="dropdown-item text-sm">Back to Home</NuxtLink>
                    </div>
                </div>
            </section>
        </aside>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const eventId = computed(() => router.currentRoute.value.params.id as string);

const { loggedParticipant } = useParticipantStore();
const { loggedUser } = useAuthStore();

function getBordered(link: string) {
    const splitLink = route.path.split("/");
    const splitRoute = link.split("/");
    return splitLink[splitLink.length - 1] == splitRoute[splitRoute.length - 1] ? "bg-neutral" : "";
}

const menus = [
    {
        icon: "material-symbols:bar-chart",
        name: "Overview",
        link: `/dashboard/${eventId.value}`,
        show: true,
    },
    {
        icon: "majesticons:user-group",
        name: "Participant",
        link: `/dashboard/${eventId.value}/participant`,
        show: true,
    },
    {
        icon: "uis:schedule",
        name: "Itinenary",
        link: `/dashboard/${eventId.value}/itinenary`,
        show: true,
    },
    {
        icon: "material-symbols:account-balance-wallet",
        name: "Budget",
        link: `/dashboard/${eventId.value}/budget`,
        show: true,
    },
    {
        icon: "mdi:hand-heart",
        name: "Sponsor",
        link: `/dashboard/${eventId.value}/sponsor`,
        show: true,
    },
    {
        icon: "material-symbols:edit-document-rounded",
        name: "Form Builder",
        link: `/dashboard/${eventId.value}/form`,
        show: true,
    },
    {
        icon: "mdi:certificate",
        name: "Certificate Builder",
        link: `/dashboard/${eventId.value}/certificate`,
        show: loggedParticipant.value?.type == "owner",
    },
    {
        icon: "material-symbols:settings",
        name: "Settings",
        link: `/dashboard/${eventId.value}/settings`,
        show: loggedParticipant.value?.type == "owner",
    },
];
</script>
