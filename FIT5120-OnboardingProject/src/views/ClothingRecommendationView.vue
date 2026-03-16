<template>
  <div class="clothing-page">
    <section class="clothing-hero">
      <p class="eyebrow">Fit Check</p>
      <h1>Sun-Smart Aesthetic</h1>
      <p class="hero-text">
        Protect your skin barrier and keep your glow. Get tailored clothing 
        suggestions that balance thermal comfort with maximum UV defense.
      </p>
    </section>

    <section class="clothing-content">
      <div v-if="loading" class="state-card">
        <h2>Loading your fit check...</h2>
        <p>Please wait while we check the current UV levels.</p>
      </div>

      <div v-else-if="error" class="state-card error-card">
        <h2>Could not load recommendations</h2>
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <div class="content-grid">
          <div class="data-card">
            <div class="card-header">
              <h2>Current UV: {{ uvIndex }} ({{ clothingData?.level }})</h2>
            </div>

            <p class="card-description">
              Today's sun safety vibe based on real-time data.
            </p>

            <div class="advice-box">
              <span class="advice-text">{{ clothingData?.advice }}</span>
            </div>
          </div>

          <div class="data-card">
            <div class="card-header">
              <h2>The Fit</h2>
            </div>

            <p class="card-description">
              What to wear right now to avoid sun damage.
            </p>

            <div class="simple-list">
              <div
                v-for="(item, index) in clothingData?.items"
                :key="index"
                class="list-row"
              >
                <span class="list-icon">✨</span>
                <span class="list-value">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-grid">
          <div class="insight-card">
            <h3>Why UPF matters</h3>
            <p>
              Regular cotton tees only provide about UPF 5 protection. Choosing fabrics with a tight weave or a UPF 50+ rating acts like a physical shield against premature aging.
            </p>
          </div>

          <div class="insight-card">
            <h3>Stay cool, stay safe</h3>
            <p>
              Sun-smart doesn't mean sweating. Opt for lightweight, breathable fabrics like linen or moisture-wicking materials with long sleeves to block radiation without overheating.
            </p>
          </div>
        </div>
      </template>
    </section>
  </div>
  <PageHeader></PageHeader>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from "../components/PageHeader.vue"

const uvIndex = ref(0)
const clothingData = ref(null)
const loading = ref(true)
const error = ref('')

async function loadFitCheck() {
  loading.value = true
  error.value = ''

  try {
    // 1. Fetch current UV index first
    const uvRes = await fetch('http://localhost:3000/api/uv/current')
    if (!uvRes.ok) throw new Error('Failed to fetch UV data')
    const uvJson = await uvRes.json()
    uvIndex.value = uvJson.uvIndex

    // 2. Fetch the clothing recommendations based on that UV index
    const clothRes = await fetch(`http://localhost:3000/api/recommendation/clothing?uv=${uvIndex.value}`)
    if (!clothRes.ok) throw new Error('Failed to fetch clothing rules')
    clothingData.value = await clothRes.json()

  } catch (err) {
    console.error(err)
    error.value = 'Could not reach the backend API. Make sure your server is running on port 3000.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFitCheck()
})
</script>

<style scoped>
.clothing-page {
  min-height: 100vh;
  padding: 32px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
  color: #1f2937;
}

/* Sunset aesthetic gradient for the clothing hero */
.clothing-hero {
  margin-bottom: 24px;
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f43f5e 0%, #fb923c 50%, #fcd34d 100%);
  color: #4c0519;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.12);
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #881337;
}

.clothing-hero h1 {
  margin: 0 0 12px;
  font-size: 2.3rem;
  line-height: 1.1;
}

.hero-text {
  margin: 0;
  max-width: 760px;
  line-height: 1.7;
  color: #701a35;
}

.state-card,
.data-card,
.insight-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.state-card {
  padding: 28px;
}

.error-card {
  border-left: 8px solid #ef4444;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.data-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.card-header h2 {
  margin: 0;
  font-size: 1.35rem;
}

.card-description {
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
}

.advice-box {
  background: #fdf2f8;
  border-radius: 16px;
  padding: 24px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  border-left: 4px solid #f43f5e;
}

.advice-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: #831843;
  line-height: 1.5;
}

.simple-list {
  display: grid;
  gap: 12px;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  background: #fff8dc;
  border-radius: 16px;
}

.list-icon {
  font-size: 1.2rem;
}

.list-value {
  color: #111827;
  font-weight: 600;
  font-size: 1.05rem;
}

.insight-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.insight-card {
  padding: 24px;
}

.insight-card h3 {
  margin: 0 0 10px;
}

.insight-card p {
  margin: 0;
  line-height: 1.7;
  color: #4b5563;
}

@media (max-width: 900px) {
  .content-grid,
  .insight-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .clothing-page {
    padding: 20px;
  }

  .clothing-hero h1 {
    font-size: 2rem;
  }
}
</style>