import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import UvAwarenessView from '../views/UvAwarenessView.vue'
import SunscreenDosageView from '../views/SunscreenDosageView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/awareness',
    name: 'awareness',
    component: UvAwarenessView
  },
  {
    path: '/dosage',
    name: 'dosage',
    component: SunscreenDosageView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router