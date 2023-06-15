/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    /** @type {import('rippleui').Config} */
    rippleui: {
        themes: [
            {
                themeName: "light",
                colorScheme: "light",
                colors: {
                    backgroundPrimary: "#f8fafc",
                    backgroundSecondary: "#ffffff",
                    warning: "#f59e0b",
                    error: "#e11d48",
                    "blue-3": "#1f2937",
                },
            },
            {
                themeName: "dark",
                colorScheme: "dark",
                colors: {
                    // "blue-3": "#282828",
                    "blue-3": "#001c38",
                },
            },
        ],
    },
    theme: {
        extend: {},
    },
    plugins: [require("rippleui")],
};
