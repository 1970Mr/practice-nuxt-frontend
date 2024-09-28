<template>
  <div class="container w-50 m-auto">
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Name" class="form-control mb-3" required/>
      <input v-model="email" type="email" placeholder="Email" class="form-control mb-3" required/>
      <input v-model="password" type="password" placeholder="Password" class="form-control mb-3" required/>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  const { status } = await authStore.register({name: name.value, email: email.value, password: password.value});

  if (status.value === 'success') {
    await router.push('/login');
  } else {
    error.value = 'Registration failed. Please try again.';
  }
};
</script>

<style scoped>
.container {
  min-height: 58vh !important;
}
</style>
