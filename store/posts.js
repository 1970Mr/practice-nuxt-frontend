import { defineStore } from 'pinia';
import {useAuthStore} from "~/store/auth.js";

export const usePostStore = defineStore('postStore', () => {
    const config = useRuntimeConfig()
    const posts = ref([])
    const post = ref(null)

    async function fetchPosts() {
        const { data } = await useFetch(`${config.public.apiBase}/posts`);
        posts.value = data.value;
    }

    async function fetchPost(id) {
        const { data } = await useFetch(`${config.public.apiBase}/posts/${id}`);
        post.value = data.value;
    }

    async function createPost(postData) {
        const { data } = await useFetch(`${config.public.apiBase}/posts`, {
            method: 'POST',
            body: postData,
            headers: { Authorization: `Bearer ${useAuthStore().token}` }
        });
        posts.value.unshift(data.value);
    }

    async function updatePost(id, postData) {
        const { data } = await useFetch(`${config.public.apiBase}/posts/${id}`, {
            method: 'PUT',
            body: postData,
            headers: { Authorization: `Bearer ${useAuthStore().token}` }
        });
        const index = posts.value.findIndex(post => post.id === id);
        if (index !== -1) {
            posts.value[index] = data.value;
        }
    }

    async function deletePost(id) {
        await useFetch(`${config.public.apiBase}/posts/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${useAuthStore().token}` }
        });
        posts.value = posts.value.filter(post => post.id !== id);
    }

    return { posts, post, fetchPosts, fetchPost, createPost, updatePost, deletePost }
});
