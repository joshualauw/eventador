<template>
    <div>
        <ul class="space-y-6 text-lg">
            <li v-for="item in items">
                <NuxtLink :to="item.link" class="nav-link" :class="$route.path == item.link ? 'bg-gray-200' : ''">
                    <Icon :name="item.icon" class="mr-4 w-6 h-6" />{{ item.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const items = [
    { name: "Home", link: "/", icon: "fa:home" },
    { name: "Explore", link: "/explore", icon: "fa:hashtag" },
    { name: "Manage Events", link: "/manage", icon: "material-symbols:event" },
    { name: "Following", link: "/following", icon: "fa:user" },
    { name: "Notifications", link: "/notification", icon: "fa:bell" },
    { name: "Profile", link: "/profile", icon: "material-symbols:settings" },
];
</script>
