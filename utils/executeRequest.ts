import { TYPE } from "vue-toastification";

export async function executeRequest<T>(url: string, options: FetchOptions = {}) {
    let status = true;
    let data: T | null = null;
    let errors: string[] = [];
    let error: ApiError | null = null;

    if (options.method == undefined) options.method = "GET";
    if (options.headers == undefined) options.headers = {};
    if (options.toast == undefined) options.toast = true;

    try {
        const config = useRuntimeConfig();
        const token = useCookie("token");

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
        if (process.client && options.method != "GET" && options.toast) {
            const payload = data as any;
            createToast(status ? payload.message : error?.message, status ? TYPE.SUCCESS : TYPE.ERROR);
        }
        return { status, data, errors, error };
    }
}
