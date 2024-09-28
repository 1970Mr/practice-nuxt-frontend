<template>
  <div class="card">
    <img :src="post.image" class="card-img-top" alt="Post image">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.content.substring(0, 100) }}...</p>
      <NuxtLink class="btn btn-primary" :to="`/posts/${post.id}`">Read More</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps(['post']);
</script>
