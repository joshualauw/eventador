import { TYPE } from "vue-toastification";

export async function executeRequest<T>(url: string, options: FetchOptions, toasted: boolean = true) {
    let status = true;
    let data: T | null = null;
    let errors: string[] = [];
    let error: ApiError | null = null;

    try {
        const res = await fetcher<T>(url, options);
        data = res;
        //@ts-ignore
        if (toasted && options.method != "GET" && process.client) createToast(data.message || "", TYPE.SUCCESS);
    } catch (e) {
        const err = errorHandler(e);
        status = false;
        error = err;
        errors = [];
        errors.push(...(err.errors ?? []));
        if (toasted && process.client) createToast(err.message || "", TYPE.ERROR);
    } finally {
        return { status, data, errors, error };
    }
}
