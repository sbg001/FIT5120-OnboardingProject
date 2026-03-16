<template>
  <div class="awareness-page">
    <section class="awareness-hero">
      <p class="eyebrow">UV Awareness</p>
      <h1>Understand UV risks in Australia</h1>
      <p class="hero-text">
        Explore simple visual insights to understand how UV exposure and
        skin cancer trends make sun safety more important.
      </p>
    </section>

    <section class="awareness-content">
      <div v-if="loading" class="state-card">
        <h2>Loading awareness data...</h2>
        <p>Please wait while we fetch the latest visualisation data.</p>
      </div>

      <div v-else-if="error" class="state-card error-card">
        <h2>Could not load awareness data</h2>
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <div class="charts-grid">
          <div class="data-card">
            <div class="card-header">
              <h2>UV Trend</h2>
              <!-- <span class="card-badge">API Data</span> -->
            </div>

            <p class="card-description">
              Historical UV trend values for awareness visualisation.
            </p>

            <div class="simple-list">
              <div
                v-for="item in uvTrend"
                :key="item.year"
                class="list-row"
              >
                <span class="list-year">{{ item.year }}</span>
                <span class="list-value">UV Index: {{ item.uvIndex }}</span>
              </div>
            </div>
          </div>

          <div class="data-card">
            <div class="card-header">
              <h2>Skin Cancer Statistics</h2>
              <!-- <span class="card-badge">API Data</span> -->
            </div>

            <p class="card-description">
              Example yearly skin cancer case numbers for awareness.
            </p>

            <div class="simple-list">
              <div
                v-for="item in cancerStats"
                :key="item.year"
                class="list-row"
              >
                <span class="list-year">{{ item.year }}</span>
                <span class="list-value">Cases: {{ item.cases }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-grid">
          <div class="insight-card">
            <h3>Why this matters</h3>
            <p>
              Awareness data helps Chloe understand that UV safety is not just a daily
              warning, but part of a broader health issue affecting Australians.
            </p>
          </div>

          <div class="insight-card">
            <h3>What comes next</h3>
            <p>
              In the next iteration, these data cards can be upgraded into charts once
              the page structure and API connection are confirmed to work.
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
import { getUvTrendData, getCancerStatsData } from '../services/awarenessService'
import PageHeader from "../components/PageHeader.vue"

const uvTrend = ref([])
const cancerStats = ref([])
const loading = ref(true)
const error = ref('')

async function loadAwarenessData() {
  loading.value = true
  error.value = ''

  const [uvTrendResult, cancerStatsResult] = await Promise.all([
    getUvTrendData(),
    getCancerStatsData()
  ])

  uvTrend.value = uvTrendResult
  cancerStats.value = cancerStatsResult

  if (!uvTrendResult.length && !cancerStatsResult.length) {
    error.value = 'The awareness APIs could not be reached. Make sure the backend server is running on port 3000.'
  }

  loading.value = false
}

onMounted(() => {
  loadAwarenessData()
})
</script>

<style scoped>
.awareness-page {
  min-height: 100vh;
  padding: 32px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
  color: #1f2937;
}

.awareness-hero {
  margin-bottom: 24px;
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 45%, #fde68a 100%);
  color: #3b2f0f;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.12);
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7c2d12;
}

.awareness-hero h1 {
  margin: 0 0 12px;
  font-size: 2.3rem;
  line-height: 1.1;
}

.hero-text {
  margin: 0;
  max-width: 760px;
  line-height: 1.7;
  color: #5b4a1b;
}

.state-card,
.data-card,
.insight-card {
  background: rgba(255, 252, 244, 0.96);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.state-card {
  padding: 28px;
}

.error-card {
  border-left: 8px solid #ef4444;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.data-card {
  padding: 24px;
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

.card-badge {
  display: inline-block;
  padding: 8px 12px;
  background: #fff1bf;
  color: #92400e;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 999px;
}

.card-description {
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
}

.simple-list {
  display: grid;
  gap: 12px;
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #fff8dc;
  border-radius: 16px;
}

.list-year {
  font-weight: 700;
  color: #111827;
}

.list-value {
  color: #4b5563;
  font-weight: 600;
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
  .charts-grid,
  .insight-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .awareness-page {
    padding: 20px;
  }

  .awareness-hero h1 {
    font-size: 2rem;
  }

  .list-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>