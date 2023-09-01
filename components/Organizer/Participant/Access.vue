<template>
    <div>
        <UILoader v-if="pending" />
        <div class="w-full overflow-x-auto">
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
                            <input
                                v-model="acc.selected"
                                type="checkbox"
                                class="checkbox checkbox-bordered-secondary checkbox-secondary"
                            />
                        </th>
                        <td>{{ acc.name }}</td>
                        <td>{{ acc.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="doGrantAccess" type="button" class="btn btn-primary mt-4">Save</button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; access: IAccess[] }>();

const { grantAccess } = useParticipantStore();
const { pending, mutate } = useMutate(grantAccess);
const accessState = ref<IAccess[]>([]);

async function doGrantAccess() {
    await mutate(props.id, { access: accessState.value });
}

const access = reactive([
    {
        key: "sponsor",
        name: "Sponsor",
        description: "grant access to view or edit sponsors in sponsor page",
        selected: props.access.includes("sponsor") || false,
    },
    {
        key: "budget",
        name: "Budget",
        description: "grant access to view or edit budgets in budget page",
        selected: props.access.includes("budget") || false,
    },
    {
        key: "itinenary",
        name: "Itinenary",
        description: "grant access to view or edit itinenaries in itinenary page",
        selected: props.access.includes("itinenary") || false,
    },
    {
        key: "form",
        name: "Form",
        description: "grant access to view or edit forms in form page",
        selected: props.access.includes("form") || false,
    },
]);

watch(access, (state) => {
    //@ts-ignore
    accessState.value = state.filter((acc) => acc.selected).map((acc) => acc.key);
    console.log(accessState.value);
});
</script>
