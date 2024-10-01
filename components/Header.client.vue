<template>
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div class="container-fluid">
          <NuxtLink class="navbar-brand" to="/">MyBlog</NuxtLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <NuxtLink :class="['nav-link', useRoute().fullPath === '/' ? 'active' : '']" to="/">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/admin">Admin</NuxtLink>
              </li>
            </ul>
            <div v-if="!token || !user" class="d-flex">
              <NuxtLink class="btn btn-outline-primary me-2" to="/login">Login</NuxtLink>
              <NuxtLink class="btn btn-primary" to="/register">Register</NuxtLink>
            </div>
            <div v-else class="d-flex">
              <span class="me-3 d-flex align-items-center" dir="rtl">کاربر: {{ user.name }}</span>
              <button @click="logout" class="btn btn-outline-primary">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
</template>

<script setup>
import {useAuthStore} from "~/store/auth.js";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
const token = computed(() => authStore.token);

const logout = authStore.logout;
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-toggler {
  border: none;
}
</style>
