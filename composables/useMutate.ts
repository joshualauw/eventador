export function useMutate<T, V extends any[]>(callback: AsyncFunction<Mutation<T>, V>) {
    const pending = ref(false);
    const data = ref<T | null>(null);
    const errors = ref<string[]>([]);
    const error = ref<ApiError | null>(null);

    async function mutate(...args: V): Promise<Mutation<T>> {
        pending.value = true;
        errors.value = [];

        const res = await callback(...args);
        if (res.status && res.data) {
            //@ts-ignore
            data.value = res.data;
        }
        error.value = res.error;
        errors.value = res.errors;
        pending.value = false;

        return res;
    }

    return {
        pending,
        data,
        errors,
        error,
        mutate,
    };
}
