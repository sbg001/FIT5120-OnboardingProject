<template>
  <div class="dosage-page">
    <section class="page-title-section">
        <p class="page-eyebrow">Sunscreen Dosage</p>
        <h1 class="page-title">Find the right sunscreen amount</h1>
        <p class="page-subtitle">
            To understand how much sunscreen to apply based on the UV level.
        </p>
    </section>

    <section class="dosage-hero">
      <div class="input-card">
        <p class="card-eyebrow">Interactive UV Input</p>
        <h2>Choose a UV level</h2>
        <p class="card-text">
          Move the slider to simulate the day’s UV conditions and see the recommended
          sunscreen amount instantly.
        </p>

        <div class="uv-control">
          <label for="uvRange">UV Index: <strong>{{ uvValue }}</strong></label>
          <input
            id="uvRange"
            v-model="uvValue"
            type="range"
            min="0"
            max="12"
            step="1"
            @change="fetchDosage"
          />
        </div>

        <div class="quick-uv-buttons">
          <button class="uv-chip" @click="setUv(2)">Low</button>
          <button class="uv-chip" @click="setUv(5)">Moderate</button>
          <button class="uv-chip" @click="setUv(7)">High</button>
          <button class="uv-chip" @click="setUv(10)">Very High</button>
        </div>
      </div>

      <div class="result-card" v-if="dosageData">
        <p class="card-eyebrow">Recommendation</p>
        <h2>Sunscreen guidance</h2>

        <div class="result-grid">
          <div class="result-box">
            <p class="result-label">UV Index</p>
            <p class="result-value">{{ dosageData.uvIndex }}</p>
          </div>

          <div class="result-box">
            <p class="result-label">Recommended Amount</p>
            <p class="result-value">{{ dosageData.recommendedAmount }}</p>
          </div>

          <div class="result-box">
            <p class="result-label">Recommended SPF</p>
            <p class="result-value">{{ dosageData.spf }}</p>
          </div>

          <div class="result-box">
            <p class="result-label">Reapply After</p>
            <p class="result-value">{{ dosageData.reapplyMinutes }} min</p>
          </div>
        </div>

        <div class="guidance-note">
          <strong>Tip:</strong>
          Higher UV conditions require stronger protection and more frequent reapplication,
          especially during outdoor activity.
        </div>
      </div>

      <div class="result-card error-card" v-else-if="error">
        <p class="card-eyebrow">API Status</p>
        <h2>Could not load dosage recommendation</h2>
        <p>{{ error }}</p>
      </div>
    </section>

    <section class="education-section">
      <div class="education-card">
        <h3>Why sunscreen amount matters</h3>
        <p>
          Many people apply less sunscreen than they actually need. This guidance helps
          Chloe make better sun-safety decisions instead of guessing.
        </p>
      </div>

      <div class="education-card">
        <h3>How to use this page</h3>
        <p>
          Chloe can test different UV levels and immediately see how recommendations
          change, making the page useful and interactive during demo presentations.
        </p>
      </div>
    </section>
    </div>
    <PageHeader></PageHeader>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { getSunscreenDosage } from '../services/sunscreenService'

const uvValue = ref(5)
const dosageData = ref(null)
const error = ref('')

async function fetchDosage() {
  error.value = ''
  dosageData.value = null

  const result = await getSunscreenDosage(uvValue.value)

  if (result) {
    dosageData.value = result
  } else {
    error.value = 'The sunscreen dosage API could not be reached. Make sure the backend server is running on port 3000.'
  }
}

async function setUv(value) {
  uvValue.value = value
  await fetchDosage()
}

onMounted(() => {
  fetchDosage()
})
</script>

<style scoped>
.dosage-page {
  min-height: 100vh;
  padding: 32px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
  color: #1f2937;
}

.dosage-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.input-card,
.result-card,
.education-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}

.input-card,
.result-card {
  padding: 28px;
}

.card-eyebrow {
  margin: 0 0 10px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ea580c;
}

.input-card h2,
.result-card h2 {
  margin: 0 0 12px;
  font-size: 1.8rem;
}

.card-text {
  margin: 0 0 22px;
  color: #4b5563;
  line-height: 1.7;
}

.uv-control {
  margin-bottom: 20px;
}

.uv-control label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
}

.uv-control input[type="range"] {
  width: 100%;
  cursor: pointer;
}

.quick-uv-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.uv-chip {
  border: none;
  border-radius: 999px;
  padding: 10px 14px;
  background: #ffedd5;
  color: #9a3412;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.uv-chip:hover {
  background: #fed7aa;
  transform: translateY(-2px);
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 20px 0;
}

.result-box {
  padding: 18px;
  border-radius: 18px;
  background: #fff7ed;
}

.result-label {
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: #9a3412;
}

.result-value {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
}

.guidance-note {
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
  color: #4b5563;
  line-height: 1.7;
}

.education-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.education-card {
  padding: 24px;
}

.education-card h3 {
  margin: 0 0 10px;
}

.education-card p {
  margin: 0;
  line-height: 1.7;
  color: #4b5563;
}

.error-card {
  border-left: 8px solid #ef4444;
}

@media (max-width: 900px) {
  .dosage-hero,
  .education-section,
  .result-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dosage-page {
    padding: 20px;
  }

  .input-card h2,
  .result-card h2 {
    font-size: 1.5rem;
  }
}

.page-title-section {
  margin-bottom: 24px;
}

.page-eyebrow {
  margin: 0 0 8px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ea580c;
}

.page-title {
  margin: 0 0 10px;
  font-size: 2.2rem;
}

.page-subtitle {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
  max-width: 700px;
}
</style>