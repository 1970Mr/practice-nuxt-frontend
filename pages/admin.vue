<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h3>Posts</h3>
        <button class="btn btn-outline-primary icon-btn" @click="openCreatePost">
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
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ post.title }}</td>
              <td>{{ useTruncate(post.content, 100) }}</td>
              <td>
                <img :src="post.image" alt="Post Image" width="70">
              </td>
              <td class="align-middle text-center">
                <div class="d-flex gap-2">
                  <button
                      class="btn btn-outline-info text-nowrap icon-btn"
                      data-bs-title="Show Post"
                      data-bs-toggle="tooltip"
                      @click="showPost(post)"
                      :key="post.id"
                  >
                    <i class="bi bi-arrows-fullscreen"></i>
                  </button>

                  <button
                      class="btn btn-outline-danger text-nowrap icon-btn"
                      data-bs-title="Delete Post"
                      data-bs-toggle="tooltip"
                      @click="deletePost(post)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
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
import {computed} from "vue";

await definePageMeta({
  middleware: 'auth'
})

const postStore = usePostStore();
await postStore.fetchPosts();
const posts = computed(() => postStore.posts);

const selectedPost = ref(null);
const openCreatePostModal = ref(null);

const postStructure = {
  title: '',
  content: '',
  image: '',
}
const postModel = ref(structuredClone(postStructure));

onMounted(async () => {
  const {Tooltip} = await import('bootstrap');
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
})

const showPost = async (post) => {
  selectedPost.value = post;

  const {Modal} = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#showPostModal')
  modal.show();
}

const openCreatePost = async () => {
  const {Modal} = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#createPostModal')
  modal.show();
}

const createPost = async () => {
  if (!postModel.value.title || !postModel.value.image || !postModel.value.content) {
    return;
  }

  await postStore.createPost(postModel.value);

  postModel.value = structuredClone(postStructure);

  const {Modal} = await import('bootstrap');
  const modal = Modal.getOrCreateInstance('#createPostModal')
  modal.hide();
}

const deletePost = async (post) => {
  await postStore.deletePost(post.id)
}
</script>

<style scoped>
.bi-plus-circle-dotted {
  font-size: 1.3vw;
}

.icon-btn {
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
