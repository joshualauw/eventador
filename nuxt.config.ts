// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Eventador",
        },
    },
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_API || "",
        },
    },
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode", "nuxt-lodash"],
});
