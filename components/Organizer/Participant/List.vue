<template>
    <table class="table table-compact">
        <thead>
            <tr>
                <th>No</th>
                <th>Email</th>
                <th>Display Name</th>
                <th>Type</th>
                <th>Joined At</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(par, i) in participants">
                <th>{{ i + 1 }}</th>
                <td>
                    {{ userIsPremium(par.type) ? emailCensor(par.email) : par.email }}
                </td>
                <td>{{ par.name }}</td>
                <td>
                    <span class="font-semibold" :class="getTypeColor(par.type)">{{ par.type }}</span>
                </td>
                <td>{{ dayjs(par.joinedAt).format("DD-MM-YYYY") }}</td>
                <td>
                    <button
                        :disabled="loggedParticipant?.type != 'owner'"
                        @click="navigateTo(`/dashboard/${route.params.id}/participant/${par.id}`)"
                        class="btn btn-sm btn-solid-secondary"
                    >
                        Detail
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
    participants: { id: string; email: string; name: string; joinedAt: string; type: IParticipantType }[];
}>();

const route = useRoute();
const { loggedUser } = useAuthStore();
const { loggedParticipant } = useParticipantStore();

function userIsPremium(type: IParticipantType) {
    return type != "organizer" && type != "owner" && !loggedUser?.value?.is_premium;
}
</script>
