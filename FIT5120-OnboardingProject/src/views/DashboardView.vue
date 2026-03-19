<template>
  <div class="dashboard-page">
    <section class="dashboard-hero">
      <div class="hero-left">
        <p class="dashboard-title">Sun Safety Dashboard</p>

        <p class="hero-text">
          Stay ahead of UV exposure with clear alerts, practical advice, and quick access
          to the tools that help you protect your skin.
        </p>

        <div class="hero-stats">
          <div class="stat-card">
            <span class="stat-label">UV Index</span>
            <span class="stat-value">{{ uvData?.uvIndex }}</span>
          </div>

          <div class="stat-card">
            <span class="stat-label">Temperature</span>
            <span class="stat-value">{{ uvData?.temperature }}°C</span>
          </div>

          <div class="stat-card">
            <span class="stat-label">Reapply</span>
            <span class="stat-value">{{ uvData?.reapplyMinutes }} min</span>
          </div>
        </div>

        <!-- summary -->
        <div class="hero-summary">
          <p class="summary-main">
            {{ uvData?.riskLevel }} UV • Melbourne
          </p>

          <p class="summary-sub">
            {{ uvData?.uvIndex === 0 
              ? "Low exposure tonight. No protection needed." 
              : "UV exposure present. Consider protection outdoors." }}
          </p>

          <p class="summary-tip">
            ☀️ Tip: Protection is recommended when UV reaches 3 or above.
          </p>
          
        </div> 

      </div> <!-- ✅ 这里补上，关闭 hero-left -->

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
        <div class="alert-top">
          <span class="alert-badge">UV Alert</span>
          <span class="alert-time">Next update in 15 min</span>
        </div>

        <h2 class="alert-title">Today's guidance</h2>

        <p class="alert-text">
          UV levels are currently <strong>{{ uvData?.riskLevel }}</strong>.
          {{ uvData?.uvIndex < 3 
            ? "Minimal risk at this time. You can stay outdoors safely." 
            : "Protection is recommended. Apply sunscreen, wear sunglasses, and limit prolonged exposure." }}
        </p>

        <ul class="alert-list">
          <li>✔ Check UV index before going outside</li>
          <li>✔ Apply SPF 30+ sunscreen if UV ≥ 3</li>
          <li>✔ Reapply every {{ uvData?.reapplyMinutes }} minutes</li>
        </ul>
      </div>
      <div class="info-grid">
        <div class="info-card">
          <div class="info-icon">🌡️</div>
          <p class="info-label">Current Temperature</p>
          <p class="info-value">{{ uvData?.temperature }}°C</p>
          <p class="info-subtext">Live outdoor condition</p>
        </div>

        <div class="info-card">
          <div class="info-icon">🧴</div>
          <p class="info-label">Re-apply Sunscreen</p>
          <p class="info-value">{{ uvData?.reapplyMinutes }} min</p>
          <p class="info-subtext">Recommended reminder window</p>
        </div>
      </div>
    </section>

    <section class="quick-actions-section">
      <div class="section-heading">
        <h2>Quick Actions</h2>
        <p>Explore the most useful tools for sun-safety routine.</p>
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
          <p>Understand how much sunscreen to apply for protection.</p>
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
  min-width: 170px;
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
  background: linear-gradient(180deg, #d1fae5 0%, #6ee7b7 100%);
}

.uv-card.moderate {
  background: linear-gradient(180deg, #ffe88a 0%, #ffd54f 100%);
}

.uv-card.high {
  background: linear-gradient(180deg, #fdba74 0%, #fb923c 100%);
}

.uv-card.very-high {
  background: linear-gradient(180deg, #fca5a5 0%, #ef4444 100%);
  color: white;
}

.uv-card.extreme {
  background: linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 100%);
  color: white;
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
  padding: 30px;
  border-radius: 28px;
  background: rgba(255, 252, 244, 0.97);
  border-left: 8px solid #f59e0b;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
  position: relative; 
  overflow: hidden; 
}

.alert-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.alert-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff1bf;
  color: #92400e;
  font-size: 0.85rem;
  font-weight: 700;
}

.alert-time {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}

.alert-title {
  margin: 0 0 14px;
  font-size: 2rem;
  font-weight: 800;
  color: #2563eb;
}

.alert-text {
  margin: 0;
  font-size: 1.2rem;   
  line-height: 1.8;    
  color: #334155;
  max-width: 100%;    
}

.info-grid {
  display: grid;
  gap: 18px;
}

.info-card {
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 252, 244, 0.97);
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.info-icon {
  font-size: 1.6rem;
  margin-bottom: 10px;
}

.info-label {
  margin: 0 0 10px;
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 600;
}

.info-value {
  margin: 0 0 8px;
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
}

.info-subtext {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
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

.dashboard-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #f59e0b, #facc15);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pill-label {
  font-size: 0.8rem;
  color: #6b7280;
}

.pill-value {
  font-weight: 700;
  color: #111827;
}

.hero-summary {
  margin: 20px 0 24px;
  padding: 20px;
  border-radius: 16px;
  background: #fff7d6;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
}

.summary-main {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
}

.summary-sub {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.5;
}

.summary-tip {
  margin-top: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #d97706;
}

.hero-stats {
  display: flex;
  gap: 14px;
  margin: 18px 0 22px;
}

.stat-card {
  flex: 1;
  background: #fff7d6;
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
}

.hero-summary {
  margin: 10px 0 0;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff7d6, #fde68a);
}

.summary-main {
  font-size: 1.2rem;
  font-weight: 800;
}

.summary-sub {
  font-size: 0.9rem;
  margin-top: 4px;
}

.summary-tip {
  font-size: 0.8rem;
  margin-top: 8px;
}

.alert-extra {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.extra-item {
  flex: 1;
  background: #fff7d6;
  padding: 12px 14px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.extra-item strong {
  font-weight: 800;
}

.alert-card::after {
  content: "";
  position: absolute;
  right: -40px;
  bottom: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #fde68a, transparent);
  opacity: 0.4;
}

.alert-list {
  margin-top: 16px;
  padding-left: 18px;
  color: #475569;
  line-height: 1.6;
}

.alert-list li {
  margin-bottom: 6px;
  font-size: 0.95rem;
}
</style>