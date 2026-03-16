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
            </div>

            <p class="card-description">
              Historical UV trend values for awareness visualisation.
            </p>

            <div style="height:300px">
              <Line
                v-if="uvTrend.length"
                :data="uvChartData"
              />
            </div>
          </div>

          <div class="data-card">
            <div class="card-header">
              <h2>Skin Cancer Statistics</h2>
            </div>

            <p class="card-description">
              Example yearly skin cancer case numbers for awareness.
            </p>

            <div style="height:300px">
              <Line
                v-if="cancerStats.length"
                :data="cancerChartData"
              />
            </div>
          </div>

          <div class="data-card">
            <div class="card-header">
              <h2>Temperature Trend</h2>
            </div>

            <p class="card-description">
              Historical average temperature trend in Melbourne.
            </p>

            <div style="height:300px">
              <Line
                v-if="temperatureTrend.length"
                :data="temperatureChartData"
              />
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
        </div>
      </template>
    </section>
  </div>
  <PageHeader></PageHeader>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { getUvTrendData, getCancerStatsData } from '../services/awarenessService'
import { getTemperatureTrendData } from '../services/awarenessService'
import PageHeader from "../components/PageHeader.vue"
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const uvTrend = ref([])
const cancerStats = ref([])
const temperatureTrend = ref([])

const loading = ref(true)
const error = ref('')

async function loadAwarenessData() {

  loading.value = true
  error.value = ''

  const [uvTrendResult, cancerStatsResult, temperatureResult] = await Promise.all([
    getUvTrendData(),
    getCancerStatsData(),
    getTemperatureTrendData()
  ])

  uvTrend.value = uvTrendResult
  cancerStats.value = cancerStatsResult
  temperatureTrend.value = temperatureResult

  loading.value = false
}

onMounted(() => {
  loadAwarenessData()
})

const uvChartData = computed(() => ({
  labels: uvTrend.value.map(d => d.year),
  datasets: [
    {
      label: "UV Index",
      data: uvTrend.value.map(d => d.uvIndex),
      borderColor: "#ff9800",
      backgroundColor: "rgba(255,152,0,0.3)"
    }
  ]
}))

const cancerChartData = computed(() => ({
  labels: cancerStats.value.map(d => d.year),
  datasets: [
    {
      label: "Skin Cancer Cases",
      data: cancerStats.value.map(d => d.cases),
      borderColor: "#ef5350",
      backgroundColor: "rgba(239,83,80,0.3)"
    }
  ]
}))

const temperatureChartData = computed(() => ({
  labels: temperatureTrend.value.map(d => d.year),
  datasets: [
    {
      label: "Average Temperature (°C)",
      data: temperatureTrend.value.map(d => d.temperature),
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.3)",
      tension: 0.3
    }
  ]
}))

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
  grid-template-columns: repeat(2, 1fr);
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

.card-description {
  margin: 0 0 18px;
  color: #6b7280;
  line-height: 1.6;
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
}
</style>