<template>
  <div class="container d-flex align-items-center flex-column">
    <h3 class="mb-4">{{ post.title }}</h3>
    <img class="mb-4 img-fluid" :src="post.image" alt="Post image" width="500" />
    <p class="mb-4">{{ post.content }}</p>
  </div>
</template>

<script setup>
import { usePostStore } from "~/store/posts.js";

const { params } = useRoute();
const postStore = usePostStore();
await postStore.fetchPost(params.id);
const post = postStore.post;
if (!post) {
  throw createError({
    status: 404,
    statusMessage: 'Post not found!',
  })
}
</script>

<style scoped>
.container {
  padding: 0 10rem;
}
</style>
