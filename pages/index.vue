<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col-md-3 mb-4" v-for="post in posts" :key="post.id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePostStore} from "~/store/posts.js";

const postStore = usePostStore();
postStore.fetchPosts();
const posts = postStore.posts;
</script>
