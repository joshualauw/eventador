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
            agora_appId: process.env.AGORA_APP_ID || "",
            firebase: {
                apiKey: process.env.FIREBASE_API_KEY || "",
                authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
                projectId: process.env.FIREBASE_PROJECT_ID || "",
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
                appId: process.env.FIREBASE_APP_ID || "",
            },
            pusher: {
                appId: process.env.PUSHER_APP_ID || "",
                key: process.env.PUSHER_KEY || "",
                secret: process.env.PUSHER_SECRET || "",
                cluster: process.env.PUSHER_CLUSTER || "",
            },
        },
    },
    build: { transpile: ["vue-toastification"] },
    modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode", "nuxt-lodash"],
});
