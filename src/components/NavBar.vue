<template>
  <nav class="fixed w-full top-0 text-white z-10" :class="scrolled ? 'bg-back shadow' : ''">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div class="pl-4 flex items-center">
        <a class="branding" href="/" :class="scrolled ? 'text-front' : 'text-white'">
          Déja<img class="h-8 fill-current inline" src="../assets/vue.svg"><span style="color:rgb(62, 175, 124)">ue</span>
        </a>
      </div>
      <div class="block lg:hidden pr-4">
        <button ref="toggle" @click="showMenu = !showMenu" class="dropdown-toggle">
          <svg class="fill-front h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="dropdown-menu" ref="dropdown" :class="{ hidden : !showMenu }">
        <ul class="list-reset lg:flex justify-end flex-1 items-center align-middle">
          <li class="mr-3">
            <a class="inactive nav-link" href="/api/v1/">API</a>
          </li>
          <li v-if="user" class="nav-link">
            Hello, {{ user }}
          </li>
          <li v-else>
            <button @click="$modal('login')" class="action-btn" :class="actionButton">
              Login
            </button>
          </li>
        </ul>
        <span v-if="user" class="inactive text-xl">
          <svg-icon :fa-icon="faSignOut" class="fa fa-sign-out cursor-pointer" title="Logout" @click="$modal('logout')" @clicked="logout" />
        </span>
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </nav>
</template>

<script setup>

  import { computed, inject, onMounted, ref } from 'vue';
  import { useEventListener } from '@vueuse/core';
  import { faSignOut } from '@fortawesome/free-solid-svg-icons';


  const $modal = inject('$modal'),
    { user, logout } = inject('$auth'),
    scrolled = ref(false),
    showMenu = ref(false),
    dropdown = ref(null),
    toggle = ref(null),
    actionButton = computed(() => scrolled.value && !showMenu.value ? 'bg-[#7c0558] text-white' : 'bg-white text-gray-800');

  function checkParent(e, element) {
    for (; e.parentNode; e = e.parentNode) {
      if (e == element) return true;
    }
    return false;
  }

  onMounted(() => {
    useEventListener(document, 'scroll', () => scrolled.value = window.scrollY > 100);

    useEventListener(document, 'click', e => {
      if (e.target.tagName == 'BUTTON' || e.target.tagName == 'A'
      || (!checkParent(e.target, dropdown.value)
        && !checkParent(e.target, toggle.value))) showMenu.value = false;
    });
  });

</script>

<style scoped>
  .branding {
    @apply no-underline hover:no-underline font-bold text-2xl lg:text-4xl;
  }
  .dropdown-toggle {
    @apply flex items-center p-1 text-primary focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out;
  }
  .dropdown-menu {
    @apply w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-back lg:bg-transparent text-front p-4 lg:p-0;
  }
  .nav-link {
    @apply inline-block py-2 px-4 text-black dark:text-white no-underline;
  }
  .active {
    @apply font-bold;
  }
  .inactive {
    @apply hover:font-bold;
  }
  .action-btn {
    @apply mx-auto lg:mx-0 font-bold rounded-full mt-4 lg:mt-0 py-2 px-8 shadow opacity-75 focus:outline-none transform transition hover:scale-105 duration-300 ease-in-out;
  }
</style>
