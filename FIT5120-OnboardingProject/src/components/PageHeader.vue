<template>
  <div class="page-header">
    <button class="back-btn" @click="goBack">
      ← Back to Dashboard
    </button>

    <div class="header-content">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const props = defineProps({
  title: String,
  subtitle: String,
  eyebrow: String
})

const router = useRouter()

function goBack() {
  router.push("/")
}
</script>

<style scoped>
.page-header {
  margin-bottom: 28px;
}

.back-btn {
  border: none;
  background: #1d4ed8;
  color: white;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;
}

.back-btn:hover {
  background: #1e40af;
}

.eyebrow {
  font-size: 0.85rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

h1 {
  margin: 0 0 8px;
}

.subtitle {
  margin: 0;
  color: #4b5563;
}
</style>