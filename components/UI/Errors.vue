<template>
    <div class="alert alert-error p-4">
        <Icon name="material-symbols:warning" class="text-error w-7 h-7" />
        <div class="flex flex-col ml-2 text-sm">
            <span class="font-semibold text-content1 mb-1">{{ message }}</span>
            <span v-for="err in errors" class="text-content2"> - {{ err }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ errors: string[]; message: string }>();
</script>
