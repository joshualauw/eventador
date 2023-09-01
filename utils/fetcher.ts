export async function fetcher<T>(url: string, options: FetchOptions = { method: "GET" }) {
    const config = useRuntimeConfig();
    const token = useCookie("token");
    if (token.value) {
        options.headers = { Authorization: `Bearer ${token.value}` };
    }

    return (await $fetch(url, { baseURL: config.public.baseAPI, ...options })) as T;
}

export function errorHandler(error: any) {
    const err = error as { data: ApiError };
    console.error(err);
    return err.data;
}
