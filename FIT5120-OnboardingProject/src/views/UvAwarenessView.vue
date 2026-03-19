<template>
  <div class="awareness-page">
    <section class="awareness-hero">
      <p class="eyebrow">UV Awareness</p>
      <h1>See the risk. Understand the impact.</h1>
      <p class="hero-text">
        These visuals help us understand that UV exposure is not just a number,
        it connects to real health risks, rising heat, and long-term skin damage.
      </p>
    </section>

    <section class="awareness-content">
      <div v-if="loading" class="state-card">
        <h2>Loading awareness data...</h2>
        <p>Please wait while we prepare the visual insights.</p>
      </div>

      <div v-else-if="error" class="state-card error-card">
        <h2>Could not load awareness data</h2>
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <section class="summary-grid">
          <div class="summary-card highlight-orange">
            <p class="summary-label">UV Trend Insight</p>
            <h3>UV levels remain consistently high</h3>
            <p>
              Even when the weather feels normal, UV exposure can still stay strong enough
              to damage skin.
            </p>
          </div>

          <div class="summary-card highlight-red">
            <p class="summary-label">Health Impact</p>
            <h3>Skin cancer is not a small risk</h3>
            <p>
              Rising case numbers show why sunscreen, shade, and protective clothing matter.
            </p>
          </div>

          <div class="summary-card highlight-blue">
            <p class="summary-label">Climate Context</p>
            <h3>Hotter trends increase sun-safety pressure</h3>
            <p>
              Warmer outdoor conditions make it even more important to build safe habits early.
            </p>
          </div>
        </section>

        <div class="charts-grid">
          <div class="data-card">
            <div class="card-header">
              <h2>UV levels are staying high</h2>
            </div>

            <p class="card-description">
              This chart shows UV index trends over time. Higher values mean stronger sun
              exposure and a greater chance of skin damage.
            </p>

            <div class="chart-container">
              <Line v-if="uvTrend.length" :data="uvChartData" :options="uvChartOptions" />
            </div>

            <div class="chart-takeaway">
              <strong>Notice:</strong> UV levels are not dropping much,
              protection still matters even on normal-looking days.
            </div>
          </div>

          <div class="data-card">
            <div class="card-header">
              <h2>Skin cancer is becoming more common</h2>
            </div>

            <p class="card-description">
              This chart shows the “1 in N people” trend over time. A smaller number means
              skin cancer is affecting more people, so lower bars indicate greater concern.
            </p>

            <div class="chart-container">
              <Bar v-if="cancerStats.length" :data="cancerChartData" :options="barChartOptions" />
            </div>

            <div class="chart-takeaway warning-takeaway">
              <strong>Notice:</strong> Smaller bars are worse here.
              When the number drops from “1 in 45” to “1 in 14”, it means skin cancer is
              becoming more common.
            </div>
          </div>

          <div class="data-card full-width-card">
            <div class="card-header">
              <h2>Temperature trend adds more pressure outdoors</h2>
            </div>

            <p class="card-description">
              This chart shows how average temperature changes over time. Hotter outdoor
              conditions can make prolonged sun exposure more risky and more frequent.
            </p>

            <div class="chart-container wide-chart">
              <Line
                v-if="temperatureTrend.length"
                :data="temperatureChartData"
                :options="temperatureChartOptions"
              />
            </div>

            <div class="chart-takeaway">
              <strong>Notice:</strong> Rising heat means more intense
              outdoor conditions, which makes sun-safe behaviour even more important.
            </div>
          </div>
        </div>

        <div class="insight-grid">
          <div class="insight-card">
            <h3>What this means for Chloe</h3>
            <p>
              The goal is not to scare the user — it is to make the risk visible enough
              that good habits feel smart, relevant, and worth doing.
            </p>
          </div>

          <div class="insight-card">
            <h3>Best takeaway</h3>
            <p>
              High UV exposure can look invisible in daily life, but the long-term impact is
              real. The safest choice is to build protection into everyday routines.
            </p>
          </div>
        </div>

        <div class="back-section">
          <button class="back-btn" @click="goBack">← Back to Dashboard</button>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUvTrendData, getCancerStatsData, getTemperatureTrendData } from '../services/awarenessService'
import { Line, Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
)

const router = useRouter()

const uvTrend = ref([])
const cancerStats = ref([])
const temperatureTrend = ref([])

const loading = ref(true)
const error = ref('')

