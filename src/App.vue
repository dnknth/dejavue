<template>
  <router-view />

  <transition name="fade">
    <!-- semi-opaque modal backdrop -->
    <div v-if="modal" class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-20 bg-front opacity-50" @wheel.prevent />
  </transition>

  <confirmation-dialog :open="modal == 'logout'" @ok="logout" @close="modal = null;">
    <template #header>Log out now?</template>
    <span/><!-- no modal content -->
  </confirmation-dialog>

  <login-dialog :open="modal == 'login'" @close="modal = null" />
</template>

<script setup>
  import { computed, onMounted, provide, ref } from 'vue';
  import ConfirmationDialog from './components/ConfirmationDialog.vue';
  import LoginDialog from './components/LoginDialog.vue';
  import { request } from './request';
  import { useStorage } from '@vueuse/core';

  /**
   * Convenience function for an Ajax request with JSON payload and response
   */
  function xhr(options) {
    if (options.data && !options.binary) {
      options = Object.assign({ headers: {}}, options);
      options.data = JSON.stringify(options.data);
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    return request(options).then(xhr => JSON.parse(xhr.response));
  }

  const modal = ref(null);

  /**
    * Display a modal dialog, unless there is already one shown.
    */
  provide('$modal', function(name) {
    modal.value = modal.value || name;
  });

  // keep login credentials in local storage
  const auth = useStorage('vue-auth-store', {
    userName: null,
    accessToken: null,
    refreshToken: null,
  });

  function login(username, password) {
    return xhr({
      method: 'POST',
      url: 'api/v1/token/',
      data: { username, password },
    }).then(data => {
      auth.value = {
        userName: username,
        accessToken: data.access,
        refreshToken: data.refresh
    }});
  }

  provide('$auth', {
    user: computed(() => auth.value && auth.value.userName),
    login: login,
    logout: logout,
  });

  function refresh() {
    console.log('Refreshing access token');
    return xhr({
      method: 'POST',
      url: 'api/v1/token/refresh/',
      data: { refresh: auth.value.refreshToken },
    }).then(data => {
      auth.value = {
        userName: auth.value.userName,
        accessToken: data.access,
        refreshToken: auth.value.refreshToken,
    }}).catch(err => {
      auth.value = null;
      throw err;
    });
  }

  function verify() {
    return xhr({
      method: 'POST',
      url: 'api/v1/token/verify/',
      data: { token: auth.value && auth.value.accessToken },
    });
  }

  function logout() {
    auth.value = null;
  }

  /**
    * Invoke an API endpoint. 
    * If authentication fails and options.refresh is unset or truthy,
    * attempt to refresh the access token and retry the API call.
    */
  function api(options) {
    if (auth.value && auth.value.accessToken) {
      options = Object.assign({ 'refresh': true, headers: {}}, options);
      options.headers['Authorization'] = 'Bearer ' + auth.value.accessToken;
    }
    return xhr(options)
      .catch(err => {
        // DRF returns 403 for protected views if the bearer token is absent
        if (!options.refresh || !auth.value || !auth.value.refreshToken
        || (err.statusCode != 401 && err.statusCode != 403)) throw err;

        return refresh().then(() => {
          options.headers['Authorization'] = 'Bearer ' + auth.value.accessToken;
          return xhr(options);
        }).catch(() => { throw err });
      });
  }
  
  provide('$api', api);

  onMounted(() => {
    if (auth.value && auth.value.userName) {
      api({ url: '/api/v1/users/' })
        .then(() => console.log("Logged in as user: %s", auth.value.userName))
        .catch(err => console.error(err));
    }
  });
</script>

<style>
  :root {
    --color-primary: 160 12 110; /* 126 34 206 */
    --color-front: 0 0 0;
    --color-back: 255 255 255;
    --color-danger: 127 29 29;
    font-family: 'Source Sans Pro', sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-front: 255 255 255;
      --color-back: 0 0 0;
    }
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
      0% { transform: scale(0); }
     50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .modal-backdrop {
    @apply fixed w-full h-full top-0 left-0 flex items-center justify-center z-30;
  }

  .btn {
    @apply font-bold px-4 py-2 m-2 rounded-full cursor-pointer bg-front/80 text-back hover:scale-105;
  }

</style>
