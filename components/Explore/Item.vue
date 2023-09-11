<template>
    <UILoader v-if="pending" />
    <div class="card card-image-cover">
        <img
            @click="navigateTo(`/event/${id}`)"
            :src="banner ?? '/images/default-post.png'"
            alt="card_image"
            class="cursor-pointer hover:brightness-75 min-h-[175px]"
        />
        <div class="card-body h-full pt-2 px-6">
            <NuxtLink :to="`/event/${id}`" class="card-header text-lg font-bold cursor-pointer hover:underline">
                {{ name }}
            </NuxtLink>
            <div class="space-y-0.5 text-sm font-semibold">
                <p class="text-secondary">{{ dayjs(date).format("ddd, DD MMM YYYY") }}</p>
                <p class="text-gray-500">{{ location_name }}</p>
                <p class="text-primary">{{ slot }} Max Participants</p>
            </div>
            <div class="badge badge-primary w-fit">{{ category }}</div>
            <div class="card-footer justify-end space-x-2 mt-2">
                <button v-if="loggedUser" @click="addToWishlist" class="btn btn-solid-error">
                    <Icon :name="is_wishlist ? 'fa:heart' : 'fa:heart-o'" />
                </button>
                <button class="btn btn-solid-success btn-no-animation">Rp. {{ formatNumber(price) }}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
    id: string;
    name: string;
    price: number;
    banner?: string;
    category: string;
    location_name: string;
    is_wishlist?: boolean;
    slot: number;
    date: string;
}>();
const emits = defineEmits<{ (e: "wishlisted", id: string): void }>();

const { wishlistEvent } = useEventStore();
const { loggedUser } = useAuthStore();
const { mutate, pending } = useMutate(wishlistEvent);

async function addToWishlist() {
    const res = await mutate(props.id);
    if (res.status) {
        emits("wishlisted", props.id);
    }
}
</script>
