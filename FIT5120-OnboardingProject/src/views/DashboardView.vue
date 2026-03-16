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
  padding: 40px;
  background: radial-gradient(circle at top, #ffe082, #facc15);
  color: #1f2937;
}

.dashboard-hero {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  margin-bottom: 32px;
}

.hero-left,
.alert-card,
.info-card,
.action-card {
  background: rgba(255, 252, 244, 0.96);
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.hero-right {
  padding: 24px;
}

.hero-left {
  padding: 32px;
}

.hero-text {
  margin: 12px 0 24px;
  line-height: 1.6;
  color: #4b5563;
}

.location-row {
  display: flex;
  gap: 12px;
}

.location-pill {
  padding: 10px 16px;
  background: #fff7d6;
  border-radius: 12px;
}

.hero-right {
  padding: 24px;
}

.uv-card {
  padding: 24px;
  border-radius: 20px;
  text-align: center;
}

.uv-card.low {
  background: linear-gradient(180deg,#bbf7d0,#4ade80);
}

.uv-card.moderate {
  background: linear-gradient(180deg,#ffe88a,#ffd54f);
}

.uv-card.low {
  background: linear-gradient(180deg, #d1fae5 0%, #6ee7b7 100%);
}

.uv-card.high {
  background: linear-gradient(180deg, #fed7aa 0%, #fb923c 100%);
}

.uv-card.extreme {
  background: linear-gradient(180deg, #fecaca 0%, #ef4444 100%);
  color: white;
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

.uv-ring {
  width: 220px;
  height: 220px;
  margin: 20px auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uv-ring-inner {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.uv-number {
  font-size: 3rem;
  font-weight: 800;
}

.uv-label {
  font-weight: 600;
}

.alert-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 36px;
}

.alert-card {
  padding: 28px;
  border-left: 6px solid #f59e0b;
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-card {
  padding: 20px;
}

.info-value {
  font-size: 1.4rem;
  font-weight: 700;
}

.quick-actions-section {
  margin-top: 20px;
}

.action-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 22px;
}

.action-card {
  padding: 24px;
  transition: transform .25s ease, box-shadow .25s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.1);
}

.action-btn {
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

@media (max-width:1100px) {
  .dashboard-hero,
  .alert-section,
  .action-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width:768px) {
  .dashboard-hero,
  .alert-section,
  .action-grid {
    grid-template-columns: 1fr;
  }
}

.action-icon {
  font-size: 3rem;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  background: #f3f4f6;
  border-radius: 16px;

  margin-bottom: 16px;
}

.dashboard-page h1 {
  color: #2563eb;
  font-weight: 800;
}

.dashboard-page h2 {
  color: #2563eb;
  font-weight: 700;
}

.dashboard-page h3 {
  color: #2563eb;
  font-weight: 700;
}

</style>