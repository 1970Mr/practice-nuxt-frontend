import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useAuthStore = defineStore('authStore', () => {
        const config = useRuntimeConfig()
        const user = ref(null);
        const token = ref('');

        const login = async (credentials) => {
            const response = await useFetch(`${config.public.apiBase}/login`, {
                method: 'POST',
                body: credentials
            });

            token.value = response.data.value?.token;
            user.value = response.data.value?.user;

            return response;
        };

        const register = async (userData) => {
            return useFetch(`${config.public.apiBase}/register`, {
                method: 'POST',
                body: userData
            });
        };

        const logout = async () => {
            await useFetch(`${config.public.apiBase}/logout`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${token.value}`}
            });

            user.value = null;
            token.value = '';
        };

        const validateToken = async () => {
            if (!token.value) return false;

            try {
                const response = await useFetch(`${config.public.apiBase}/auth/validate-token`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token.value}` }
                });

                if (response.data.value?.valid) {
                    user.value = response.data.value?.user;
                    return true;
                } else {
                    await logout();
                    return false;
                }
            } catch (error) {
                await logout();
                return false;
            }
        };

        return {user, token, login, register, logout, validateToken};
    },
    {
        persist: process.client
            ? {
                storage: sessionStorage,
                pick: ['user', 'token'],
            }
            : false,
    });
