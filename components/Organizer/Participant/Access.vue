<template>
    <div>
        <h1 class="font-semibold text-lg mb-6">Organizer Access</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Grant</th>
                    <th>Access Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="acc in access">
                    <th>
                        <input type="checkbox" class="checkbox checkbox-bordered-secondary checkbox-secondary" />
                    </th>
                    <td>{{ acc.name }}</td>
                    <td>{{ acc.description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
const access = ref([
    {
        name: "Budget",
        description: "grant access to view or edit budgets in budget page",
    },
    {
        name: "Itinenary",
        description: "grant access to view or edit itinenaries in itinenary page",
    },
    {
        name: "Sponsor",
        description: "grant access to view or edit sponsors in sponsor page",
    },
    {
        name: "Form",
        description: "grant access to view or edit forms in form page",
    },
]);
</script>
