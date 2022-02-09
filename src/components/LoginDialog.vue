<template>
  <modal-dialog :open="open" @show="onShow" @shown="onShown" @hide="emit('close')">
    <template #header>
      <div class="text-primary">Please sign in</div>
    </template>

    <div v-if="error" class="text-danger text-center pb-4">{{ error }}</div>
    <form class="flex flex-col" action="#" @submit.prevent="onLogin">
      <div class="mb-6 pt-3 rounded-lg bg-back">
        <label class="block text-front font-bold mb-2 ml-3" for="userid">User ID</label>
        <input type="text" name="username" v-model="username" ref="nameInput">
      </div>
      <div class="mb-6 pt-3 rounded-lg bg-back">
        <label class="block text-front font-bold mb-2 ml-3" for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="flex justify-end">
        <a href="#" class="text-primary font-bold mb-6 hover:underline">Forgot your password?</a>
      </div>
      <button class="bg-primary/70 hover:bg-primary/90 text-white font-bold py-2 rounded-full shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
    </form>

    <template #footer><span /></template>

  </modal-dialog>
</template>

<script setup>

  import { inject, ref } from 'vue';
  import ModalDialog from './ModalDialog.vue'

  defineProps({ open: Boolean });

  const emit = defineEmits([ "close" ]);

  const { login } = inject("$auth"),
    username = ref(""),
    password = ref(""),
    nameInput = ref(null),
    error = ref("");

  function onShow() {
    password.value = error.value = "";
  }

  function onShown() {
    nameInput.value.focus();
  }

  function onLogin() {
    if (username.value) {
      login(username.value, password.value)
        .then(() => emit("close"))
        .catch(err => { error.value = err.message; });
    }
  }

</script>

<style scoped>
  input {
    @apply bg-back rounded w-full text-front focus:outline-none border-b-4 transition duration-500 px-3 pb-3 border-back focus:border-primary;
  }
</style>
