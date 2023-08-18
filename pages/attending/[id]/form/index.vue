<template>
    <div>
        <p v-if="forms?.data.length == 0" class="text-center mt-8">-no forms to fill-</p>
        <h1 v-else class="text-lg font-semibold mb-8">Please Fill this Forms Below!</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            <AttendingFormItem
                v-for="form in forms?.data"
                :id="form._id"
                :name="form.name"
                :response_length="form.responses.length"
                :fields_length="form.fields.length"
                :is_filled="form.responses.map((r) => r.email).includes(loggedUser?.email || '')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "attending",
    middleware: ["auth", "participant"],
});

const route = useRoute();
const { loggedUser } = useAuthStore();
const { getAllForm } = useFormStore();
const { data: forms } = await useAsyncData("getAllForm", () => getAllForm(route.params.id as string, { open: true }));
</script>
