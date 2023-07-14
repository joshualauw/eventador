// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Eventador",
        },
    },
    runtimeConfig: {
        public: {
            baseAPI: process.env.BASE_API || "",
            baseURL: process.env.BASE_URL || "",
        },
    },
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode", "nuxt-lodash"],
});
