import { TYPE } from "vue-toastification";

export async function executeRequest<T>(url: string, options: FetchOptions = { method: "GET", headers: {} }) {
    let status = true;
    let data: T | null = null;
    let errors: string[] = [];
    let error: ApiError | null = null;

    try {
        const config = useRuntimeConfig();
        const token = useCookie("token");
        if (!options.headers) options.headers = {};
        if (token.value) Object.assign(options.headers, { Authorization: `Bearer ${token.value}` });

        const res = await $fetch<T>(url, { baseURL: config.public.baseAPI, ...options });
        data = res;
    } catch (e) {
        const err = errorHandler(e);
        status = false;
        error = err;
        errors = [];
        errors.push(...(err.errors ?? []));
    } finally {
        if (process.client && options.method != "GET") {
            const payload = data as any;
            createToast(status ? payload.message : error?.message, status ? TYPE.SUCCESS : TYPE.ERROR);
        }
        return { status, data, errors, error };
    }
}
