import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
  ],
})

export default router
