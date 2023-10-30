<template>
    <UIModal v-slot="{ setOpen }" modal-id="edit-sponsor-modal">
        <h2 class="text-center text-xl font-semibold text-content1">
            {{ context == "create" ? "Create" : "Edit" }} Sponsor
        </h2>
        <form class="space-y-2 mt-4">
            <div class="form-group">
                <label class="form-label">Sponsor Logo</label>
                <input @change="handleFileChange" type="file" class="input-file max-w-full" />
            </div>
            <div class="form-group">
                <label class="form-label">Sponsor Name</label>
                <input v-model="sponsorState.name" type="text" class="input max-w-full" placeholder="sponsor name.." />
            </div>
            <div class="form-group">
                <label class="form-label">Sponsor Funds (Rp.)</label>
                <input
                    v-model="sponsorState.funds"
                    type="number"
                    class="input max-w-full"
                    placeholder="sponsor funds.."
                />
            </div>
            <div class="form-group">
                <label class="form-label">Sponsor Description</label>
                <textarea
                    v-model="sponsorState.description"
                    class="textarea max-w-full h-36 resize-none"
                    placeholder="sponsor description.."
                ></textarea>
            </div>
            <UIErrors v-if="error" :errors="errors" :message="error.message" class="my-6" />
            <div class="form-group pt-6">
                <button
                    @click="saveSponsor(setOpen)"
                    type="button"
                    class="btn btn-primary w-full"
                    :class="{ 'btn-loading': pending }"
                >
                    Save
                </button>
            </div>
        </form>
    </UIModal>
</template>

<script setup lang="ts">
import { TYPE } from "vue-toastification";

const props = defineProps<{ context: "update" | "create"; updateId: string }>();
const emits = defineEmits<{ (e: "saved"): void }>();

const route = useRoute();
const { getOneSponsor, createSponsor, updateSponsor } = useSponsorStore();
const { mutate: createMutate, error, errors, pending } = useMutate(createSponsor);
const { mutate: updateMutate } = useMutate(updateSponsor);

const { value: sponsorState, reset } = useStateHandler({
    logo: null as File | null,
    name: "",
    description: "",
    funds: 0,
});

watch(
    () => props.updateId,
    async (val) => {
        error.value = null;
        errors.value = [];

        if (props.context == "update") {
            const res = await getOneSponsor(val);
            if (res) {
                sponsorState.name = res.data.name;
                sponsorState.description = res.data.description;
                sponsorState.funds = res.data.funds;
            }
        } else {
            reset();
        }
    }
);

async function saveSponsor(setOpen: (state: boolean) => void) {
    if (props.context == "create") {
        const res = await createMutate(route.params.id as string, sponsorState);
        if (res.status) {
            emits("saved");
            reset();
            setOpen(false);
        }
    }
    if (props.context == "update") {
        pending.value = true;
        const res = await updateMutate(props.updateId, sponsorState);
        pending.value = false;
        if (res.status) {
            emits("saved");
            setOpen(false);
        } else {
            error.value = res.error;
            errors.value = [];
            errors.value.push(...res.errors);
        }
    }
}

const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /\.(jpe?g|png|gif)$/i.test(file.name)) {
        sponsorState.logo = file;
    } else {
        createToast("file should be an image!", TYPE.ERROR);
    }
};
</script>
