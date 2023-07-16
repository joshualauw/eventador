<template>
    <UIModal v-slot="{ setOpen }" modal-id="ban-participant-modal">
        <div class="flex flex-col text-center gap-2">
            <div
                v-if="context == 'ban'"
                class="flex-box rounded-full w-14 h-14 p-4 btn btn-solid-error btn-no-animation self-center mb-4"
            >
                <Icon name="fa:trash" class="w-7 h-7" />
            </div>
            <h2 class="text-center text-lg font-semibold text-content1">Confirm {{ context }}</h2>
            <p v-if="context == 'ban'" class="mx-auto max-w-xs text-sm text-content2">
                Are you sure you want to ban <span class="font-bold">{{ label }}?</span> banned participant cannot
                access your event
            </p>
            <p v-if="context == 'unban'" class="mx-auto max-w-xs text-sm text-content2">
                unban <span class="font-bold">{{ label }}?</span> now?
            </p>
            <button
                @click="doBanParticipant(setOpen)"
                class="btn btn-error mt-4"
                :class="{ 'btn-loading': pending, 'btn-warning': context == 'unban' }"
            >
                Yes, {{ context }}
            </button>
        </div>
    </UIModal>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string; label: string; context: "ban" | "unban" }>();
const emits = defineEmits<{ (e: "banned"): void }>();

const { banParticipant } = useParticipantStore();
const { mutate, pending } = useMutate(banParticipant);

async function doBanParticipant(setOpen: (state: boolean) => void) {
    const res = await mutate(props.id);
    if (res.status) {
        emits("banned");
        setOpen(false);
    }
}
</script>
