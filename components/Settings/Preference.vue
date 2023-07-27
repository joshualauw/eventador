<template>
    <div class="flex flex-col md:flex-row md:space-x-5 w-full">
        <div class="block md:hidden mb-8">
            <p class="font-semibold text-xl">Preferences</p>
            <p class="text-mute">Switch Theme to your likings and control system notifications</p>
        </div>
        <div class="hidden md:block md:w-1/3">
            <p class="font-semibold text-lg">Preferences</p>
            <p class="text-content3">Switch Theme to your likings and control system notifications</p>
        </div>
        <form class="w-full md:w-2/3 form-group space-y-4">
            <div class="form-field">
                <label class="form-label">Theme</label>
                <select v-model="preferenceState.theme" class="select max-w-full">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div class="form-field">
                <label class="form-label">Notifications</label>
                <div class="flex flex-col">
                    <span v-for="notf in notificationsType">
                        <input v-model="notf.selected" type="checkbox" class="mr-1" />
                        {{ notf.name }}
                    </span>
                </div>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-8" />
            <button
                @click="mutate(preferenceState)"
                type="button"
                class="btn btn-primary w-fit"
                :class="{ 'btn-loading': pending }"
            >
                Save
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
const { savePreferences, loggedUser } = useAuthStore();

const { mutate, error, pending, errors } = useMutate(savePreferences);
const userNotifications = computed(() => loggedUser.value?.preferences.notifications ?? []);

const notificationsType = reactive([
    {
        key: "user:following",
        name: "New Follower",
        selected: userNotifications.value.includes("user:following") || false,
    },
    {
        key: "user:new_event",
        name: "Followed users new event",
        selected: userNotifications.value.includes("user:new_event") || false,
    },
    {
        key: "user:event_join",
        name: "User joined event",
        selected: userNotifications.value.includes("user:event_join") || false,
    },
    {
        key: "user:transaction",
        name: "Track Transaction",
        selected: userNotifications.value.includes("user:transaction") || false,
    },
]);

const preferenceState = reactive({
    theme: loggedUser.value?.preferences.theme || ("light" as "light" | "dark"),
    notifications: userNotifications.value || ([] as string[]),
});

watch(preferenceState, (state) => {
    if (loggedUser.value) {
        if (state.theme == "dark") {
            loggedUser.value.preferences.theme = "dark";
        } else {
            loggedUser.value.preferences.theme = "light";
        }
    }
});

watch(notificationsType, (state) => {
    //@ts-ignore
    preferenceState.notifications = state.filter((notf) => notf.selected).map((notf) => notf.key);
});
</script>
