import { defineStore } from 'pinia';

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
        const { data } = await useFetch('/api/posts', {
            method: 'POST',
            body: postData
        });
        posts.value.push(data.value);
    }

    async function updatePost(id, postData) {
        const { data } = await useFetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: postData
        });
        const index = posts.value.findIndex(post => post.id === id);
        if (index !== -1) {
            posts.value[index] = data.value;
        }
    }

    async function deletePost(id) {
        await useFetch(`/api/posts/${id}`, {
            method: 'DELETE'
        });
        posts.value = posts.value.filter(post => post.id !== id);
    }

    return { posts, post, fetchPosts, fetchPost, createPost, updatePost, deletePost }
});
