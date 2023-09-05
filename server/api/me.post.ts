import axios from "axios";

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const body = await readBody(event);
        const res = await axios.get("/auth/myself", {
            baseURL: config.public.baseAPI,
            headers: { Authorization: `Bearer ${body.token}` },
        });
        return res.data;
    } catch (err) {
        event.node.res.statusCode = 401;
        console.error(err);
        return { message: "Unauthorized" };
    }
});
