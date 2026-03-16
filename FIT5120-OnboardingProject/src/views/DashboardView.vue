<template>
  <div class="dashboard-page">
    <section class="dashboard-hero">
      <div class="hero-left">
        <p class="eyebrow">Sun Safety Dashboard</p>
        <p class="hero-text">
          Stay ahead of UV exposure with clear alerts, practical advice, and quick access
          to the tools that help you protect your skin.
        </p>

        <div class="location-row">
          <div class="location-pill">
            <span class="pill-label">Location</span>
            <span class="pill-value">Melbourne VIC</span>
          </div>

          <div class="location-pill">
            <span class="pill-label">Status</span>
            <span class="pill-value">{{ uvData?.riskLevel }} UV Day</span>
          </div>
        </div>
      </div>

      <div class="hero-right">
        <div class="uv-card" :class="uvData?.riskLevel?.toLowerCase()">
          <p class="uv-card-title">Current UV Index</p>

          <div class="uv-ring" :style="uvRingStyle">
            <div class="uv-ring-inner">
              <span class="uv-number">{{ uvData?.uvIndex }}</span>

              <span class="uv-label">
                {{ uvData?.uvIndex === 0 ? "Night" : uvData?.riskLevel }}
              </span>

            </div>
          </div>

          <p class="uv-message">
            Protection is recommended if you're outdoors for a while.
          </p>
        </div>
      </div>
    </section>

    <section class="alert-section">
      <div class="alert-card">
        <div class="alert-header">
          <span class="alert-badge">UV Alert</span>
          <span class="alert-time">Next update in 15 min</span>
        </div>

        <h2>Today's guidance</h2>
        <p>
          UV levels are moderate right now. Wear sunscreen, sunglasses, and
          keep an eye on exposure if spending extended time outside.
        </p>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <p class="info-label">Current Temp</p>
          <p class="info-value">{{ uvData?.temperature }}°C</p>
        </div>

        <div class="info-card">
          <p class="info-label">Re-apply Sunscreen</p>
          <p class="info-value">{{ uvData?.reapplyMinutes }} min</p>
        </div>
      </div>
    </section>

    <section class="quick-actions-section">
      <div class="section-heading">
        <h2>Quick Actions</h2>
        <p>Explore the most useful tools for Chloe’s sun-safety routine.</p>
      </div>

      <div class="action-grid">
        <div class="action-card">
          <div class="action-icon">📊</div>
          <h3>UV Awareness</h3>
          <p>View visual insights about UV impact, skin cancer, and heat trends.</p>
          <button class="action-btn" @click="goToAwareness">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🧴</div>
          <h3>Sunscreen Dosage</h3>
          <p>Help Chloe understand how much sunscreen to apply for protection.</p>
          <button class="action-btn" @click="goToDosage">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🕶️</div>
          <h3>Fit Check</h3>
          <p>Sun-smart clothing suggestions to match your aesthetic with the current UV.</p>
          <button class="action-btn" @click="$router.push('/clothing')">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🧠</div>
          <h3>Risk Assessment</h3>
          <p>Check personal UV risk using skin tone and exposure factors.</p>
          <button class="action-btn" @click="goToRisk">Open Page</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// - real UV value
import { ref, onMounted, computed } from "vue"
import { getCurrentUV } from "../services/uvService"
import { useRouter } from "vue-router"

const uvData = ref(null)
const router = useRouter()

const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    console.log("Fetching UV data...")
    
    const data = await getCurrentUV()

    console.log("API response:", data)

    if (data) {
      uvData.value = data
    } else {
      error.value = "No data returned"
    }

  } catch (err) {
    console.error("UV fetch error:", err)
    error.value = err
  } finally {
    loading.value = false
  }
})

function goToAwareness() {
  router.push("/awareness")
}

function goToDosage() {
  router.push("/dosage")
}

function goToRisk() {
  router.push('/risk')
}

const uvRingStyle = computed(() => {

  if (!uvData.value) return {}

  const uv = uvData.value.uvIndex || 0
  const degree = Math.min((uv / 11) * 360, 360)

  return {
    background: `conic-gradient(
      #ffffff 0deg ${degree}deg,
      rgba(255,255,255,0.28) ${degree}deg 360deg
    )`
  }

})
</script>


<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: 32px;
  background: transparent;
  color: #1f2937;
}

.dashboard-hero {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
  align-items: center;
  margin-bottom: 28px;
}

.hero-left,
.hero-right,
.alert-card,
.info-card,
.action-card {
  background: rgba(255, 252, 244, 0.96);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.hero-left {
  padding: 32px;
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #3b82f6;
}

.hero-text {
  margin: 0 0 24px;
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
  max-width: 640px;
}

.location-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.location-pill {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 18px;
  background: #fff7d6;
  border-radius: 16px;
}

.pill-label {
  font-size: 0.8rem;
  color: #6b7280;
}

.pill-value {
  font-weight: 700;
  color: #111827;
}

.hero-right {
  padding: 24px;
}

.uv-card {
  height: 100%;
  border-radius: 24px;
  padding: 28px 24px;
  text-align: center;
  color: #111827;
}

.uv-card.low {
  background: linear-gradient(180deg,#bbf7d0,#4ade80);
}

.uv-card.moderate {
  background: linear-gradient(180deg, #ffe88a 0%, #ffd54f 100%);
}

.uv-card.high {
  background: linear-gradient(180deg,#fdba74,#fb923c);
}

.uv-card.very-high {
  background: linear-gradient(180deg,#fca5a5,#ef4444);
}

.uv-card.extreme {
  background: linear-gradient(180deg,#c4b5fd,#8b5cf6);
}

.uv-card-title {
  margin: 0 0 18px;
  font-size: 1rem;
  font-weight: 700;
}

.uv-ring {
  width: 220px;
  height: 220px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uv-ring-inner {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: rgba(255, 248, 220, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.uv-number {
  font-size: 3.3rem;
  font-weight: 800;
}

.uv-label {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 700;
}
</style>