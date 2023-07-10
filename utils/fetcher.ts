import { TYPE } from "vue-toastification";

interface FetchOptions {
    method?: "POST" | "PUT" | "GET" | "PATCH" | "DELETE";
    body?: any;
    query?: any;
    headers?: any;
}

export function fetcher<T>(url: string, options: FetchOptions = { method: "GET" }) {
    const config = useRuntimeConfig();
    const token = useCookie("token");
    if (token.value) {
        options.headers = { Authorization: `Bearer ${token.value}` };
    }

    return $fetch<T>(url, { baseURL: config.public.baseURL, ...options });
}

export async function executeRequest<T>(url: string, options: FetchOptions, toasted: boolean = true) {
    let status = true;
    let data: T | null = null;
    let errors: string[] = [];
    let error: ApiError | null = null;

    try {
        const res = await fetcher<T>(url, options);
        data = res;
        //@ts-ignore
        if (toasted && options.method != "GET") createToast(data.message || "", TYPE.SUCCESS);
    } catch (e) {
        const err = errorHandler(e);
        status = false;
        error = err;
        errors = [];
        errors.push(...(err.errors ?? []));
        if (toasted) createToast(err.message || "", TYPE.ERROR);
    } finally {
        return { status, data, errors, error };
    }
}

export function errorHandler(error: any) {
    const err = error as { data: ApiError };
    console.error(err);
    return err.data;
}
