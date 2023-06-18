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
                <td>{{ par.email }}</td>
                <td>{{ par.name }}</td>
                <td>
                    <span class="font-semibold" :class="getTypeColor(par.type)">{{ par.type }}</span>
                </td>
                <td>{{ par.joinedAt }}</td>
                <td>
                    <button
                        @click="navigateTo(`/dashboard/123/participant/${i}`)"
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
import participants from "@/assets/json/participants.json";
</script>
