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
        <div class="uv-card moderate">
          <p class="uv-card-title">Current UV Index</p>

          <div class="uv-ring">
            <div class="uv-ring-inner">
              <span class="uv-number">{{ uvData?.uvIndex }}</span>
              <span class="uv-label">{{ uvData?.riskLevel }}</span>
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
          UV levels are moderate right now. Chloe should wear sunscreen, sunglasses, and
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
          <button class="action-btn">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🧴</div>
          <h3>Sunscreen Dosage</h3>
          <p>Help Chloe understand how much sunscreen to apply for protection.</p>
          <button class="action-btn">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🕶️</div>
          <h3>Fit Check</h3>
          <p>Sun-smart clothing suggestions to match your aesthetic with the current UV.</p>
          <button class="action-btn">Open Page</button>
        </div>

        <div class="action-card">
          <div class="action-icon">🧠</div>
          <h3>Risk Assessment</h3>
          <p>Check personal UV risk using skin tone and exposure factors.</p>
          <button class="action-btn">Open Page</button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// - real UV value
import { ref, onMounted } from "vue"
import { getCurrentUV } from "../services/uvService"

const uvData = ref(null)

onMounted(async () => {
  uvData.value = await getCurrentUV()
})
// - dynamic colour scaling
// - API-based location
// - navigation buttons
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: 32px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
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
  background: #ffffff;
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

.hero-left h1 {
  margin: 0 0 12px;
  font-size: 2.4rem;
  line-height: 1.1;
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
  background: #f3f7fb;
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

.uv-card.moderate {
  background: linear-gradient(180deg, #ffe88a 0%, #ffd54f 100%);
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
  background: conic-gradient(
    #ffffff 0deg 240deg,
    rgba(255, 255, 255, 0.28) 240deg 360deg
  );
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
  line-height: 1;
}

.uv-label {
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 700;
}

.uv-message {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
}

.alert-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
}

.alert-card {
  padding: 24px;
  border-left: 8px solid #f59e0b;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.alert-badge {
  display: inline-block;
  padding: 8px 12px;
  background: #fff4d6;
  color: #92400e;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 999px;
}

.alert-time {
  font-size: 0.9rem;
  color: #6b7280;
}

.alert-card h2 {
  margin: 0 0 10px;
  font-size: 1.4rem;
}

.alert-card p {
  margin: 0;
  line-height: 1.7;
  color: #4b5563;
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-card {
  padding: 22px;
}

.info-label {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 0.9rem;
}

.info-value {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 800;
  color: #111827;
}

.quick-actions-section {
  margin-bottom: 28px;
}

.section-heading {
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0 0 8px;
  font-size: 1.6rem;
}

.section-heading p {
  margin: 0;
  color: #6b7280;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.action-card {
  padding: 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.action-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(31, 41, 55, 0.12);
}

.action-icon {
  font-size: 2rem;
  margin-bottom: 14px;
}

.action-card h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}

.action-card p {
  margin: 0 0 18px;
  color: #4b5563;
  line-height: 1.6;
  min-height: 78px;
}

.action-btn {
  border: none;
  border-radius: 14px;
  padding: 12px 16px;
  background: #1d4ed8;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.action-btn:hover {
  background: #1e40af;
}

@media (max-width: 1100px) {
  .dashboard-hero,
  .alert-section,
  .action-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 20px;
  }

  .dashboard-hero,
  .alert-section,
  .action-grid {
    grid-template-columns: 1fr;
  }

  .hero-left h1 {
    font-size: 2rem;
  }

  .uv-ring {
    width: 180px;
    height: 180px;
  }

  .uv-ring-inner {
    width: 140px;
    height: 140px;
  }

  .uv-number {
    font-size: 2.6rem;
  }
}
</style>