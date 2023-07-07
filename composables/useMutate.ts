type AsyncFunction<T, V> = (args: V) => Promise<T>;

interface MutateFunction<T> {
    status: boolean;
    data: T | null;
    errors: string[];
    error: ApiError | null;
}

export function useMutate<T, V>(callback: AsyncFunction<MutateFunction<T>, V>) {
    const pending = ref(false);
    const data = ref<T | null>(null);
    const errors = ref<string[]>([]);
    const error = ref<ApiError | null>(null);

    async function mutate(args: V): Promise<MutateFunction<T>> {
        pending.value = true;
        errors.value = [];

        const res = await callback(args);
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
