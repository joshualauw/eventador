<template>
    <div class="popover">
        <button class="btn btn-md lg:btn-lg btn-primary popover-trigger">
            <Icon name="material-symbols:filter-alt" />
        </button>
        <div
            class="popover-content bg-backgroundSecondary shadow-md border popover-bottom-left w-[350px] lg:w-[450px] mt-1"
            tabindex="0"
        >
            <div class="p-3 text-sm space-y-3">
                <h2 class="text-lg font-semibold">Filter & Search</h2>
                <div class="rounded-full flex-center">
                    <Icon name="fa:search" class="w-5 h-5 mr-2 text-gray-500" />
                    <input
                        v-model="query.keyword"
                        type="text"
                        class="input input-sm lg:input-md max-w-full"
                        placeholder="keyword.."
                    />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:globe" class="w-5 h-5 mr-2 text-gray-500" />
                    <input
                        v-model="query.location"
                        type="text"
                        class="input input-sm lg:input-md max-w-full"
                        placeholder="location.."
                    />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:caret-down" class="w-5 h-5 mr-2 text-gray-500" />
                    <select v-model="query.category" class="select select-sm lg:select-md">
                        <option value="">All</option>
                        <option v-for="cat in categories" :value="cat.key">{{ cat.name }}</option>
                    </select>
                </div>
                <div class="divider divider-horizontal"></div>
                <div class="rounded-full flex-center">
                    <span class="font-semibold mr-2 text-gray-500">Rp.</span>
                    <input
                        v-model="query.start_price"
                        type="number"
                        class="input input-sm lg:input-md mr-1"
                        placeholder="Start price.."
                    />
                    <input
                        v-model="query.end_price"
                        type="number"
                        class="input input-sm lg:input-md"
                        placeholder="End price.."
                    />
                </div>
                <div class="rounded-full flex-center">
                    <Icon name="fa:calendar" class="w-8 h-8 mr-4 text-gray-500" />
                    <input
                        v-model="query.start_date"
                        type="date"
                        class="input input-sm lg:input-md mr-1"
                        placeholder="Start date.."
                    />
                    <input
                        v-model="query.end_date"
                        type="date"
                        class="input input-sm lg:input-md"
                        placeholder="End date.."
                    />
                </div>
                <div class="flex w-full justify-end space-x-1.5">
                    <button @click="emits('cleared')" class="btn btn-sm lg:btn-md btn-solid-error flex-center">
                        Clear <Icon name="heroicons:x-mark" class="ml-1 w-4 h-4" />
                    </button>
                    <button @click="emits('filtered')" class="btn btn-sm lg:btn-md btn-solid-primary">Apply</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import categories from "@/assets/json/categories.json";

const emits = defineEmits<{ (e: "filtered"): void; (e: "cleared"): void }>();

const { exploreEventQuery: query } = useEventStore();
</script>
