<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h3>Posts</h3>
        <button class="btn btn-outline-primary rounded-5" @click="openCreatePost">
          <i class="bi bi-plus-circle-dotted"></i>
        </button>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Image</th>
              <th scope="col">Operation</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(post, index) in posts" :key="index">
              <th scope="row">{{ post.id }}</th>
              <td>{{ post.title }}</td>
              <td>{{ useTruncate(post.content, 100) }}</td>
              <td>
                <img :src="post.image" alt="Post Image" width="70">
              </td>
              <td class="align-middle text-center">
                <button class="btn btn-outline-secondary text-nowrap" title="Show Post" @click="showPost(post)">
                  <i class="bi bi-arrows-fullscreen"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Show Post Modal -->
  <div class="modal fade" id="showPostModal" v-show="selectedPost">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Show Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center flex-column px-5">
            <h3 class="mb-4">{{ selectedPost?.title }}</h3>
            <img class="mb-4 img-fluid" :src="selectedPost?.image" alt="Post image" width="300"/>
            <p class="mb-4">{{ selectedPost?.content }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Create New Post Modal -->
  <div class="modal fade" id="createPostModal" v-show="openCreatePostModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="postModel.title">
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image Url</label>
              <input type="url" class="form-control" id="image" v-model="postModel.image">
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <textarea class="form-control" id="content" rows="3" v-model="postModel.content"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="createPost">Create Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePostStore} from "~/store/posts.js";
import useTruncate from "../composables/useTruncate.js";

await definePageMeta({
  middleware: 'auth'
})

const postStore = usePostStore();
await postStore.fetchPosts();
const posts = postStore.posts;

const selectedPost = ref(null);
const openCreatePostModal = ref(null);

const postStructure = {
  title: '',
  content: '',
  image: '',
}
const postModel = ref(structuredClone(postStructure));

const showPost = async (post) => {
  selectedPost.value = post;

  const { Modal } = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#showPostModal')
  modal.show();
}

const openCreatePost = async () => {
  const { Modal } = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#createPostModal')
  modal.show();
}

const createPost = async () => {
  console.log(postModel.value)

  if (!postModel.value.title || !postModel.value.image || !postModel.value.content) {
    return;
  }

  await postStore.createPost(postModel.value)

  const { Modal } = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#createPostModal')
  modal.hide();
}
</script>

<style scoped>
.bi-plus-circle-dotted {
  font-size: 1.3vw;
}
</style>