async function loadAwarenessData() {
  try {
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

    if (!uvTrendResult.length && !cancerStatsResult.length && !temperatureResult.length) {
      error.value = 'The awareness APIs could not be reached. Make sure the backend server is running on port 3000.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong while loading the awareness data.'
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  loadAwarenessData()
})

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#334155',
        font: {
          size: 13,
          weight: '600'
        }
      }
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      cornerRadius: 10
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.15)'
      }
    }
  }
}

const uvChartData = computed(() => ({
  labels: uvTrend.value.map(d => d.year),
  datasets: [
    {
      label: 'UV Index',
      data: uvTrend.value.map(d => d.uvIndex),
      borderColor: '#f59e0b',
      backgroundColor: 'rgba(245, 158, 11, 0.18)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#d97706'
    }
  ]
}))

const uvChartOptions = {
  ...commonOptions,
  scales: {
    ...commonOptions.scales,
    y: {
      ...commonOptions.scales.y,
      beginAtZero: true,
      suggestedMax: 12,
      title: {
        display: true,
        text: 'UV Index',
        color: '#475569'
      }
    }
  }
}

const cancerChartData = computed(() => ({
  labels: cancerStats.value.map(d => d.year),
  datasets: [
    {
      label: '1 in N people',
      data: cancerStats.value.map(d => d.cases),
      backgroundColor: [
        '#fda4af',
        '#fb7185',
        '#ef4444',
        '#dc2626',
        '#b91c1c'
      ],
      borderRadius: 10
    }
  ]
}))

const barChartOptions = {
  ...commonOptions,
  scales: {
    ...commonOptions.scales,
    y: {
      ...commonOptions.scales.y,
      beginAtZero: true,
      title: {
        display: true,
        text: 'People per 1 case',
        color: '#475569'
      }
    }
  }
}

const temperatureChartData = computed(() => ({
  labels: temperatureTrend.value.map(d => d.year),
  datasets: [
    {
      label: 'Average Temperature (°C)',
      data: temperatureTrend.value.map(d => d.temperature),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.18)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#2563eb'
    }
  ]
}))

const temperatureChartOptions = {
  ...commonOptions,
  scales: {
    ...commonOptions.scales,
    y: {
      ...commonOptions.scales.y,
      beginAtZero: false,
      title: {
        display: true,
        text: 'Temperature (°C)',
        color: '#475569'
      }
    }
  }
}
</script>

<style scoped>
.awareness-page {
  min-height: 100vh;
  padding: 32px;
  background: transparent;
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
  font-size: 2.5rem;
  line-height: 1.1;
}

.hero-text {
  margin: 0;
  max-width: 760px;
  line-height: 1.7;
  color: #5b4a1b;
  font-size: 1.05rem;
}

.state-card,
.data-card,
.insight-card,
.summary-card {
  background: rgba(255, 252, 244, 0.97);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.state-card {
  padding: 28px;
}

.error-card {
  border-left: 8px solid #ef4444;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.summary-card {
  padding: 22px;
}

.summary-label {
  margin: 0 0 8px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}

.summary-card h3 {
  margin: 0 0 10px;
  font-size: 1.15rem;
  line-height: 1.4;
}

.summary-card p {
  margin: 0;
  line-height: 1.7;
  color: #475569;
}

.highlight-orange {
  border-top: 6px solid #f59e0b;
}

.highlight-red {
  border-top: 6px solid #ef4444;
}

.highlight-blue {
  border-top: 6px solid #3b82f6;
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

.full-width-card {
  grid-column: 1 / -1;
}

.card-header {
  margin-bottom: 10px;
}

.card-header h2 {
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.3;
}

.card-description {
  margin: 0 0 18px;
  color: #64748b;
  line-height: 1.7;
}

.chart-container {
  height: 320px;
  margin-bottom: 16px;
}

.wide-chart {
  height: 340px;
}

.chart-takeaway {
  padding: 14px 16px;
  border-radius: 16px;
  background: #fff8dc;
  color: #475569;
  line-height: 1.7;
}

.warning-takeaway {
  background: #fff1bf;
  border-left: 6px solid #f59e0b;
}

.insight-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
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

.back-section {
  margin-top: 12px;
  text-align: center;
}

.back-btn {
  border: none;
  background: #1d4ed8;
  color: white;
  padding: 12px 22px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.back-btn:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

@media (max-width: 1100px) {
  .summary-grid,
  .charts-grid,
  .insight-grid {
    grid-template-columns: 1fr;
  }

  .full-width-card {
    grid-column: auto;
  }
}

@media (max-width: 768px) {
  .awareness-page {
    padding: 20px;
  }

  .awareness-hero h1 {
    font-size: 2rem;
  }

  .chart-container,
  .wide-chart {
    height: 280px;
  }
}
</style>