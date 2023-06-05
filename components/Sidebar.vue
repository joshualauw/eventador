<template>
    <div class="w-60 fixed">
        <ul class="space-y-6 text-lg">
            <li v-for="item in items">
                <NuxtLink :to="item.link" class="nav-link" :class="item.active ? 'bg-gray-200' : ''">
                    <Icon :name="item.icon" class="mr-4 w-6 h-6" />{{ item.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const items = ref([
    { name: "Home", link: "/", icon: "fa:home", active: true },
    { name: "Explore", link: "/", icon: "fa:hashtag", active: false },
    { name: "Upcoming", link: "/", icon: "material-symbols:calendar-month", active: false },
    { name: "Manage Events", link: "/", icon: "material-symbols:event", active: false },
    { name: "Profile", link: "/", icon: "material-symbols:settings", active: false },
]);
</script>
