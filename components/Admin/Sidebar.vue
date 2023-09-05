<template>
    <div class="w-full max-w-[18rem]">
        <aside class="sidebar bg-fuchsia-900 text-gray-100 sidebar-fixed-left justify-start">
            <section class="sidebar-title text-gray-100 items-center space-x-3 p-4">
                <ClientOnly>
                    <img src="/images/logo/eventador-light.png" class="w-9 h-9" />
                </ClientOnly>
                <div class="flex flex-col">
                    <span class="tracking-wider text-lg">Eventador</span>
                    <span class="font-normal">Admin Dashboard</span>
                </div>
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
                                class="menu-item text-gray-100 text-base hover:bg-fuchsia-950"
                            >
                                <Icon :name="menu.icon" /><span class="ml-2">{{ menu.name }}</span>
                            </li>
                        </ul>
                    </section>
                </nav>
            </section>
            <section class="sidebar-footer h-full justify-end pb-12 md:pb-2">
                <div class="divider my-0"></div>
                <div class="dropdown z-50 flex h-fit w-full cursor-pointer">
                    <label class="mx-2 flex h-fit w-full cursor-pointer p-0" tabindex="0">
                        <div class="flex flex-row gap-4 p-4">
                            <div class="avatar avatar-ring avatar-md">
                                <img :src="loggedUser?.profile || '/images/default-user.png'" alt="avatar" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-white">{{ loggedUser?.username }}</span>
                                <span class="text-xs font-normal text-gray-100">{{ loggedUser?.email }}</span>
                            </div>
                        </div>
                    </label>
                    <div class="dropdown-menu dropdown-menu-top-center ml-3">
                        <NuxtLink to="/home" class="dropdown-item text-sm">Back to Home</NuxtLink>
                    </div>
                </div>
            </section>
        </aside>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { loggedUser } = useAuthStore();

function getBordered(link: string) {
    const splitLink = route.path.split("/");
    const splitRoute = link.split("/");
    return splitLink[splitLink.length - 1] == splitRoute[splitRoute.length - 1] ? "bg-fuchsia-950" : "";
}

const menus = [
    {
        icon: "material-symbols:info",
        name: "Overview",
        link: `/dashboard/admin`,
    },
    {
        icon: "majesticons:user-group",
        name: "Users",
        link: `/dashboard/admin/user`,
    },
    {
        icon: "material-symbols:post-add",
        name: "Posts",
        link: `/dashboard/admin/post`,
    },
    {
        icon: "material-symbols:event",
        name: "Events",
        link: `/dashboard/admin/event`,
    },
];
</script>
