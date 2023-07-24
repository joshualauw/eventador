<template>
    <ul class="space-y-6 text-lg">
        <li v-for="item in items">
            <NuxtLink
                v-if="item.auth ? logged : true"
                :to="item.link"
                class="nav-link"
                :class="$route.path == item.link ? 'bg-border' : ''"
            >
                <Icon :name="item.icon" class="mr-4 w-6 h-6" />{{ item.name }}
            </NuxtLink>
        </li>
        <li v-if="logged && !logged?.is_premium">
            <NuxtLink to="/premium" class="nav-link text-warning">
                <Icon name="mdi:crown" class="mr-4 w-6 h-6" />Premium
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
const { loggedUser } = useAuthStore();
const logged = computed(() => loggedUser.value);

const items = [
    { name: "Home", link: "/", icon: "fa:home" },
    { name: "Explore", link: "/explore", icon: "fa:hashtag" },
    { name: "Events", link: "/manage", icon: "material-symbols:event", auth: true },
    { name: "Following", link: "/following", icon: "fa:user" },
    { name: "Notifications", link: "/notification", icon: "fa:bell", auth: true },
    { name: "Settings", link: "/settings", icon: "material-symbols:settings", auth: true },
];
</script>
