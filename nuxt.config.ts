// @ts-ignore
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt'
    ],
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-icons/font/bootstrap-icons.css'
    ],
    plugins: [
        '~/plugins/bootstrap.client.js'
    ],
    runtimeConfig: {
        public: {
            apiBase: 'http://127.0.0.1:8000/api',
        },
    },
})
