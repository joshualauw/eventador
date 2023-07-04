import axios from "axios";
import { AsyncDataOptions } from "nuxt/app";
import { KeysOf } from "nuxt/dist/app/composables/asyncData";

export function fetcher<T>(
    key: string,
    fetchFn: Function,
    options?: AsyncDataOptions<any, any, KeysOf<any>, null> | undefined
) {
    return useAsyncData<T>(key, async () => fetchFn(), { ...options });
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001/api",
});

export async function getAllEvents() {
    return await fetcher<ApiResponse<string>>("getAllEvents", async () => {
        try {
            const res = await axiosInstance.get("/event/explore");
            return res.data;
        } catch (e) {
            console.error(e);
        }
    });
}
