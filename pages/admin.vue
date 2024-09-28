<template>
  <div class="container">
    <h1>Admin Page</h1>
  </div>
</template>

<script setup>
import {usePostStore} from "~/store/posts.js";

definePageMeta({
  middleware: 'auth'
})

const postStore = usePostStore();
await postStore.fetchPosts();
const posts = postStore.posts;
</script>
