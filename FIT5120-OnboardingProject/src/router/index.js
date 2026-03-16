import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import UvAwarenessView from '../views/UvAwarenessView.vue'
import SunscreenDosageView from '../views/SunscreenDosageView.vue'
import RiskAssessmentView from '../views/RiskAssessmentView.vue'
import ClothingRecommendationView from '../views/ClothingRecommendationView.vue'

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
  },
  {
    path: '/risk',
    name: 'risk',
    component: RiskAssessmentView
  },
  {
    path: '/clothing',
    name: 'clothing',
    component: ClothingRecommendationView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router