<template>
    <DataTable :headers="headers" :items="items" table-class-name="customize-table" />
</template>

<script lang="ts">
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({
    setup() {
        const headers: Header[] = [
            { text: "Name", value: "name" },
            { text: "Height (cm)", value: "height", sortable: true },
            { text: "Weight (kg)", value: "weight", sortable: true },
            { text: "Age", value: "age", sortable: true },
        ];
        const items: Item[] = [
            { name: "Curry", height: 178, weight: 77, age: 20 },
            { name: "James", height: 180, weight: 75, age: 21 },
            { name: "Jordan", height: 181, weight: 73, age: 22 },
        ];
        return {
            headers,
            items,
        };
    },
});
</script>

<style scoped>
.customize-table {
    --easy-table-border: 0.5px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #2d3a4f;

    --easy-table-body-row-font-color: rgb(var(--content1) / var(--tw-text-opacity));
    --easy-table-body-row-background-color: rgb(var(--backgroundPrimary) / var(--tw-bg-opacity));
    --easy-table-body-row-height: 40px;
    --easy-table-body-row-font-size: 13px;

    --easy-table-body-item-padding: 8px 14px;

    --easy-table-footer-font-color: rgb(var(--content1) / var(--tw-text-opacity));
    --easy-table-footer-background-color: rgb(var(--backgroundPrimary) / var(--tw-bg-opacity));
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 80px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;

    --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
