import {useAuthStore} from "~/store/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        return;
    }

    const authStore = useAuthStore();

    if (!authStore.token) {
        return navigateTo('/login');
    }

    const isValid = await authStore.validateToken();

    if (!isValid) {
        return navigateTo('/login');
    }
});
