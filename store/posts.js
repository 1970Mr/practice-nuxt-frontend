import {defineStore} from 'pinia';
import {useAuthStore} from '~/store/auth.js';

export const usePostStore = defineStore('postStore', () => {
    const config = useRuntimeConfig();
    const posts = ref([]);
    const post = ref(null);
    const loading = ref(false);
    const error = ref('');

    async function fetchPosts() {
        try {
            loading.value = true;
            error.value = '';
            posts.value = await $fetch(`${config.public.apiBase}/posts`);
        } catch (err) {
            error.value = err.message || 'Failed to fetch posts.';
        } finally {
            loading.value = false;
        }
    }

    async function fetchPost(id) {
        try {
            loading.value = true;
            error.value = '';
            post.value = await $fetch(`${config.public.apiBase}/posts/${id}`);
        } catch (err) {
            error.value = err.message || `Failed to fetch post with ID: ${id}.`;
        } finally {
            loading.value = false;
        }
    }

    async function createPost(postData) {
        try {
            loading.value = true;
            error.value = '';
            const data = await $fetch(`${config.public.apiBase}/posts`, {
                method: 'POST',
                body: postData,
                headers: { Authorization: `Bearer ${useAuthStore().token}` },
            });
            posts.value.unshift(data);
        } catch (err) {
            error.value = err.message || 'Failed to create post.';
        } finally {
            loading.value = false;
        }
    }

    async function updatePost(id, postData) {
        try {
            loading.value = true;
            error.value = '';
            const data = await $fetch(`${config.public.apiBase}/posts/${id}`, {
                // method: 'PUT',
                method: 'POST',
                body: postData,
                headers: { Authorization: `Bearer ${useAuthStore().token}` },
            });
            const index = posts.value.findIndex(post => post.id === id);
            if (index !== -1) {
                posts.value[index] = data;
            }
        } catch (err) {
            error.value = err.message || `Failed to update post with ID: ${id}.`;
        } finally {
            loading.value = false;
        }
    }

    async function deletePost(id) {
        try {
            loading.value = true;
            error.value = '';
            await $fetch(`${config.public.apiBase}/posts/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${useAuthStore().token}` },
            });
            posts.value = posts.value.filter(post => post.id !== id);
        } catch (err) {
            error.value = err.message || `Failed to delete post with ID: ${id}.`;
        } finally {
            loading.value = false;
        }
    }

    return { posts, post, loading, error, fetchPosts, fetchPost, createPost, updatePost, deletePost };
});
